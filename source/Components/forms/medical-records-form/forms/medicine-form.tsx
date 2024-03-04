import { Form, Formik } from 'formik'
import ControlSwitchDiv from '~/Components/molecules/control-switch-div'
import FieldControl from '~/Components/molecules/field-control'
import FieldTextArea from '~/Components/molecules/field-text-area'
import type { Medicine } from '~/types/medical-records'
import type { OptionFormsProps } from '../medical-records-form'

const HospitalizationForm = ({
    item = {} as Medicine,
    handleSubmit,
}: OptionFormsProps<Medicine>) => {
    return (
        <Formik
            initialValues={
                {
                    coin: '',
                    cpf_cnpj_who_applied: '',
                    date_application: new Date().toISOString(),
                    type_profile: 1,
                    who_applied: '',
                    type: 'medicines',
                    url_document: '',
                    name: '',
                    notes: '',
                    type_object: '',
                    value: '',
                    amount: '',
                    brand: '',
                    continuous_use: false,
                    date_end: new Date().toISOString(),
                    date_init: new Date().toISOString(),
                    interval: '',
                    period: '',
                    ...item,
                } as Medicine
            }
            onSubmit={handleSubmit}
        >
            {({ values, handleSubmit }) => (
                <Form
                    className="grid grid-cols-2 gap-1 mobile:grid-cols-1"
                    onSubmit={handleSubmit}
                >
                    <FieldControl ctx={values} label="Nome" required name="name" />

                    <FieldControl ctx={values} label="Marca" name="brand" />

                    <FieldControl
                        ctx={values}
                        label="Data de Inicio"
                        type="date"
                        name="date_application"
                    />

                    <FieldControl
                        ctx={values}
                        label="Data de Fim"
                        type="date"
                        name="date_application"
                    />
                    <ControlSwitchDiv
                        ctx={values}
                        name="continuous_use"
                        label="Uso Contínuo"
                        divClassName="col-span-full"
                    />

                    <FieldTextArea
                        ctx={values}
                        label="Descreva o Uso"
                        name="notes"
                        divClassName="col-span-full"
                    />
                </Form>
            )}
        </Formik>
    )
}

export default HospitalizationForm
