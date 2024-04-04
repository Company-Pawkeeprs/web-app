import { Form } from 'formik'
import { useEffect, useMemo } from 'react'
import { BtnPrimary } from '~/Components/atoms/btn'
import CardTutor from '~/Components/molecules/card-tutor'
import FieldControlSelect from '~/Components/molecules/field-control/field-control-select'
import FieldCurrency from '~/Components/molecules/field-currency'
import FieldNumber from '~/Components/molecules/field-number'

import useFormikContextSafe from '~/hooks/use-formik-context-safe'
import type { VeterinaryConsultation } from '~/types/appointment'
import type { GenericSelect } from '~/types/pet-v2'

type CtxStepPayment = Pick<
    VeterinaryConsultation,
    'appointment_details' | 'tutor_pet_vet'
> & {}

const StepPayment = () => {
    const { handleSubmit, isSubmitting, isValid, values, setFieldValue } =
        useFormikContextSafe<CtxStepPayment>()

    const form_payment = useMemo(
        () =>
            values.appointment_details?.payment
                ?.form_payment as unknown as GenericSelect,
        [values],
    )

    useEffect(() => {
        if (form_payment.value !== 'credit_card') {
            setFieldValue('appointment_details.payment.number_installments', 1)
        }
    }, [form_payment])

    return (
        <Form onSubmit={handleSubmit}>
            <h4 className="text-center font-sans font-semibold text-base capitalize mt-4">
                Pagamento
                <br />
                <span className="text-xs font-bold text-secondary-500">
                    Obrigatório (*)
                </span>
            </h4>
            <div
                className="
                gap-2 flex flex-col card shadow-2xl p-8 
                border-secondary-500 border relative
                mobile:p-2 mobile:border  mobile:!shadow-none
                min-h-[420px]  rounded-sm
            "
            >
                <CardTutor
                    tutor={values.tutor_pet_vet?.tutor}
                    pet={values.tutor_pet_vet?.pet}
                />
                <div className="grid grid-cols-3 mobile:grid-cols-2 gap-2 z-50">
                    <FieldControlSelect
                        ctx={values}
                        required
                        divClassName="col-span-1"
                        name="appointment_details.payment.form_payment"
                        label="Forma de Pagamento"
                        checked={form_payment}
                        options={[
                            {
                                label: 'Cartão de Crédito',
                                value: 'credit_card',
                            },
                            {
                                label: 'Cartão de Débito',
                                value: 'debit_card',
                            },
                            {
                                label: 'Pix',
                                value: 'pix',
                            },
                            {
                                label: 'Dinheiro',
                                value: 'cash',
                            },
                            {
                                label: 'Transferência',
                                value: 'transfer',
                            },
                        ]}
                    />
                    <FieldNumber
                        ctx={values}
                        divClassName="col-span-1"
                        label="Parcelas (Somente Crédito)"
                        placeholder="Parcelas"
                        maximumFractionDigits={0}
                        maximumIntegerDigits={2}
                        name="appointment_details.payment.number_installments"
                        disabled={form_payment.value !== 'credit_card'}
                    />
                    <FieldCurrency
                        isValid={
                            Number(
                                values.appointment_details.payment.value_payment?.replace(
                                    ',',
                                    '.',
                                ),
                            ) > 0
                        }
                        required
                        divClassName="col-span-1 mobile:col-span-full"
                        label="R$"
                        name="appointment_details.payment.value_payment"
                    />

                    <legend className="col-span-3 text-xs text-gray-400 text-center">
                        Informações de pagamento apenas para efeito de relatório
                    </legend>
                </div>
                <BtnPrimary
                    disabled={!isValid}
                    isLoading={isSubmitting}
                    className="w-full mt-4"
                    type="submit"
                    label="Concluir Consulta"
                />
            </div>
        </Form>
    )
}

export default StepPayment
