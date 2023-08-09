import LOADING from "~/constants/loading";

export const name = "profile";

export const SET_PROFILE = `setProfile`;
export const EDIT_PROFILE = `editProfile`;
export const EDIT_PROFILE_SUCCESS = `editProfileSuccess`;
export const EDIT_PROFILE_ERROR = `editProfileError`;
export const RESET_PROFILE_FLAG = `resetProfileFlag`;
export const GET_PROFILE_SESSION = `getProfileSession`;

export const ACTION_SET_PROFILE = `${name}/${SET_PROFILE}`;
export const ACTION_EDIT_PROFILE = `${name}/${EDIT_PROFILE}`;
export const ACTION_EDIT_PROFILE_SUCCESS = `${name}/${EDIT_PROFILE_SUCCESS}`;
export const ACTION_EDIT_PROFILE_ERROR = `${name}/${EDIT_PROFILE_ERROR}`;
export const ACTION_RESET_PROFILE_FLAG = `${name}/${RESET_PROFILE_FLAG}`;
export const ACTION_GET_PROFILE_SESSION = `${name}/${GET_PROFILE_SESSION}`;

export enum RULES {
    ADMIN = 1,
    VETERINARY = 2,
    TUTOR = 3,
}

export type Profile = Nullable<{
    [key: string]: any;
    id: number;
    email: string;
    type: RULES;
    phone: string;
    about: string;
    avatar: string;
    firstName: string,
    lastName: string,
    crmv: string,
    cpf_cnpj: string,
    company: string | null,
    phoneNumber: string,
    country: string;
    street: string;
    number: string;
    complement: string;
    neighborhood: string;
    city: string;
    state: string;
    zipCode: string;
    created_at: string;
    updated_at: string;
}>;

export type InitialStateProfile = {
    isLoading: LOADING;
    error?: string;
    user: Profile | null;
}