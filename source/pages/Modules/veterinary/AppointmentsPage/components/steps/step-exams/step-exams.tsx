import type { IconType } from 'react-icons'
import {
    GiBodyBalance,
    GiChemicalDrop,
    GiHealthNormal,
    GiRadiations,
    GiShieldBash,
    GiTestTubes,
} from 'react-icons/gi'
import ListHorizontalSwitch from '~/Components/organism/list-horizontal-switch'
import type { KeyOfExamsTypes } from '~/constants'
import { exams } from '~/constants/exams-questions'
import useFormikContextSafe from '~/hooks/use-formik-context-safe'
import type { ComplementaryExam } from '~/types/appointment'
import CardSimplePet from '../../molecules/card-simple-pet'
import type { CtxStepAnamnese } from '../../validations.yup'
import { screen } from '../styles'

const STEPS: {
    label: string
    value: KeyOfExamsTypes
    icon?: IconType
}[] = [
    { label: 'Hematologia', value: 'hematology', icon: GiTestTubes },
    { label: 'Bioquímica', value: 'biochemistry', icon: GiChemicalDrop },
    { label: 'Parasitologia', value: 'parasitology', icon: GiChemicalDrop },
    { label: 'Imunologia', value: 'immunology', icon: GiShieldBash },
    { label: 'Urinálise', value: 'urinalysis', icon: GiChemicalDrop },
    { label: 'Local da Lesão', value: 'lesion_location', icon: GiBodyBalance },
    {
        label: 'Ultrassonografia / Radiologia',
        value: 'ultrasound_radiology',
        icon: GiRadiations,
    },
    {
        label: 'Descrição de Lesões',
        value: 'lesion_description',
        icon: GiHealthNormal,
    },
]

const StepExams = () => {
    const { values } = useFormikContextSafe<CtxStepAnamnese>()
    return (
        <>
            <CardSimplePet />
            <h4 className="font-sans text-base font-semibold text-center capitalize">
                Exams
            </h4>
            <div className={screen()}>
                <ListHorizontalSwitch
                    ctx={values}
                    items={exams.map((item) => ({
                        ...item,
                        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
                        type: item.type as any,
                        value: item.id,
                        checked: false,
                    }))}
                    name="exams_anamnesis.complementary_exams"
                    categories={STEPS}
                    onChange={({ option, step, checked, replace }) => {
                        const item = {
                            id: option.value,
                            name_exam: option.label,
                            notes: '',
                            type_exam: step,
                            checked,
                        } as ComplementaryExam & { id: number; checked: boolean }
                        replace?.(option.value as number, item)
                    }}
                />
            </div>
        </>
    )
}

export default StepExams
