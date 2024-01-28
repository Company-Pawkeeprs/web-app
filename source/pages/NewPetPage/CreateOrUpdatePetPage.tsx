import { Formik } from 'formik'
import { useRouter } from 'next/navigation'
import { useCallback, useMemo } from 'react'
import Tabs from './components/templates/vertical-tabs'

import { BtnCancel } from '~/Components/atoms/btn'
import ModalConfirm from '~/Components/modals/confirm-modal'
import type { Veterinary } from '~/entities/Veterinary'
import useProfileVeterinary from '~/hooks/use-profile-veterinary'
import usePetById from '~/store/hooks/pet/use-pets'
import type { Breed } from '~/types/breedType'
import type { IPet } from '~/types/pet'
import type { IPetV2, On_Off } from '~/types/pet-v2'
import type { Location } from '~/types/profile'
import type { Gender, Species } from '~/types/speciesType'
import { useModeEditablePet } from './use-zustand-hook'

export type InitialValues = Nullable<IPet>

type MakeInitialValuesProps = {
    id_pet?: string
    pet_information?: IPetV2['pet_information']
    cpf_tutor: string
    phone?: string
    email?: string
    whatsapp?: string
    veterinary?: Veterinary
    address?: Location
    first_name?: string
    last_name?: string
}
type MakeInitialValues = (props: MakeInitialValuesProps) => InitialValues

export const makeInitialValues: MakeInitialValues = ({
    id_pet = null,
    cpf_tutor,
    phone = null,
    email = null,
    whatsapp = null,
    veterinary = null,
    address = null,
    pet_information = null,
    first_name = null,
    last_name = null,
}) => ({
    id: id_pet || pet_information?.id_pet || null,
    cpf_tutor,
    blood_donator: pet_information?.blood_donator || 'no',
    blood_type: pet_information?.blood_type || 'unknown',
    castrated: pet_information?.castrated || 'no',
    identification_number: pet_information?.identification_number || '',
    microchip: pet_information?.microchip || '',
    name_pet: pet_information?.name_pet || '',
    organ_donor: (pet_information?.organ_donor as On_Off) || 'no',
    race: (pet_information?.race as Breed) || 'unknown',
    sex: (pet_information?.sex as Gender) || 'unknown',
    specie: (pet_information?.specie as Species) || 'unknown',
    date_birth: pet_information?.date_birth || null,
    cpf_cnpj: cpf_tutor,
    phone_tutor: phone,
    ownerEmergencyContact: {
        cpf_cnpj: cpf_tutor,
        email: email || '',
        phone: phone || '',
        whatsapp: whatsapp || phone || '',
        last_name: last_name || '',
        address: {
            city: address?.city || '',
            complement: address?.complement || '',
            country: address?.country || '',
            neighborhood: address?.neighborhood || '',
            number: address?.number || '',
            state: address?.state || '',
            street: address?.street || '',
            zipCode: address?.zipCode || '',
        },
        avatar: '',
        id: '',
        first_name: first_name || '',
    },
    name: pet_information?.name_pet || '',
    veterinary,
})

type CreateOrUpdatePetPageProps = {
    document?: string
    id_pet?: string
}

const CreateOrUpdatePetPage = ({
    document,
    id_pet,
}: CreateOrUpdatePetPageProps) => {
    const {
        activeData: pet,
        isLoading,
        handleSubmit,
    } = usePetById(document as string, id_pet as string)

    const veterinary = useProfileVeterinary()
    const router = useRouter()
    const { mode } = useModeEditablePet()
    const initialValues = useMemo(() => {
        return makeInitialValues({
            id_pet,
            pet_information: pet?.pet_information,
            cpf_tutor: document as string,
            email: pet?.main_responsible_guardian?.contact?.email as string,
            phone: pet?.main_responsible_guardian?.contact?.phone as string,
            whatsapp: pet?.main_responsible_guardian?.contact?.whatsapp as string,
            veterinary,
            address: pet?.main_responsible_guardian?.address as Location,
            first_name: pet?.main_responsible_guardian?.first_name as string,
            last_name: pet?.main_responsible_guardian?.last_name as string,
        })
    }, [pet, document, veterinary, id_pet]) as IPet

    const onSubmit = useCallback(
        async (values: IPet) => {
            try {
                const data = await handleSubmit(values)
                if (data) router.push('/dashboard')
            } catch (_) {
                // console.log(error)
            }
        },
        [handleSubmit],
    )

    const hasPet = useMemo(() => {
        return !!pet?.id
    }, [pet])

    return (
        <Formik
            onSubmit={onSubmit}
            enableReinitialize
            initialValues={initialValues}
        >
            <div className="gap-2 mt-2 mobile:py-6">
                <ModalConfirm
                    title="Cancelar Novo Pet!"
                    onConfirm={() => router.back()}
                    description="Importante!"
                    message="Esta ação irá cancelar todas as operações realizadas até o momento, deseja continuar?"
                >
                    {({ onChangeOpen }) => {
                        return (
                            <div className="w-full flex mobile:justify-center mobile:items-center">
                                <BtnCancel
                                    disabled={mode !== 'editable'}
                                    type="button"
                                    className="mobile:w-96"
                                    label="Cancelar"
                                    onClick={() => onChangeOpen(true)}
                                />
                            </div>
                        )
                    }}
                </ModalConfirm>
                <Tabs isPending={isLoading} hasTutor={hasPet} hasPet={hasPet} />
            </div>
        </Formik>
    )
}

export default CreateOrUpdatePetPage
