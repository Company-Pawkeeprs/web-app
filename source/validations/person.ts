import { cnpj, cpf } from 'cpf-cnpj-validator';
import * as Yup from 'yup';

const transformTrim = (value: any, originalValue: string) => {
    // Remover espaços em branco extras da string
    return typeof originalValue === 'string' ? originalValue.trim() : originalValue;
}

const validate = Yup.object().shape({
    firstName: Yup.string()
        .transform(transformTrim)
        .min(2, 'O nome deve ter pelo menos 2 caracteres')
        .max(50, 'O nome deve ter no máximo 50 caracteres')
        .required('O campo de nome é obrigatório'),
    lastName: Yup.string()
        .transform(transformTrim)
        .min(2, 'O sobrenome deve ter pelo menos 2 caracteres')
        .max(155, 'O sobrenome deve ter no máximo 50 caracteres')
        .required('O campo de sobrenome é obrigatório'),
    crmv: Yup.string().matches(/^[A-Z]{2}\d{4,6}$/,
        'CRMV inválido. Exemplo: SP12345'
    ).required('O Campo CRMV é obrigatório'),
    contact: Yup.object().shape({
        phone: Yup.string().matches(/^[\d()-\s]+$/).required(),
        email: Yup.string().email('E-mail inválido').required('O campo de e-mail é obrigatório'),
        whatsapp: Yup.string().matches(/^[\d()-\s]+$/)
    }).required(),
    cpf_cnpj: Yup.string()
        .required('Este campo é obrigatório')
        .transform(value => value.replace(/[^\d]/g, ''))
        .test('cpf-cnpj-validator', 'Documento inválido', value => {
            if (!value) return false;
            return cpf.isValid(value) || cnpj.isValid(value);
        })
});

export type Person = Yup.InferType<typeof validate>;

export default validate;

