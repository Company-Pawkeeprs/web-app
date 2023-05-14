import BoxButtons from '~/Components/molecules/box-buttons/box-buttons'
import FieldControl from '~/Components/molecules/field-control/field-control'
import { Pet } from '~/store/pets/types'
import { InitialValues } from '../../../modal-list-pets'
import { useFormikContext } from 'formik'
import { MapOptionSpecies } from '~/store/pets/speciesType'

type StepListPetsProps = {
    pets: Pet[]
    handleNavigate: (pet: Pet) => void
    handleCancel: () => void
    onChangeSelectedTab: (index: number) => void
    selectedTab: number
}

enum EmojiPet {
    cat = '🐱',
    dog = '🐶',
    rabbit = '🐰',
    fish = '🐠',
    bird = '🐦',
    reptile = '🦎',
    horse = '🐴',
}

const StepListPets = ({
    pets,
    handleNavigate,
    handleCancel,
    onChangeSelectedTab,
    selectedTab
}: StepListPetsProps) => {

    const { values } = useFormikContext<InitialValues>()

    const nextStep = () => {
        onChangeSelectedTab(selectedTab + 1)
    }



    return (
        <div className="mt-3 p-1 gap-2">
            <div className="pb-1 max-h-[250px] overflow-auto">
                {
                    pets.map(pet => (
                        <button
                            key={pet.id}
                            type="button"
                            onClick={() => handleNavigate(pet)}
                            className="
                            group w-full items-center justify-center 
                            rounded-md px-2 py-2 text-sm gap-2 
                            hover:bg-primary-500 dark:hover:!bg-primary-600 hover:text-white
                        "
                        >
                            <div className="grid grid-cols-4 justify-center items-center">
                                <span className="align-middle col-span-1">{
                                EmojiPet[MapOptionSpecies[pet.species]]}</span>
                                <span className="align-middle col-span-2">{pet.name}</span>
                                <span className="align-middle col-span-1">{pet.species}</span>
                            </div>
                        </button>
                    ))}
            </div>
            <FieldControl
                name="name"
                label='Caso o pet não esteja na lista, digite o nome dele:'
                className="form-control w-full flex-1 mt-2"
                placeholder="Nome do Pet"
            />

            <BoxButtons
                isValid={values.name.length > 0}
                link={false}
                labelSuccess="Prosseguir"
                onClickCancel={handleCancel}
                onClickSuccess={nextStep}
            />

        </div>
    )
}

export default StepListPets