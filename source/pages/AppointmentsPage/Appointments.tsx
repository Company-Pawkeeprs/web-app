import DashboardLayouts from '../_layouts/dashboard';

import { BOOL_STATUS } from '~/store/slices/appointment-vet/types';
import VerticalTabs from './components/templates/vertical-tabs';

import { Formik } from 'formik';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo } from 'react';
import { BtnCancel } from '~/Components/atoms/btn';
import ModalConfirm from '~/Components/modals/confirm-modal';
import { Appointments } from '~/entities/Appointments';
import useProfileVeterinary from '~/hooks/use-veterinary';
import useAppointment from '~/store/hooks/appointment/use-appointment';
import usePetById from '~/store/hooks/pet/use-pets';
import { VeterinaryConsultation } from '~/types/appointment';
import { IPetV2 } from '~/types/pet-v2';
import { DTOProfile } from '~/types/profile';
import { geolocation } from '~/utils/geolocation';

export type InitialValues = VeterinaryConsultation;

type AppointmentsPageProps = {
    document: string;
    pet: string;
    appointment_id: string;
};

const initialValues = (
    {
        id: id_pet,
        pet_information,
        main_responsible_guardian,
        cpf_tutor,
        health_insurance,
    }: IPetV2,
    profile: DTOProfile,
    appointment_id: string,
): InitialValues => ({
    anamnesis: {
        note: '',
        questions_anamnesis: [],
    },
    cpf_cnpj_vet: profile.cpf_cnpj,
    crmv_vet: profile.crmv,
    cpf_tutor,
    dates_consults: {
        additional_remarks: '',
        date_consultation: '',
        reason_consultation: '',
        time_consultation: '',
        type_consultation: '',
    },
    id_pet: id_pet as string,
    treatments: {
        note: '',
        questions_treatment: [],
    },
    details_pet_consultation: {
        age: '',
        height: '',
        imc: '',
        length: '',
        type_weight: '',
        weight: '',
    },
    appointment_details: {
        appointment_geolocation: {
            latitude: '',
            longitude: '',
            altitude: '',
            date_geolocation: '',
            heading: '',
            precision: '',
            speed: '',
        },
        appointment_signature: {
            browser_device: '',
            date_signature: '',
            ip_address: '',
            operational_system: '',
            signature_data: '',
            status_signature: '',
            type_signature: '',
        },
        payment: {
            coin: '',
            date_payment: '',
            form_payment: '',
            number_installments: '',
            status_payment: '',
            value_payment: '',
        },
    },
    tutor_pet_vet: {
        pet: pet_information,
        tutor: main_responsible_guardian,
        veterinary: profile,
    },
});

const AppointmentsPage = ({
    document,
    pet,
    appointment_id,
}: AppointmentsPageProps) => {
    const router = useRouter();

    const {
        data,
        isLoading: isLoadingPet,
        isError,
    } = usePetById(document, pet);
    const profile = useProfileVeterinary();

    const { handleSubmit } = useAppointment();

    const values = useMemo(
        () => initialValues(data as IPetV2, profile, appointment_id),
        [data, profile, appointment_id],
    );

    useEffect(() => {
        geolocation();
    }, []);

    const onSubmit = async (values: InitialValues) => {
        const appointment = Appointments.build(values);
        const [geolocationData, signature] = await geolocation();
        appointment
            .defineAppointmentGeolocation(geolocationData)
            .defineAppointmentSignature(signature);
        await handleSubmit(appointment as any);
        router.push('/dashboard');
    };

    if (isError) {
        router.back();
        return null;
    }

    return (
        <Formik onSubmit={onSubmit} enableReinitialize initialValues={values}>
            <DashboardLayouts title="Nova Consulta">
                <div className="gap-2 mt-2 mobile:py-6">
                    <ModalConfirm
                        title="Cancelar Consulta!"
                        onConfirm={() => router.push('/dashboard')}
                        description="Importante!"
                        message="Esta ação irá cancelar todas as operações realizadas até o momento, deseja continuar?"
                    >
                        {({ onChangeOpen }) => {
                            return (
                                <BtnCancel
                                    type="button"
                                    label="Cancelar Consulta"
                                    onClick={() => onChangeOpen(true)}
                                />
                            );
                        }}
                    </ModalConfirm>

                    <VerticalTabs isLoading={isLoadingPet} />
                </div>
            </DashboardLayouts>
        </Formik>
    );
};

export default AppointmentsPage;
