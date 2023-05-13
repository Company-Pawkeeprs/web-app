import { Dialog, Tab, Transition } from '@headlessui/react'
import { Formik } from 'formik'
import { useRouter } from 'next/navigation'
import { Fragment, useState } from 'react'
import routes from '~/routes'
import { addNewPet } from '~/store/actions'
import { useAppDispatch, useAppSelector } from '~/store/hooks'
import { SpeciesType } from '~/store/pets/speciesType'
import { Breed, Pet } from '~/store/pets/types'
import StepListBreeds from './components/organisms/steps/step-list-breeds'
import StepListPets from './components/organisms/steps/step-list-pets'
import StepListSpecies from './components/organisms/steps/step-list-species'
import useFindTutorByDocument from '~/hooks/use-find-tutor-by-document'
import LOADING from '~/constants/loading'

type onChangeOpen = (arg: boolean) => void

type ChildrenProps = {
    onChangeOpen: onChangeOpen
    onChangeDocument: (doc: string) => void
}

type ModalConfirmProps = {
    label?: string
    onConfirm?: () => void
    onCancel?: () => void
    children?: (params: ChildrenProps) => React.ReactNode
}

export type InitialValues = {
    name: string
    species: SpeciesType
    breed: Breed
    document: string
    ownerEmergencyContact: ReturnType<typeof useFindTutorByDocument>
}

const ModalListPets = ({ children, label, onCancel, onConfirm }: ModalConfirmProps) => {

    const [isOpen, setIsOpen] = useState(false)
    const [document, setDocument] = useState('')
    const [selectedTab, setSelectedTab] = useState(0)

    const isLoading = useAppSelector(state => state.Pets.isLoading)
    const dispatch = useAppDispatch()
    const tutor = useFindTutorByDocument(document);

    const initialValues: InitialValues = {
        name: '',
        document: document,
        species: '' as any,
        breed: '' as any,
        ownerEmergencyContact: tutor
    }

    const pets = useAppSelector(state => state.Pets.pets.filter(pet => {
        return pet.ownerEmergencyContact.document === document.replace(/\D/g, '')
    }))

    const onChangeSelectedTab = (index: number) => {
        setSelectedTab(index)
    }

    const router = useRouter()
    const handleNavigate = (pet: Pet) => {
        router.push(`${routes.dashboard.new.appointments}?document=${document}&pet=${pet.id}`)
    }

    const handleSubmit = (values: InitialValues) => {
        const { payload: pet } = dispatch(addNewPet(values))
        
        if (pet) {
            handleNavigate(pet as Pet)
        }
    }

    const handleCancel = () => {
        onCancel?.()
        setIsOpen(false)
    }

    const onChangeOpen = (arg: boolean) => {
        setIsOpen(arg)
    }

    const closeModal = () => {
        onChangeOpen(false)
    }

    const openModal = () => {
        onChangeOpen(true)
    }

    const onChangeDocument = (doc: string) => {
        setDocument(doc)
    }

    


    return (
        <>

            {
                children && children({ onChangeOpen, onChangeDocument })
            }
            {
                !children && (
                    <div className="flex items-center justify-center">
                        <button
                            type="button"
                            onClick={openModal}
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
                )
            }


            <Transition appear show={isOpen} as={Fragment}>
                <Tab.Group selectedIndex={selectedTab} onChange={onChangeSelectedTab}>
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
                                        "
                                    >
                                        <Dialog.Title
                                            as="h2"
                                            className="text-xl font-semibold leading-6 text-gray-900 dark:!text-gray-200 text-center"
                                        >
                                            Adicionar Pet
                                        </Dialog.Title>
                                        {
                                            isLoading === LOADING.PENDING && (
                                                <div className="flex items-center justify-center">
                                                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-500"></div>
                                                </div>
                                            )
                                        }
                                        <Dialog.Description
                                            as="p"
                                            className="text-xs text-gray-700 dark:!text-gray-200 text-center"
                                        >
                                            Selecione ou Adicione um Pet para prosseguir na consulta.
                                        </Dialog.Description>

                                        <Tab.List>
                                            {
                                                [1, 2, 3].map(
                                                    (item) => (
                                                        <Tab
                                                            key={item}
                                                            className="hidden"
                                                        />
                                                    )
                                                )
                                            }
                                        </Tab.List>
                                        <Formik initialValues={initialValues} enableReinitialize onSubmit={handleSubmit} >

                                            <Tab.Panels className="mt-2">
                                                <Tab.Panel key={1}>
                                                    <StepListPets
                                                        pets={pets}
                                                        handleNavigate={handleNavigate}
                                                        handleCancel={handleCancel}
                                                        onChangeSelectedTab={onChangeSelectedTab}
                                                        selectedTab={selectedTab}
                                                    />
                                                </Tab.Panel>
                                                <Tab.Panel key={2}>
                                                    <StepListSpecies
                                                        selectedTab={selectedTab}
                                                        onChangeSelectedTab={onChangeSelectedTab}
                                                    />
                                                </Tab.Panel>
                                                <Tab.Panel key={3}>
                                                    <StepListBreeds
                                                        selectedTab={selectedTab}
                                                        onChangeSelectedTab={onChangeSelectedTab}
                                                    />
                                                </Tab.Panel>

                                            </Tab.Panels>
                                        </Formik>



                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </Dialog>
                </Tab.Group>

            </Transition>
        </>
    )
}

export default ModalListPets