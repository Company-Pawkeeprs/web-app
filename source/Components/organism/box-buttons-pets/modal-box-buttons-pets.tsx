import withCompose from '~/Components/helpers/with-compose'
import AvatarPet from '~/Components/molecules/avatar-pet'
import useModal from '~/hooks/use-modal'
import type { IPetV2Data } from '~/types/pet-v2'
import type { Species } from '~/types/speciesType'
import { calcAge } from '~/utils/calc-age'
import type { ModalBoxButtonsProps } from '../box-buttons/modal-box-buttons'
import Modal from '../modal'
import BoxButtonsPets from './box-buttons-pets'

const ModalBoxButtonsPet = ({
    item: pet,
    children,
}: ModalBoxButtonsProps<IPetV2Data>) => {
    const { closeModal, open, showModal } = useModal()

    return (
        <>
            {children?.({ showModal })}
            <Modal onClose={() => closeModal()} open={open}>
                <div className="flex flex-col justify-between items-center w-full h-[90%] p-4">
                    <AvatarPet
                        name_pet={pet?.name_pet}
                        specie={pet.specie as Species}
                    />
                    <section className="grid w-full grid-cols-2 mt-4">
                        <div className="col-span-1">
                            <div className="mb-2 text-gray-500">
                                <h3 className="font-bold">Pet:</h3>
                                <p>{`${pet?.name_pet}, ${pet?.specie}, ${pet?.race}`}</p>
                            </div>

                            <div className="mb-2 text-gray-500">
                                <h3 className="font-bold">Idade do Pet:</h3>
                                <p>{calcAge(pet?.date_birth)} Anos</p>
                            </div>

                            <div className="mb-2 text-gray-500">
                                <h3 className="font-bold">Sexo do Pet:</h3>
                                <p>{pet?.sex}</p>
                            </div>
                        </div>
                    </section>

                    <div className="self-end w-full mt-4">
                        <BoxButtonsPets item={pet} />
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default withCompose(ModalBoxButtonsPet) as typeof ModalBoxButtonsPet
