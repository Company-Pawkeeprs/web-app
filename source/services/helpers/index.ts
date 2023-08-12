
import { Profile } from '~/store/auth/profile/types';
import { api } from '../api';

import * as urls from './urls';

export const createProfileVet = async (data: Profile) => api.post(urls.VET_CREATE_PROFILE(), data);
export const updateProfileVet = async (data: Profile, user_id: string) => api.post(urls.VET_UPDATE_PROFILE(), data, { params: { user_id } });
export const getVetProfile = async () => api.get(urls.VET_GET_PROFILE());

export const getAllAppointmentsVet = async () => api.get(urls.APPOINTMENT_GET_ALL());
export const getAppointmentVet = async (id_appointment: string) => api.get(urls.APPOINTMENT_GET_BY_ID(), { params: { id_appointment } });
export const createAppointmentVet = async (data: any) => api.post(urls.APPOINTMENT_CREATE(), data);
export const updateAppointmentVet = async (data: any, id_appointment: string) => api.post(urls.APPOINTMENT_UPDATE(), data, { params: { id_appointment } });

export const createScheduled = async (data: any,) => api.post(urls.SCHEDULED_CREATE(), data);

export const createProfileTutor = async (data: Profile) => api.post(urls.TUTOR_CREATE_PROFILE(), data);
export const updateProfileTutor = async (data: Profile, user_id: string) => api.post(urls.TUTOR_UPDATE_PROFILE(), data, { params: { user_id } });
export const getTutorProfile = async () => api.get(urls.TUTOR_GET_PROFILE());

export const getAllPets = async (cpf_tutor: string) => api.get(urls.PET_FETCH_ALL(), { params: { cpf_tutor } });
export const getPet = async (cpf_tutor: string, id_pet: string) => api.get(urls.PET_GET_PROFILE(), { params: { id_pet, cpf_tutor } });
export const createPet = async (data: any,) => api.post(urls.PET_CREATE_PROFILE(), data);
export const updatePet = async (data: any, cpf_tutor: string, id_pet: string) => api.post(urls.PET_UPDATE_PROFILE(), data, { params: { id_pet, cpf_tutor } });
export const updateHealthPet = async (data: any, cpf_tutor: string, id_pet: string) => api.post(urls.PET_UPDATE_HEALTH(), data, { params: { id_pet, cpf_tutor } });