import { cnpj, cpf } from "cpf-cnpj-validator";
import * as Yup from "yup";

import Address from './address';

const transformTrim = (value: any, originalValue: string) => {
    // Remover espaços em branco extras da string
    return typeof originalValue === "string"
        ? originalValue.trim()
        : originalValue;
};

type Specialty = {
    value: string;
    label: string;
}

type Contact = {
    email: string;
    phone: string;
    whatsapp: string;
}

type Location = {
    country: string;
    zipCode: string;
    state: string;
    city: string;
    neighborhood: string;
    street: string;
    number: string;
    complement: string;
}

export type ActivateAccount = {
    firstName: string;
    lastName: string;
    crmv: string;
    cpf_cnpj: string;
    specialty: {
        value: string;
        label: string;
    };
    list_service_type: string[];
    list_specialty: Specialty[];
    type: number;
    contact: Contact;
    location: Location;
}

const validate = Yup.object().shape({
    firstName: Yup.string()
        .transform(transformTrim)
        .min(2, "O nome deve ter pelo menos 2 caracteres")
        .max(50, "O nome deve ter no máximo 50 caracteres")
        .required("O campo de nome é obrigatório"),
    lastName: Yup.string()
        .transform(transformTrim)
        .min(2, "O sobrenome deve ter pelo menos 2 caracteres")
        .max(155, "O sobrenome deve ter no máximo 50 caracteres")
        .required("O campo de sobrenome é obrigatório"),
    crmv: Yup.string()
        .matches(/^[A-Za-z]{2}\d{4,6}$/, "CRMV inválido. Exemplo: SP12345")
        .min(6, "O CRMV deve ter pelo menos 6 caracteres")
        .transform((value) => value.toUpperCase())
        .required("O Campo CRMV é obrigatório"),
    specialty: Yup.object({
        value: Yup.string().required("O campo especialidade é obrigatório"),
        label: Yup.string().required("O campo especialidade é obrigatório"),
    }).required("O campo especialidade é obrigatório"),
    list_service_type: Yup.array().min(1, "Selecione pelo menos um tipo de atendimento").required(),
    list_specialty: Yup.array().of(
        Yup.object().shape({
            value: Yup.string().required("O campo especialidade é obrigatório"),
            label: Yup.string().required("O campo especialidade é obrigatório"),
        }),
    ).min(1, "Selecione pelo menos uma especialidade").required(),
    contact: Yup.object().shape({
        email: Yup.string()
            .email("O email deve ser válido")
            .required("O campo de email é obrigatório"),
        phone: Yup.string()
            .matches(/^[\d()-\s]+$/)
            .test('phone-validator', 'Número de telefone inválido', value => {
                if (!value) return false;
                return value.length >= 10;
            })
            .required('O campo de telefone é obrigatório'),
        whatsapp: Yup.string()
            .matches(/^[\d()-\s]+$/)
            .test('phone-validator', 'Número de telefone inválido', value => {
                if (!value) return false;
                return value.length >= 10;
            })
            .required('O campo de whatsapp é obrigatório'),
    }),
    cpf_cnpj: Yup.string()
        .required("Este campo é obrigatório")
        .transform((value) => value.replace(/[^\d]/g, ""))
        .test("cpf-cnpj-validator", "Documento inválido", (value) => {
            if (!value) return false;
            return cpf.isValid(value) || cnpj.isValid(value);
        }),
    location: Address
});


export default validate;
