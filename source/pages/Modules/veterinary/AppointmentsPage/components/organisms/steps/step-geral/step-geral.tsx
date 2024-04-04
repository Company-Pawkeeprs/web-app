import FieldNumber from '~/Components/molecules/field-number'
import FieldTextArea from '~/Components/molecules/field-text-area'
import useFormikContextSafe from '~/hooks/use-formik-context-safe'
import CardSimplePet from '../../../molecules/card-simple-pet'
import type { CtxStepAnamnese } from '../../../validations.yup'

const StepGeral = () => {
    const { values } = useFormikContextSafe<CtxStepAnamnese>()

    return (
        <>
            <CardSimplePet />
            <h4 className="text-center font-sans font-semibold text-base capitalize">
                Pré-Anamnese
                <br />
                <span className="text-xs font-bold text-secondary-500">
                    Obrigatório (*)
                </span>
            </h4>
            <div
                className="
                flex-col card shadow-2xl p-8 
                border-secondary-500 border relative
                mobile:p-2 mobile:border  mobile:!shadow-none
                min-h-[420px]  rounded-sm
                grid grid-cols-12 mobile:grid-cols-1
            "
            >
                <FieldTextArea
                    isValid={values.dates_consults.reason_consultation.length > 0}
                    ctx={values}
                    label="Motivo da Consulta"
                    required
                    name="dates_consults.reason_consultation"
                    divClassName="col-span-full"
                />

                <FieldNumber
                    ctx={values}
                    label="Peso"
                    required
                    isValid={values.details_pet_consultation?.weight.length > 0}
                    visibleError={false}
                    divClassName="col-span-full"
                    name="details_pet_consultation.weight"
                />
                <legend className="col-span-full text-xs text-gray-400 text-center">
                    Peso do pet em quilos, exemplo = 0.5 (500 gramas)
                </legend>

                <div className="col-span-6 mr-2">
                    <FieldNumber
                        ctx={values}
                        label="Altura"
                        name="details_pet_consultation.height"
                    />
                    <legend className="col-span-3 text-xs text-gray-400 text-center">
                        Altura do pet em centímetros, exemplo = 32
                    </legend>
                </div>

                <div className="col-span-6">
                    <FieldNumber
                        ctx={values}
                        label="Comprimento"
                        name="details_pet_consultation.length"
                    />

                    <legend className="col-span-3 text-xs text-gray-400 text-center">
                        Comprimento do pet em centímetros
                    </legend>
                </div>

                <div>
                    {values.details_pet_consultation?.imc > 0 && (
                        <h2 className="m-4 font-bold">
                            O IMC do animal é:{' '}
                            {values.details_pet_consultation?.imc?.toFixed(2)}
                        </h2>
                    )}
                </div>
            </div>
        </>
    )
}

export default StepGeral
