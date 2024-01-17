<<<<<<< HEAD
import type { Breed } from "~/store/slices/pets/breedType";
import type { Gender, Species } from "~/store/slices/pets/speciesType";
import type { Contact, DTOProfile, Location } from "./profile";
=======
import type { Breed } from '~/types/breedType'
import type { Gender, Species } from '~/types/speciesType'
import type { Contact, DTOProfile, Location } from './profile'
>>>>>>> main

export type GenericSelect = {
    label: string;
    value: string;
};

export type On_Off = "yes" | "no";

export interface PetData {
    id_pet: string | null;
    name_pet: string;
    microchip: string | null;
    identification_number: string | null;
    specie: Species | null | GenericSelect;
    race: Breed | null | GenericSelect;
    castrated: On_Off | null;
    blood_type: string | null | GenericSelect;
    blood_donator: On_Off | null;
    sex: Gender | null | GenericSelect;
    organ_donor: string | null;
    date_birth: string | null;
    color: string | null;
    size: string | null;
    weight: string | null;
    pedigree: On_Off | null;
    pedigree_registry: string | null;
}

export type IHealthInsurance = {
    name: string | null;
    type_health: string | null;
    number_health: string | null;
    validity: string | null;
};

export type ITutor = {
    cpf_cnpj: string;
    first_name: string | null;
    last_name: string | null;
    name: string | null;
    url_img: string | null;
};

export type ISecondaryTutor = {
    name_tutor: string | null;
    cpf_tutor: string | null;
    phone_tutor: string | null;
    emaiL_tutor: string | null;
};

export type IMainResponsibleGuardian = {
    address: Location;
    contact: Contact;
} & ITutor;

export interface IPetV2 {
    id?: string | null;
    pet_information: PetData;
    main_responsible_guardian: IMainResponsibleGuardian;
    secondary_responsible_tutor: ISecondaryTutor;
    health_insurance: IHealthInsurance;
    veterinary: DTOProfile;
}

export type PetDataSimplified = Pick<
    PetData,
    "name_pet" | "specie" | "race" | "sex" | "date_birth" | "castrated"
>;

export type IMainResponsibleGuardianSimplified = {
    first_name: string;
    last_name: string;
    email: string;
    cpf_cnpj: string;
    phone: string;
    whatsapp: string;
    country: string;
    state: string;
    city: string;
    neighborhood: string;
    street: string;
};

export interface IPetV2Simplified {
    id?: string | null;
    cpf_tutor: string;
    pet_information: PetDataSimplified;
    main_responsible_guardian: IMainResponsibleGuardianSimplified;
    veterinary: DTOProfile;
}

export type IPetV2Data = {
    id: string;
    name_pet: string;
    microchip: string;
    identification_number: string;
    specie: string;
    race: string;
    blood_type: string;
    blood_donator: string;
    organ_donor: string;
    sex: string;
    castrated: boolean;
    date_birth: string;
};
