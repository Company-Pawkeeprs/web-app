import { forwardRef, useImperativeHandle, useMemo } from 'react'
import { FaWhatsapp } from 'react-icons/fa'
import { BtnConfirm } from '~/Components/atoms/btn'
import useModal from '~/hooks/use-modal'
import AvatarPet from '~/pages/AppointmentsPage/components/atoms/pet-avatar/pet-avatar'
import { Gender, Species } from '~/store/slices/pets/speciesType'
import type { VeterinaryConsultation } from '~/types/appointment'
import { calcAge } from '~/utils/calc-age'
import { getNameTutor } from '~/utils/get-name-tutors'
import Modal from '../modal'
import BoxButtons from './box-buttons'

type ModalBoxButtonsProps = {
    item: VeterinaryConsultation
    children?: null | ((props: { showModal: () => void }) => JSX.ElementType)
}

const ModalBoxButtons = forwardRef(
    ({ item, children }: ModalBoxButtonsProps, ref) => {
        const { closeModal, open, showModal } = useModal()

        useImperativeHandle(
            ref,
            () => {
                return {
                    showModal,
                    closeModal,
                    open,
                }
            },
            [open, closeModal, showModal],
        )

        const pet = useMemo(
            () => ({
                ...item.tutor_pet_vet.pet,
                specie: Species[
                    item.tutor_pet_vet?.pet?.specie as keyof typeof Species
                ],
                gender: Gender[item.tutor_pet_vet?.pet?.sex as Gender],
                name_tutor: getNameTutor(item.tutor_pet_vet?.tutor),
                contact: item.tutor_pet_vet?.tutor?.contact,
            }),
            [item.tutor_pet_vet],
        )

        return (
            <>
                {children?.({ showModal })}
                {!children && (
                    <BtnConfirm
                        label="Ver Mais"
                        className="border-none mobile:!w-full mobile:col-span-full text-gray-500 bg-transparent"
                        onClick={showModal}
                    />
                )}

                <Modal
                    onOpen={() => showModal}
                    onClose={() => closeModal()}
                    modal
                    nested
                    open={open}
                    lockScroll
                    className="pb-0 w-[750px]"
                >
                    <div className="flex flex-col justify-between items-center w-full h-[90%] p-4">
                        <AvatarPet
                            name={pet?.name_pet}
                            alt={`Avatar do Pet ${pet?.name_pet}`}
                            title={(props) => (
                                <h1 className="text-center text-muted text-xl font-sans">
                                    {props.name}
                                </h1>
                            )}
                        />
                        <section className="w-full grid grid-cols-2 mt-4">
                            <div className="col-span-1">
                                <div className="text-gray-500 mb-2">
                                    <h3 className="font-bold">Pet:</h3>
                                    <p>{`${pet?.name_pet}, ${pet?.specie}, ${pet?.race}`}</p>
                                </div>

                                <div className="text-gray-500 mb-2">
                                    <h3 className="font-bold">Idade do Pet:</h3>
                                    <p>{calcAge(pet?.date_birth)} Anos</p>
                                </div>

                                <div className="text-gray-500 mb-2">
                                    <h3 className="font-bold">Sexo do Pet:</h3>
                                    <p>{pet?.gender}</p>
                                </div>
                                {item.appointment_status?.canceled === 'no' && (
                                    <div className="text-gray-500 mb-2">
                                        <h3 className="font-bold">Data Marcada:</h3>
                                        <p>{`${
                                            Intl.DateTimeFormat('pt-BR', {}).format(
                                                new Date(
                                                    item.dates_consults
                                                        .date_consultation,
                                                ),
                                            ) || 'Não informado'
                                        } às ${
                                            item.dates_consults.time_consultation
                                        }`}</p>
                                    </div>
                                )}
                            </div>
                            <div className="col-span-1">
                                <div className="text-gray-500 mb-2">
                                    <h3 className="font-bold">Tutor:</h3>
                                    <p>{pet?.name_tutor}</p>
                                </div>

                                <div className="text-gray-500 mb-2">
                                    <h3 className="font-bold">Telefone:</h3>
                                    <p>{pet?.contact?.phone}</p>
                                </div>

                                <div className="text-gray-500 mb-2">
                                    <h3 className="font-bold">Whatsapp:</h3>
                                    <p className="flex gap-1">
                                        <FaWhatsapp className="text-green-600 text-xl" />
                                        {pet?.contact?.whatsapp || 'Não informado'}
                                    </p>
                                </div>

                                <div className="text-gray-500 mb-2">
                                    <h3 className="font-bold">Email:</h3>
                                    <p>{pet?.contact?.email}</p>
                                </div>
                            </div>
                        </section>

                        <div className="w-full mt-4 self-end">
                            <BoxButtons item={item} />
                        </div>
                    </div>
                </Modal>
            </>
        )
    },
)

export default ModalBoxButtons
