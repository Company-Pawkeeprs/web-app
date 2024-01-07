import { startTransition, useEffect, useState } from 'react'
import BoxButtons from '~/Components/molecules/box-buttons/box-buttons'
import useFormikContextSafe from '~/hooks/use-formik-context-safe'
import { species } from '~/store/slices/pets/speciesType'
import { Breed } from '~/store/slices/pets/types'
import { CtxSimplifiedPedFields, StepProps } from '../../types'
import { option } from '../helpers'

type Item = {
    name: Breed;
    value: Breed;
}


const StepListBreeds = ({
    nextStep,
    previousStep
}: StepProps) => {

    const [breeds, setBreeds] = useState<Item[]>([])
    const { values, setFieldValue } = useFormikContextSafe<CtxSimplifiedPedFields>()


    const handleSelectBreed = (breed: Breed) => {
        setFieldValue('race', breed)
        nextStep()
    }

    useEffect(() => {
        const specie = species.find(specie => (specie.value as any) === values.specie)

        if (!specie) return

        startTransition(() => {
            setBreeds(specie.breedType)
        })

    }, [values.specie])

    return (
        <div className="mt-3 p-1 gap-2">
            <div className="pb-1 h-[calc(100vh-20rem)] overflow-auto">
                {
                    breeds.map(breed => (
                        <button
                            key={breed.value}
                            type="button"
                            onClick={handleSelectBreed.bind(null, breed.value)}
                            className={option({ selected: values.race === breed.value })}
                        >
                            <div className="grid grid-cols-4 justify-center items-center">
                                <span className="align-middle col-span-full">{breed.name}</span>
                            </div>
                        </button>
                    ))}
            </div>

            <BoxButtons
                isValid={!!values.race}
                link={false}
                onClickCancel={previousStep}
                onClickSuccess={nextStep}
            />

        </div>
    )
}

export default StepListBreeds