import { useFormikContext } from 'formik'
import BoxButtons from '~/Components/molecules/box-buttons'
import { Gender } from '~/store/slices/pets/speciesType'
import { InitialValues, StepProps } from '../../types'
import { option } from '../helpers'

type Key = keyof typeof Gender


const StepListGender = ({
    previousStep,
    nextStep
}: StepProps) => {

    const { values, setFieldValue } = useFormikContext<InitialValues>()

    const handleSelected = (gender: string) => {
        setFieldValue('gender', gender)
        nextStep()
    }

    return (
        <div className="mt-3 p-1 gap-2">
            <div className="pb-1 h-[calc(100vh-20rem)] overflow-auto">
                {
                    Object.keys(Gender).map(
                        (gender) => (
                            <button
                                key={gender}
                                type="button"
                                onClick={handleSelected.bind(null, gender)}
                                className={option({ selected: values.gender === gender })}
                            >
                                <div className="grid grid-cols-4 justify-center items-center">
                                    <span className="align-middle col-span-full">
                                        {Gender[gender as Key]}
                                    </span>
                                </div>
                            </button>
                        )
                    )
                }
            </div>

            <BoxButtons
                isValid={!!values.gender}
                link={false}
                onClickCancel={previousStep}
                onClickSuccess={nextStep}
            />

        </div>
    )
}

export default StepListGender