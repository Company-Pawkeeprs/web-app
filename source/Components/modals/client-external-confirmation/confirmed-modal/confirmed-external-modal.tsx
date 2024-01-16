import { Dialog, Transition } from '@headlessui/react'
import { Formik } from 'formik'
import { Fragment, useMemo } from 'react'
import * as Yup from 'yup'
import { BtnCancel, BtnPrimary } from '~/Components/atoms/btn'
import useModal from '~/hooks/use-modal'
import useListAppointments from '~/store/hooks/list-appointments'
import type { VeterinaryConsultation } from '~/types/appointment'

type ChildrenProps = {
    showModal: () => void
}

type ConfirmedExternalModalProps = {
    title: string
    description?: string
    message?: string
    label?: string
    item: VeterinaryConsultation
    children?: (params: ChildrenProps) => React.ReactNode
}

const validationSchema = Yup.object().shape({
    id: Yup.string().required('Campo obrigatório'),
})

const ConfirmedExternalModal = ({
    label = 'Confirmar',
    title = 'Você tem certeza?',
    item,
    children,
}: ConfirmedExternalModalProps) => {
    const { closeModal, open, showModal } = useModal()

    const { handleSubmit, isLoading } = useListAppointments({
        mode: 'confirmed',
        handleClose: () => {
            closeModal()
        },
    })

    const formattedDateAndHours = useMemo(() => {
        const date = item?.dates_consults?.date_consultation
        const hour = item?.dates_consults?.time_consultation
        const dateAndHour = `${date} às ${hour}`
        return dateAndHour
    }, [item])

    return (
        <>
            {children?.({ showModal })}
            {!children && (
                <div className="flex items-center justify-center">
                    <button
                        type="button"
                        onClick={showModal}
                        className="
                                rounded-md 
                                bg-secondary-500 bg-opacity-20 
                                px-4 py-2 text-sm 
                                font-medium 
                                text-white 
                                hover:bg-opacity-30 
                                focus:outline-none 
                                focus-visible:ring-2 
                                focus-visible:ring-white 
                                focus-visible:ring-opacity-75
                            "
                    >
                        {label}
                    </button>
                </div>
            )}

            <Transition appear show={open} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <Formik
                        initialValues={item}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ isValid }) => (
                            <div className="fixed inset-0 overflow-y-auto">
                                <div className="flex min-h-full items-center justify-center p-4 text-center">
                                    <Transition.Child
                                        as={Fragment}
                                        enter="ease-out duration-300"
                                        enterFrom="opacity-0 scale-95"
                                        enterTo="opacity-100 scale-100"
                                        leave="ease-in duration-200"
                                        leaveFrom="opacity-100 scale-100"
                                        leaveTo="opacity-0 scale-95"
                                    >
                                        <Dialog.Panel
                                            className="
                                    w-full 
                                    max-w-md 
                                    transform 
                                    overflow-hidden 
                                    rounded-2xl 
                                    bg-white 
                                    p-6 
                                    text-left 
                                    align-middle 
                                    shadow-xl 
                                    transition-all
                                    dark:!bg-dark-500
                                    dark:!text-gray-200
                                    !font-sans
                                "
                                        >
                                            <Dialog.Title
                                                as="h2"
                                                className="text-xl font-semibold leading-6 text-gray-900 dark:!text-gray-200 text-center"
                                            >
                                                {title}
                                            </Dialog.Title>

                                            <div className="mt-3 p-1">
                                                <p className="text-sm text-gray-500 dark:!text-gray-300 leading-6">
                                                    Está ação não poderá ser
                                                    desfeita.
                                                </p>
                                            </div>
                                            {formattedDateAndHours && (
                                                <p className="text-gray-500 flex justify-between">
                                                    <strong className="mr-2">
                                                        Data e Horário:
                                                    </strong>
                                                    {formattedDateAndHours}
                                                </p>
                                            )}

                                            <div className="mt-4 flex justify-center items-center">
                                                <BtnCancel
                                                    condition={!isLoading}
                                                    type="button"
                                                    onClick={closeModal}
                                                />

                                                <BtnPrimary
                                                    disabled={isLoading && !isValid}
                                                    isLoading={isLoading}
                                                    type="submit"
                                                    label="Continuar"
                                                />
                                            </div>
                                        </Dialog.Panel>
                                    </Transition.Child>
                                </div>
                            </div>
                        )}
                    </Formik>
                </Dialog>
            </Transition>
        </>
    )
}

export default ConfirmedExternalModal