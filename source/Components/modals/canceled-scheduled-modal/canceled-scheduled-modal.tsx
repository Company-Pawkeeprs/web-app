import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import useModal from '~/hooks/use-modal'

type onChangeOpen = (arg: boolean) => void

type ChildrenProps = {
    showModal: onChangeOpen
}

type CanceledScheduledModalProps = {
    children?: (params: ChildrenProps) => React.ReactNode
}

const CanceledScheduledModal = ({
    children,
}: CanceledScheduledModalProps) => {
    const { closeModal, open, showModal } = useModal()

    return (
        <>

            {
                children && children({ showModal })
            }
            {
                !children && (
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
                            {'label'}
                        </button>
                    </div>
                )
            }


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
                                <Dialog.Panel className="
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
                                ">
                                    <Dialog.Title
                                        as="h2"
                                        className="text-xl font-semibold leading-6 text-gray-900 dark:!text-gray-200 text-center"
                                    >
                                        {'Título'}
                                    </Dialog.Title>

                                    <Dialog.Description
                                        as="p"
                                        className="text-sm font-bold text-secondary-500 dark:!text-secondary-500 text-center"
                                    >
                                        {'Descrição'}
                                    </Dialog.Description>

                                    <div className="mt-3 p-1">
                                        <p className="text-sm text-gray-500 dark:!text-gray-300 leading-6">
                                            {'Mensagem'}
                                        </p>
                                    </div>

                                    <div className="mt-4 flex justify-center items-center">

                                    </div>


                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}

export default CanceledScheduledModal