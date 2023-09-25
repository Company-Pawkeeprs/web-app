import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
//Import images

import FieldControl from "~/Components/molecules/field-control/field-control";
import FieldCep from "~/Components/molecules/field-cep/field-cep";


import { useFormikContext } from 'formik';
import { useCallback, useMemo, useState, useTransition } from 'react';
import MaskedInput from 'react-input-mask';
import { IAddress } from '~/helpers/fetch-address-by-cep';
import useFetchAddress from '~/hooks/use-fetch-address';
import { InitialValues } from '../../../Appointments';

type StepTutorProps = {
    disabled?: boolean
}

const StepTutor = ({ disabled }: StepTutorProps) => {
    const [disabledInputs, setDisabledInputs] = useState({
        state: false,
        city: false,
        neighborhood: false,
        street: false,
        complement: false
    })

    const { values, setFieldValue } = useFormikContext<InitialValues>()

    const [isPending, startTransition] = useTransition()

    const updateAddressFields = useCallback(
        (params: IAddress) => {
            if (!params) return

            const { uf, localidade, bairro, logradouro, complemento } = params

            startTransition(() => {
                setFieldValue('tutor.address.state', uf || '')

                setFieldValue('tutor.address.city', localidade || '')

                setFieldValue('tutor.address.neighborhood', bairro || '')

                setFieldValue('tutor.address.street', logradouro || '')

                setFieldValue('tutor.address.complement', complemento || '')

                setDisabledInputs({
                    state: !!uf,
                    city: !!localidade,
                    neighborhood: !!bairro,
                    street: !!logradouro,
                    complement: !!complemento,
                })
            })
        },
        [setFieldValue],
    )

    const { loading } = useFetchAddress({ onChangeAddress: updateAddressFields, zipCode: values.tutor?.address?.zipCode || '' })


    const isLoading = useMemo(() => isPending || loading, [isPending, loading])

    return (
        <div>

            <Row className="g-3">


                <Col xs={12}>
                    <FieldControl
                        initialFocus
                        divClassName='my-1'
                        label='Email'
                        name="tutor.email"
                        aria-label="email"
                        disabled={disabled}
                        className=" "
                        placeholder="Digite o email do tutor"
                        required
                        disabledError
                    />
                </Col>

                <Col sm={2}>
                    <FieldCep
                        divClassName='my-1'
                        className=" "
                        label="CEP"
                        name="tutor.address.zipCode"
                        disabled={disabled || isLoading}
                        placeholder="Digite o CEP"
                        required
                    />   
                    
                </Col>
                <Col sm={3}>
                    <FieldControl
                        divClassName='my-1'
                        className=" "
                        type="text"
                        label="Estado"
                        name="tutor.address.state"
                        disabled={(disabledInputs.state || disabled) || isLoading}
                        placeholder={isLoading ? 'Carregando...' : 'Digite o nome do estado'}
                        required
                    />
                </Col>

                <Col sm={3}>
                    <FieldControl
                        divClassName='my-1'
                        className=" "
                        type="text"
                        label="Cidade"
                        name="tutor.address.city"
                        disabled={(disabledInputs.city || disabled) || isLoading}
                        placeholder={isLoading ? 'Carregando...' : 'Digite o nome da cidade'}
                        required
                    />
                </Col>
                <Col sm={4}>
                    <FieldControl
                        divClassName='my-1'
                        className=" "
                        type="text"
                        label="Rua"
                        name="tutor.address.street"
                        disabled={(disabledInputs.street || disabled) || isLoading}
                        placeholder={isLoading ? 'Carregando...' : 'Digite o nome da rua'}
                        required
                    />
                </Col>
            </Row>
        </div>


    )
}

export default StepTutor