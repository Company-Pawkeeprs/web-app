
import { Formik } from "formik";
import FieldControl from "~/Components/molecules/field-control/field-control";

import { BtnCancel, BtnPrimary } from "~/Components/atoms/btn";

import FieldDocument from "~/Components/molecules/field-document";
import FieldTextArea from '~/Components/molecules/field-text-area/field-text-area';
import Modal from "~/Components/organism/modal";
import { Appointments } from '~/entities/Appointments';
import useModal from '~/hooks/use-modal';
import useAppointment from '~/store/hooks/appointment/use-appointment';

type AddNewAppointmentProps = {
    children?: (showModal: () => void) => JSX.Element;
};

const AddNewAppointment = ({ children }: AddNewAppointmentProps) => {

    const { closeModal, open, showModal } = useModal()
    const { handleSubmit } = useAppointment();

    const onSubmit = async (values: any) => {
        const appointment = Appointments.build(values);
        await handleSubmit(appointment);
    };

    const initialValues = {
        date_consultation: '',
        time_consultation: '',
        type_consultation: '',
        reason_consultation: '',
    }

    return (
        <>
            {children?.(showModal) || (
                <BtnPrimary
                    onClick={showModal}
                    label="Agendar Consulta"
                    id="button-new-consult"
                    style={{ height: 42 }}
                >

                </BtnPrimary>
            )}
            <Modal
                onOpen={() => showModal}
                onClose={() => closeModal()}
                modal
                nested
                open={open}
                lockScroll
                className="w-[750px] py-4"
            >
                <div className="flex flex-col w-full">
                    <h6 className="font-semibold text-center uppercase">Agendamento</h6>
                    <p className='mb-4 font-semibold text-center text-secondary-500'>Obrigatório (*)</p>
                </div>

                <Formik
                    initialValues={initialValues}
                    // validationSchema={validationPet}
                    onSubmit={onSubmit}
                    enableReinitialize
                >
                    {
                        ({ isValid, handleSubmit }) => (
                            <>

                                <FieldDocument
                                    name="cpf_tutor"
                                    label="CPF do tutor"
                                    required
                                />
                                <div className='flex justify-around gap-3'>
                                    <FieldControl
                                        label="Data da consulta"
                                        name="date_consultation"
                                        required
                                        className=" "
                                        placeholder="exemplo='05/12/2023'"
                                        type="date"
                                    />

                                    <FieldControl
                                        label="Hora da consulta"
                                        required
                                        name="time_consultation"
                                        className=" "
                                        placeholder="exemplo='14:00'"
                                        type="time"
                                    />
                                </div>

                                <FieldControl
                                    label="Tipo da consulta"
                                    name="type_consultation"
                                    required
                                    className=" "
                                    placeholder="exemplo='exame'"
                                    type="text"
                                />
                                <FieldControl
                                    label="Razão da consulta"
                                    name="reason_consultation"
                                    required
                                    className=" "
                                    placeholder="exemplo='consulta de rotina'"
                                    type="text"
                                />
                                <FieldTextArea
                                    label="Orientações e Anotações"
                                    className="form-control"
                                    component="textarea"
                                    name="observations"
                                    type="text"
                                />
                                <div className='flex justify-center mt-3'>
                                    <BtnCancel
                                        label="Voltar"
                                        onClick={() => closeModal()}
                                    />
                                    <BtnPrimary
                                        label="Agendar"
                                        disabled={!isValid}
                                        onClick={() => handleSubmit()}
                                    />
                                </div>
                            </>
                        )
                    }

                </Formik>
            </Modal>
        </>
    )
}

export default AddNewAppointment