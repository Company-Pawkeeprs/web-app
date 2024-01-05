/* eslint-disable react/jsx-no-undef */

import { useFormikContext } from "formik";
import { BtnCancel, BtnPrimary } from "~/Components/atoms/btn";


import { useMemo } from "react";
import * as yup from "yup";
import ComboBoxFields from "~/Components/modals/add-pet-modal/components/organisms/combo-box-fields";
import FieldControl from "~/Components/molecules/field-control";
import FieldControlSelect from "~/Components/molecules/field-control/field-control-select";
import FieldMasked from "~/Components/molecules/field-masked";
import { genderValues } from "~/store/slices/pets/sexType";
import { StepProps } from "~/types/helpers";
import { InitialValues } from "../../index";



const schema = yup.object().shape({
    pet_data: yup.object().shape({
        name_pet: yup.string().required("Campo obrigatório"),
        sex: yup.object().shape({
            label: yup.string().required("Campo obrigatório"),
            value: yup.string().required("Campo obrigatório"),
        }).required("Campo obrigatório"),
        date_birth: yup.date()
            .nullable()
            .required("Campo obrigatório")
    }),

});


const StepPet = ({ toggleTab, activeTab }: StepProps) => {
    const { values } = useFormikContext<InitialValues>();

    const isValid = useMemo(() => {
        return schema.isValidSync(values);
    }, [values]);


    return (
        <div className="card card-body shadow-lg">
            <div className="p-1 m-2 mb-4">
                <h4 className="text-center font-sans font-semibold text-base capitalize">
                    Informações do PET
                    <br />

                    <span className="text-sm font-bold text-secondary-500">Obrigatório (*)</span>
                </h4>
            </div>
            <h1 className="font-semibold">Preencha as Informações do PET</h1>
            <div className="grid grid-cols-3 gap-4 mt-4 mobile:grid-cols-1 mobile:gap-2">
                <FieldControl
                    label={`Nome do PET`}
                    required
                    name={`name`}
                    placeholder="Digite o nome do PET"
                    divClassName="col-span-full"
                />

                <ComboBoxFields />

                <FieldControlSelect
                    options={genderValues}
                    disabled={!!values.id}
                    name="gender"
                    required
                    label="Sexo do Pet"
                    placeholder="Macho/Fêmea..."
                />


                <FieldControl
                    label={`Data de nascimento`}
                    required
                    name={`date_birth`}
                    type="date"
                />

                <FieldMasked
                    label={`Número do microchip`}
                    name={`microchip`}
                    mask="_____"
                    placeholder="Digite o número do microchip (opcional)"
                />

                <FieldMasked
                    label={`Número de registro cartório`}
                    name={`identification_number`}
                    mask="_____"
                    placeholder="Digite o número do registro (opcional)"
                />


            </div>
            <div className="flex align-items-center justify-center gap-3 mt-4">
                <BtnCancel
                    label="Voltar"
                    onClick={() => {
                        toggleTab(activeTab - 1);
                    }}
                />
                <BtnPrimary
                    label="Próximo"
                    disabled={!isValid}
                    onClick={() => {
                        toggleTab(activeTab + 1);
                    }}
                />
            </div>
        </div>
    );
};

export default StepPet;
