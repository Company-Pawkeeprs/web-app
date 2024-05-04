import { BtnLink, BtnPrimary } from '~/Components/atoms/btn'
import BoxButtons from '~/Components/molecules/box-buttons/box-buttons'
import FieldControl from '~/Components/molecules/field-control/field-control'
import useFormikContextSafe from '~/hooks/use-formik-context-safe'
import { MapOptionSpecies, type KeyOfMapOptionSpecies } from '~/types/speciesType'
import { NUMBER_STEPS } from '../../modal-list-pets'
import type { CtxSimplifiedPeTFields, StepProps } from '../../types'
import { option } from '../helpers'

enum EmojiPet {
    cat = '🐱',
    dog = '🐶',
    rabbit = '🐰',
    fish = '🐠',
    bird = '🐦',
    reptile = '🦎',
    horse = '🐴',
}

type Key = keyof typeof EmojiPet

const StepListPets = ({
    nextStep,
    pets,
    onChangeStep,
    isLoading,
    onChangePet,
}: StepProps) => {
    const { values } = useFormikContextSafe<CtxSimplifiedPeTFields>()

    return (
        <div className="flex-1 flex mobile:h-[95vh] h-[80vh]  w-full  justify-between items-center flex-col">
            <h5 className="text-center font-semibold text-gray-500 mb-2">
                Selecione ou Adicione um Pet para prosseguir na consulta.
            </h5>
            <div className="overflow-auto flex flex-1 gap-2 justify-start items-center flex-col w-full py-1">
                {pets?.length === 0 && (
                    <div className="flex justify-center items-center  ">
                        <span className="text-gray-500 text-center font-semibold text-base">
                            {isLoading ? 'Carregando...' : 'Nenhum pet encontrado'}
                        </span>
                    </div>
                )}
                {pets?.map((pet) => (
                    <button
                        key={pet.id}
                        type="button"
                        onClick={() => {
                            onChangePet(pet)
                            onChangeStep(NUMBER_STEPS.CHOICE)
                        }}
                        className={option()}
                    >
                        <div className="grid grid-cols-4 justify-center items-center">
                            <span className="align-middle col-span-1">
                                {
                                    EmojiPet[
                                        MapOptionSpecies[
                                            pet.pet_information
                                                ?.specie as KeyOfMapOptionSpecies
                                        ] as Key
                                    ]
                                }
                            </span>
                            <span className="align-middle col-span-2">
                                {pet.pet_information?.name_pet}
                            </span>
                        </div>
                    </button>
                ))}
            </div>

            <div className="w-full mb-2">
                <FieldControl
                    ctx={values}
                    name="name"
                    label="Caso o pet não esteja na lista, digite o nome dele para prosseguir:"
                    className=" w-full mb-1"
                    placeholder="Nome do Pet"
                />

                <BoxButtons
                    isValid={values?.name?.length > 0}
                    link={false}
                    cancel={(props) => (
                        <BtnLink
                            {...(props as any)}
                            message="Cadastro Completo"
                            href={`/dashboard/pet?document=${values?.ownerEmergencyContact?.cpf_cnpj}`}
                        />
                    )}
                    success={(props) => (
                        <BtnPrimary {...props} label="Cadastro Simplificado" />
                    )}
                    onClickSuccess={nextStep}
                />
            </div>
        </div>
    )
}

export default StepListPets
