import { useFormikContext } from "formik"
import { useState, useTransition } from "react"
import ComboBoxAutocomplete from "~/Components/molecules/combo-box-autocomplete"
import { SpeciesType, species } from '~/store/pets/speciesType'

type AuxSpeciesFormikProps = {
    species: SpeciesType
    breed: string
    bloodType: string
}

type ComboBoxFieldsProps = {
    name?: string
}

const ComboBoxFields = ({ name }: ComboBoxFieldsProps) => {

    const [specie, setSpecie] = useState<SpeciesType>({} as SpeciesType)

    const { setFieldValue } = useFormikContext<AuxSpeciesFormikProps>()

    const [isPending, startTransition] = useTransition()

    const onChangeSpecie = (specie: SpeciesType) => {
        startTransition(() => {
            setSpecie(specie)
            setFieldValue('breed', '')
            setFieldValue('bloodType', '')
        })
    }

    const memoNameSpecies = !name ? 'species' : `${name}.species`
    const memoNameBreed = !name ? 'breed' : `${name}.breed`
    const memoNameBloodType = !name ? 'bloodType' : `${name}.bloodType`

    return (
        <>
            <div className="w-full lg:w-1/3 px-3 mb-6">
                <ComboBoxAutocomplete
                    items={species}
                    option={specie}
                    required
                    onChangeOption={onChangeSpecie}
                    name={memoNameSpecies}
                    placeholder="Ex: Cachorro, Gato, etc..."
                    label="Espécie"
                    className="form-control"
                />
            </div>

            <div className="w-full lg:w-1/3 px-3 mb-6">
                <ComboBoxAutocomplete
                    items={(specie.breedType || []) as any}
                    disabled={!specie.breedType || isPending}
                    required
                    name={memoNameBreed}
                    label="Raça"
                    placeholder="Ex: Vira-lata, Poodle, etc..."
                    className="form-control"

                />
            </div>

            <div className="w-full lg:w-1/3 px-3 mb-6">
                <ComboBoxAutocomplete
                    items={(specie.bloodType || []) as any}
                    disabled={!specie.bloodType || isPending}
                    name={memoNameBloodType}
                    label="Tipo Sanguíneo"
                    placeholder="Ex: A, B, etc..."
                    className="form-control"
                />
            </div>
        </>
    )
}

export default ComboBoxFields