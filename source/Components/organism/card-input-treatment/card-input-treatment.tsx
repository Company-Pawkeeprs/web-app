import { Form, Formik, type FormikHelpers } from 'formik'
import { useMemo, useState } from 'react'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'
import * as Yup from 'yup'
import { BtnSuccess } from '~/Components/atoms/btn'
import FieldControl, {
    type OptionSelect,
} from '~/Components/molecules/field-control'
import FieldCurrency from '~/Components/molecules/field-currency'
import FieldTextArea from '~/Components/molecules/field-text-area'
import OptionsMenu from '~/Components/molecules/options-menu'
import { makeTitle } from '~/Components/molecules/options-menu/options-menu'
import useFormikContextSafe from '~/hooks/use-formik-context-safe'
import useKeyboardNavigation from '~/hooks/use-keyboard-navigation'
import type { CtxStepTreatment } from '~/pages/Modules/veterinary/AppointmentsPage/components/validations.yup'
import type { QuestionTreatment } from '~/types/appointment'
import type { RecordsShapeYup } from '~/types/helpers'
import type { MEDICAL_RECORDS } from '~/types/medical-records'

type CardInputProps = {
    items?: OptionSelect[]
    handleSubmit: (
        data: QuestionTreatment,
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        formikHelpers: FormikHelpers<any>,
    ) => Promise<unknown>
    handleRemove?: (index: number) => void
}

type OmitTreatment = Omit<QuestionTreatment, 'type_treatment'>
type ShapeTreatment = RecordsShapeYup<OmitTreatment>

const validationSchema = Yup.object().shape<ShapeTreatment>({
    name_treatment: Yup.string().required('Campo obrigatório'),
    coin_treatment: Yup.string().optional(),
    notes_treatment: Yup.string().optional(),
    value_coin_treatment: Yup.string().transform((value) => {
        return value.replace('R$', '').replace(',', '.')
    }),
})

const makeOptions = (items: OptionSelect[]) => {
    return items.map((item) => ({
        ...item,
        icon: item.icon,
        value: item.value,
        label: item.label,
        color: 'rgb(255 200 107);',
    })) as (OptionSelect & { icon: React.ElementType })[]
}

const KeyTreatment = {
    activities_carry: 'Atividades físicas',
    medicine: 'Medicação',
    vaccine: 'Vacina',
    exam: 'Exame',
    nutrition: 'Nutrição Alimentar',
} as const

const CardInputTreatment = ({
    items = [],
    handleSubmit,
    handleRemove,
}: CardInputProps) => {
    const [category, setCategory] = useState<OptionSelect>(items[0])
    const options = useMemo(() => makeOptions(items), [items])

    const { values } = useFormikContextSafe<CtxStepTreatment>()

    const filteredItemsSelects = useMemo(() => {
        return (
            values.treatments?.questions_treatment?.filter(
                (item) => item.type_treatment === category.value,
            ) || []
        )
    }, [values.treatments?.questions_treatment, category?.value])

    const keyPressLeft = () => {
        setCategory((prev) => {
            const index = items.findIndex((item) => item.value === prev.value)
            const next = items[index - 1]
            if (next) {
                return next
            }
            return prev
        })
    }

    const keyPressRight = () => {
        setCategory((prev) => {
            const index = items.findIndex((item) => item.value === prev.value)
            const next = items[index + 1]
            if (next) {
                return next
            }
            return prev
        })
    }

    useKeyboardNavigation({
        ArrowLeft: keyPressLeft,
        ArrowRight: keyPressRight,
    })

    const Items = useMemo(
        () =>
            filteredItemsSelects?.map((treatment, index) => (
                <div
                    key={`treatment-${index}`}
                    className="w-full px-2 py-1 text-xs rounded-md"
                >
                    <div className="flex flex-row w-full px-2 border border-dashed rounded-sm border-primary">
                        <div className="grid w-full grid-cols-12">
                            <h6 className="col-span-3 font-mono font-semibold capitalize ">
                                {treatment.name_treatment}
                            </h6>

                            <h6 className="col-span-3 font-mono font-semibold capitalize">
                                {
                                    KeyTreatment[
                                        treatment.type_treatment as keyof typeof KeyTreatment
                                    ]
                                }
                            </h6>

                            <p className="col-span-3 font-mono capitalize">
                                {treatment.notes_treatment}
                            </p>

                            <p className="col-span-3 font-mono capitalize">
                                {Intl.NumberFormat('pt-BR', {
                                    style: 'currency',
                                    currency: 'BRL',
                                }).format(
                                    Number.parseFloat(
                                        treatment.value_coin_treatment,
                                    ),
                                )}
                            </p>
                        </div>
                        <button
                            type="button"
                            className="text-red-500"
                            onClick={() => handleRemove?.(index)}
                        >
                            X
                        </button>
                    </div>
                </div>
            )),
        [filteredItemsSelects, handleRemove],
    )

    return (
        <>
            <h4 className="mb-2 font-sans font-semibold text-center uppercase mobile:underline mobile:text-primary-500 mobile:font-bold">
                {makeTitle(category?.label as string, false)}
            </h4>
            <div className="flex flex-row flex-wrap justify-between w-full mb-4">
                {options?.map((item) => (
                    <OptionsMenu
                        key={item.value}
                        classNames={{
                            label: 'mobile:hidden',
                        }}
                        item={item}
                        option={category}
                        onChangeOption={(item) =>
                            setCategory({
                                ...item,
                                label: item.label,
                                value: item.value,
                            })
                        }
                    />
                ))}
            </div>

            {Items}
            <Formik
                initialValues={
                    {
                        name_treatment: '',
                        coin_treatment: '',
                        notes_treatment: '',
                        type_treatment: null,
                        value_coin_treatment: '',
                    } as OmitTreatment
                }
                validationSchema={validationSchema}
                onSubmit={async (data, formikHelpers) => {
                    await handleSubmit(
                        {
                            ...data,
                            type_treatment: category.value as MEDICAL_RECORDS,
                        },
                        formikHelpers,
                    )
                    formikHelpers.resetForm()
                }}
            >
                {({ isValid, handleSubmit, values }) => (
                    <Form onSubmit={handleSubmit}>
                        <FieldControl
                            ctx={values}
                            name="name_treatment"
                            label="Nome"
                        />

                        <FieldCurrency label="Valor:" name="value_coin_treatment" />

                        <FieldTextArea
                            className="mb-1"
                            ctx={values}
                            name={'notes_treatment' as ''}
                            label="Informações Complementares"
                        />

                        <div className="flex justify-center">
                            <BtnSuccess
                                disabled={!isValid}
                                className="w-full text-white "
                                label="Adicionar"
                                type="submit"
                            />
                        </div>
                        <div className="flex justify-between mt-6">
                            <button
                                type="button"
                                onClick={keyPressLeft}
                                className="px-4 py-2 rounded-full bg-secondary-500 hover:bg-secondary-600"
                            >
                                <FaArrowLeft />
                            </button>
                            <button
                                onClick={keyPressRight}
                                type="button"
                                className="px-4 py-2 rounded-full bg-secondary-500 hover:bg-secondary-600"
                            >
                                <FaArrowRight />
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </>
    )
}

export default CardInputTreatment
