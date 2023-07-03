"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import TabContainer from "react-bootstrap/TabContainer";
import TabContent from "react-bootstrap/TabContent";
import TabPane from "react-bootstrap/TabPane";
//formik
import { Formik } from "formik";
import Link from "next/link";
import * as Yup from "yup";
import AuthSlider from "~/Components/organism/auth-carousel";

import validateEmail from "~/validations/email";
import validatePassword from "~/validations/password";

import { registerUser, resetRegisterFlag } from "~/store/auth/register/actions";
import { AccountSignUp } from "~/store/auth/register/types";
import { useAppDispatch, useAppSelector } from "~/store/hooks";
import bgAuth from "~/assets/images/bg-auth.webp";
import { useRouter } from "next/navigation";
import LOADING from "~/constants/loading";
import AuthLayout from "../_layouts/auth/auth_layout";
import StepActivation from "./components/organism/steps/step-activation";
import StepSignUpBasicAuth from "./components/organism/steps/step-basic-auth";

const validationSchema = Yup.object({
    email: validateEmail,
    password: validatePassword,
    passwordConfirm: Yup.string()
        .oneOf([Yup.ref("password"), null], "As senhas não coincidem")
        .required("Este campo é obrigatório"),
    termsOfUse: Yup.boolean().oneOf(
        [true],
        "Você deve aceitar os termos de uso"
    ),
    policyPrivacy: Yup.boolean().oneOf(
        [true],
        "Você deve aceitar a política de privacidade"
    ),
    //person: validatePerson,
    //address: validateAddress,
});

const CoverSignUp = () => {
    const [tab, setTab] = useState("1");

    const dispatch = useAppDispatch();
    const router = useRouter();
    const isLoading = useAppSelector(
        (state) => state.ActivateAccount.isLoading
    );
    const onSubmit = async (values: AccountSignUp) => {
        dispatch(registerUser(values));
    };

    useEffect(() => {
        return () => {
            dispatch(resetRegisterFlag());
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (isLoading === LOADING.SUCCESS) {
            dispatch(resetRegisterFlag());
            setTimeout(() => {
                router.push("/sign-in");
            }, 1500);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoading]);

    const initialValues: AccountSignUp = {
        email: "",
        password: "",
        passwordConfirm: "",
        termsOfUse: false,
        policyPrivacy: false,
    };

    const Tabs = [
        {
            id: "1",
            component: (props: any) => <StepSignUpBasicAuth {...props} />,
        },
        {
            id: "2",
            component: (props: any) => <StepActivation {...props} />,
        },
        // {
        //     id: '3',
        //     component: (props: any) => <StepSignUpAddress {...props} />
        // },
        // {
        //     id: '2',
        //     component: (props: any) => <StepSignUpTermsOfUse {...props} />
        // },
        // {
        //     id: '3',
        //     component: (props: any) => <StepSignUpLoading {...props} />
        // }
    ];

    const onChangeNextStep = () => {
        setTab((state) => {
            const stateNumber = Number(state);

            if (stateNumber === Tabs.length) {
                return state;
            }

            return (stateNumber + 1).toString();
        });
    };

    const onChangePrevStep = () => {
        setTab((state) => {
            const stateNumber = Number(state);

            if (stateNumber === 1) {
                return state;
            }

            return (stateNumber - 1).toString();
        });
    };

    return (
        <AuthLayout title="Criar conta">
            <div className="h-full lg:h-[80%] lg:w-[80%] z-10 flex flex-col lg:grid grid-cols-2">
                <div className="flex flex-1">
                    <Image
                        className="h-24 lg:h-full object-cover"
                        src={bgAuth}
                        alt="imagem pessoas"
                    />
                </div>
                <div className="z-10 bg-white h-full">
                    <Formik
                        enableReinitialize
                        validationSchema={validationSchema}
                        initialValues={initialValues}
                        onSubmit={onSubmit}
                    >
                        <TabContainer activeKey={tab}>
                            {Tabs.map((tab, index) => (
                                <TabContent key={index}>
                                    <TabPane
                                        eventKey={tab.id}
                                        data-testid={`step-${tab.id.padStart(
                                            2,
                                            "0"
                                        )}`}
                                    >
                                        {tab.component({
                                            prevStep: onChangePrevStep,
                                            nextStep: onChangeNextStep,
                                        })}
                                    </TabPane>
                                </TabContent>
                            ))}
                        </TabContainer>
                    </Formik>

                    <div className="text-center pb-0 bg-white">
                        <p className="list-group-item text-muted">
                            Você já tem uma conta ?
                            <br />
                            <Link
                                href="/sign-in"
                                className="font-semibold text-primary-600 no-underline "
                            >
                                Entrar!
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </AuthLayout>
    );
};

export default CoverSignUp;
