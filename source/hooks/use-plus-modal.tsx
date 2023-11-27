import { create } from 'zustand';
import CanceledScheduledModal from '~/Components/modals/canceled-scheduled-modal';
import { IAppointmentVet } from '~/store/slices/appointment-vet/types';


export enum ModalPlus {
    CanceledScheduled = 'CanceledScheduled',
    Rescheduled = 'Rescheduled',
}

interface PlusModalState {
    isOpen: {
        [key in ModalPlus]?: boolean;
    };
    open: (key: ModalPlus) => void;
    close: (key: ModalPlus) => void;
    item: IAppointmentVet,
    setItem: (item: IAppointmentVet) => void
    keys: typeof ModalPlus;
}

export const usePlusModal = create<PlusModalState>((set) => ({
    isOpen: {},
    open: (key: ModalPlus) => set({ isOpen: { [key]: true } }),
    close: (key: ModalPlus) => set({ isOpen: { [key]: false } }),
    item: {} as IAppointmentVet,
    setItem: (item: IAppointmentVet) => set({ item }),
    keys: ModalPlus,
}));

const ContextModalPlus = () => {
    const { isOpen, close, open } = usePlusModal();

    return (
        <>
            <CanceledScheduledModal
                closeModal={() => close(ModalPlus.CanceledScheduled)}
                isOpen={isOpen[ModalPlus.CanceledScheduled]}
                showModal={() => open(ModalPlus.CanceledScheduled)}
            >
                {
                    () => (<div className="hidden" />)
                }
            </CanceledScheduledModal>
        </>
    )
}

export default ContextModalPlus;