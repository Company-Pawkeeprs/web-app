import { useMemo } from 'react'

import { BtnNeutral, BtnPrimary } from '~/Components/atoms/btn'

import { specialty_validation, type ActivateAccount } from '~/validations/activate'
import type { StepProps } from './types'

import * as Yup from 'yup'
import CheckboxIsMultiModalGroup from '~/Components/organism/checkbox-is-multi-modal-group'
import CheckboxModalGroup from '~/Components/organism/checkbox-modal-group'

import { list_service_type, pets, sub_specialty, types_service } from '~/constants'
import useFormikContextSafe from '~/hooks/use-formik-context-safe'

const options = sub_specialty.map((item) => ({
    value: item,
    label: item,
}))

const validate = Yup.object().shape(specialty_validation)

const StepActivationSpecialty = ({ nextStep, prevStep }: StepProps) => {
    const { values } = useFormikContextSafe<ActivateAccount>()

    const requiredValid = useMemo((): boolean => {
        return validate.isValidSync(values)
    }, [values])

    return (
        <div className="flex flex-col flex-1 gap-1">
            <CheckboxModalGroup
                ctx={values}
                label="Especialidade Principal"
                required
                className="my-4"
                name="specialty"
                items={options}
            />

            <CheckboxIsMultiModalGroup
                ctx={values}
                label="Tipo de Atendimento"
                name="types_service"
                items={types_service}
                required
            />
            <CheckboxIsMultiModalGroup
                ctx={values}
                label="Tipo de Animais Atendidos"
                name="list_service_type"
                items={list_service_type}
                required
            />
            <CheckboxIsMultiModalGroup
                ctx={values}
                label="Animais que Atende a domicílio"
                required
                items={pets}
                name="types_animals"
            />

            <CheckboxIsMultiModalGroup
                ctx={values}
                required
                label="Outras Especialidades"
                name="list_specialty"
                items={options}
            />

            <div className="flex items-center justify-center gap-2 mt-1 col-span-full">
                <BtnNeutral
                    outline
                    onClick={prevStep}
                    label="Voltar"
                    className="border-none"
                />
                <BtnPrimary
                    onClick={nextStep}
                    disabled={!requiredValid}
                    label="Próximo"
                />
            </div>
        </div>
    )
}

export default StepActivationSpecialty
