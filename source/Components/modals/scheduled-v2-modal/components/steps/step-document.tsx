import { cnpj, cpf } from 'cpf-cnpj-validator'
import { useEffect, useMemo } from 'react'
import BoxButtons from '~/Components/molecules/box-buttons/box-buttons'
import FieldDocument from '~/Components/molecules/field-document'
import useFormikContextSafe from '~/hooks/use-formik-context-safe'
import type { CtxSimplifiedPeTFields, StepProps } from '../../types'

const StepDocument = ({ nextStep, onChangeDocument, onChangeStep }: StepProps) => {
    const { values } = useFormikContextSafe<CtxSimplifiedPeTFields>()

    const validateDocument = useMemo(() => {
        const document = values.ownerEmergencyContact?.cpf_cnpj
        return cpf.isValid(document) || cnpj.isValid(document)
    }, [values.ownerEmergencyContact])

    useEffect(() => {
        if (validateDocument) {
            onChangeStep(1)
        }
    }, [validateDocument])

    return (
        <div className="mt-3 p-1 gap-2 ">
            <FieldDocument
                ctx={values}
                required
                name="ownerEmergencyContact.cpf_cnpj"
                className="w-full flex-1 mt-2"
                placeholder="CPF/CNPJ"
                onChange={(e: { target: { value: string } }) =>
                    onChangeDocument?.(e.target.value)
                }
            />
            <BoxButtons
                isValid={validateDocument}
                link={false}
                cancel={null}
                onClickSuccess={nextStep}
            />
        </div>
    )
}

export default StepDocument