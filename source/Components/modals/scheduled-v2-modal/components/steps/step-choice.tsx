import { useRouter } from 'next/router'
import { useCallback } from 'react'
import { BtnPrimary, BtnSecondary } from '~/Components/atoms/btn'
import routes from '~/constants/routes'
import useFormikContextSafe from '~/hooks/use-formik-context-safe'
import type { Breed } from '~/types/breedType'
import type { Species } from '~/types/speciesType'
import type { InitialValues, StepProps } from '../../types'
import CardPet from '../card-pet'
import CardTutor from '../card-tutor'

const StepChoice = ({ nextStep, closeModal, pet }: StepProps) => {
    const router = useRouter()
    const { values } = useFormikContextSafe<InitialValues>()

    const handleNavigate = useCallback(() => {
        setTimeout(() => {
            router.push(
                `${routes.dashboard.new.appointments}?document=${values.ownerEmergencyContact?.cpf_cnpj}&pet=${values.id}`,
            )
        }, 100)

        closeModal?.()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [values])

    return (
        <div className="flex flex-1 flex-col">
            <div className="flex-[2] mobile:w-full mt-10 ">
                <CardPet
                    pet={{
                        name: pet.pet_information?.name_pet,
                        race: pet.pet_information?.race as Breed,
                        specie: pet.pet_information?.specie as Species,
                    }}
                />
                <CardTutor
                    tutor={values.ownerEmergencyContact}
                    document={values.ownerEmergencyContact?.cpf_cnpj}
                />
            </div>
            <div
                className="
                flex flex-[1] 
                mobile:flex-col mt-4 
                justify-center
                mobile:w-full items-end mobile:h-full 
                overflow-hidden
            "
            >
                <BtnPrimary
                    className="mobile:w-full"
                    onClick={handleNavigate}
                    label="Iniciar Consulta"
                />

                <BtnSecondary
                    className="mobile:w-full"
                    onClick={nextStep}
                    label="Agendar Consulta"
                />
            </div>
        </div>
    )
}

export default StepChoice
