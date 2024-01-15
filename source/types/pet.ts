import type { BloodType } from '~/store/slices/pets/bloodType'
import type { Breed } from '~/store/slices/pets/breedType'
import type { Gender, Species } from '~/store/slices/pets/speciesType'
import type { IHealthInsurance, On_Off } from './pet-v2'
import type { DTOProfile } from './profile'
import type { ITutor } from './tutor'

export type IPet = {
    id?: string
    name: string
    specie: Species
    race: Breed
    microchip?: string
    identification_number?: string
    health_insurance?: IHealthInsurance
    chip_number?: string
    date_birth: string | Date
    bloodType?: BloodType
    blood_donator?: On_Off | null
    color?: string
    allergies?: string[]
    medicationsInUse?: string[]
    castrated: On_Off
    dateOfCastration?: string
    organ_donor?: On_Off
    size?: string
    weight?: string
    pedigree?: On_Off
    pedigree_registry?: string
    ownerEmergencyContact: ITutor
    avatar?: string
    created_at?: string
    updated_at?: string
    sex: Gender
    veterinary: DTOProfile
}
