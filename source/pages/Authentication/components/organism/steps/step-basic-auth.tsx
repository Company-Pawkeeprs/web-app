
import { useFormikContext } from 'formik';
import { useEffect, useMemo, useState } from 'react';

import InputGroup from 'react-bootstrap/InputGroup';

import BtnSuccess from '~/Components/atoms/btn/btn-success';
import FieldControl from '~/Components/molecules/field-control';
import useDebounce from '~/hooks/use-debounce';
import { AccountSignUp } from '~/store/auth/register/types';
import validateEmail from '~/validations/email';
import validatePassword from '~/validations/password';


import PasswordRules from '../../molecules/password-rules';
import Container from '../../template/container';

import useThrottle from '~/hooks/use-throttle';
import { StepProps } from './types';

const StepSignUpBasicAuth = ({ nextStep, ...rest }: StepProps) => {
    const [step, setStep] = useState(true)
    const debounce = useDebounce()

    const [passwordShow, setPasswordShow] = useState(false);
    const [passwordConfirmShow, setPasswordConfirmShow] = useState(false);

    const { values, handleBlur } = useFormikContext<AccountSignUp>()
    const { email, password, passwordConfirm } = values;

    const requiredFieldsFilled = useMemo(() => {
        const isValid = (
            validatePassword.isValidSync(password) &&
            validateEmail.isValidSync(email) &&
            password === passwordConfirm
        )

        if (isValid) {
            setStep(true)
        }

        return isValid

    }, [email, password, passwordConfirm])

    const nextStepThrottle = useThrottle(nextStep, 100)

    useEffect(() => {
        if (requiredFieldsFilled && step) {
            debounce(() => {
                nextStepThrottle()
            }, 100)
        }

        return () => {
            setStep(false)
        }
    }, [requiredFieldsFilled, nextStepThrottle, step, debounce])

    const onToggleVisiblePassword = () => {
        setPasswordShow(state => !state)
    }

    const onToggleVisiblePasswordConfirm = () => {
        setPasswordConfirmShow(state => !state)
    }

    return (
        <Container>

            <FieldControl
                label="Email"
                name="email"
                type="email"
                className="form-control"
                aria-label="email"
                placeholder="Digite seu email"
                required
            />

            <FieldControl
                required
                label='Senha'
                name="password"
                type={passwordShow ? "text" : "password"}
                className="form-control border-end-0"
                placeholder="Digite sua senha"
                aria-label="password"
                onBlur={handleBlur}
                disabledError
            >
                <InputGroup.Text className="bg-transparent border-start-0">
                    <i onClick={onToggleVisiblePassword} className={passwordShow ? 'ri-eye-fill' : 'ri-eye-off-fill'} ></i>
                </InputGroup.Text>
            </FieldControl>

            <FieldControl
                required
                label='Repita a senha'
                name="passwordConfirm"
                type={passwordConfirmShow ? "text" : "password"}
                className="form-control border-end-0"
                placeholder="Repita a senha"
                aria-label="password-confirm"
                onBlur={handleBlur}
                disabledError
            >
                <InputGroup.Text className="bg-transparent border-start-0">
                    <i onClick={onToggleVisiblePasswordConfirm} className={passwordConfirmShow ? 'ri-eye-fill' : 'ri-eye-off-fill'} ></i>
                </InputGroup.Text>
            </FieldControl>


            <PasswordRules value={values.password} />


            <div className="mt-4 d-flex justify-content-center">
                <BtnSuccess label="Próximo" className="m-1" onClick={nextStep} disabled={!requiredFieldsFilled} />
            </div>

        </Container>
    )
}

export default StepSignUpBasicAuth