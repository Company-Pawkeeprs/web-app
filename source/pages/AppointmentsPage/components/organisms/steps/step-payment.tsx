import { Form, useFormikContext } from "formik";
import { useState } from "react";
import { Input, Label } from "reactstrap";
import { BtnCancel, BtnPrimary } from "~/Components/atoms/btn";
import FieldControlSelect from "~/Components/molecules/field-control/field-control-select";
import FieldNumber from "~/Components/molecules/field-number/field-number";
import { StepProps } from "~/types/helpers";
import SendWhatsapp from "~/utils/pdf-generator/SendWhatsapp";
import CardTutor from "../../molecules/card-tutor";

const StepPayment = ({ activeTab, toggleTab }: StepProps) => {
    const { handleSubmit, isSubmitting } = useFormikContext();
    const send = new SendWhatsapp('pdfAppointment');

    const [event, setEvent] = useState<string>('credit');

    const options = new Array(12).fill(0).map((item, index) => ({
        value: index + 1,
        label: `${index + 1} Parcela${index + 1 > 1 ? 's' : ''}`,
        color: 'rgb(255 200 107);',
    }));

    return (
        <Form className="card card-body shadow-lg" onSubmit={handleSubmit}>
            <h4 className="text-center font-sans font-semibold text-base capitalize">
                Informações de Pagamento
                <br />
            </h4>
            <CardTutor />
            <div className="grid grid-cols-2 gap-2">
                <div className="my-3 justify-center items-center flex mobile:flex-col mobile:items-start col-span-full">
                    <div className="form-check form-check-inline">
                        <Input
                            id="credit"
                            name="form_payment"
                            type="radio"
                            className="form-check-input"
                            defaultChecked
                            onChange={(e) => { setEvent('credit') }}
                            required
                        />
                        <Label className="form-check-label" htmlFor="credit">
                            Cartão de Crédito
                        </Label>
                    </div>
                    <div className="form-check form-check-inline">
                        <Input
                            id="debit"
                            name="form_payment"
                            type="radio"
                            onChange={(e) => { setEvent('debit') }}
                            className="form-check-input"
                            required
                        />
                        <Label className="form-check-label" htmlFor="debit">
                            Cartão de Débito
                        </Label>
                    </div>
                    <div className="form-check form-check-inline">
                        <Input
                            id="pix"
                            name="form_payment"
                            onChange={(e) => { setEvent('pix') }}
                            type="radio"
                            className="form-check-input"
                            required
                        />
                        <Label className="form-check-label" htmlFor="pix">
                            Pix
                        </Label>
                    </div>
                    <div className="form-check form-check-inline">
                        <Input
                            id="cash"
                            name="form_payment"
                            onChange={(e) => { setEvent('cash') }}
                            type="radio"
                            className="form-check-input"
                            required
                        />
                        <Label className="form-check-label" htmlFor="cash">
                            Dinheiro
                        </Label>
                    </div>
                </div>

                <FieldControlSelect
                    label="Quantidade de Parcelas"
                    placeholder="Selecione a quantidade de parcelas"
                    name="installments"
                    options={options}
                    isDisabled={event !== 'credit'}
                />
                <FieldNumber
                    label="Valor do Pagamento? (R$)"
                    name="value_payment"
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
                    isLoading={isSubmitting}
                    type="submit"
                    label="Concluir Consulta"
                />
            </div>
            <div>
                <BtnPrimary
                    onClick={() => console.log(send)
                    }
                    label="Enviar PDF por Whatsapp"
                />
            </div>

        </Form>
    );
};

export default StepPayment;