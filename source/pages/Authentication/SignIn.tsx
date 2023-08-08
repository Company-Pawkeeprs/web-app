import Image from "next/image";
import { useEffect } from "react";

import bgAuthaimage from "~/assets/images/bg-three.webp";
import logoMobile from "~/assets/images/logo-mobile-login.png";
import logo from "~/assets/images/logo-sm.png";

import LOADING from "~/constants/loading";
import AuthInputs from "./components/organism/auth-inputs";

import { useRouter } from "next/navigation";
import { BtnLink } from "~/Components/atoms/btn";
import { resetLoading } from "~/store/auth/login/actions";
import { useAppDispatch, useAppSelector } from "~/store/hooks";
import AuthLayout from "../_layouts/auth/auth_layout";

const CoverSignIn = () => {
    const router = useRouter();
    const { isAuthenticated, isLoading } = useAppSelector(
        (state) => state.Login
    );
    const dispatch = useAppDispatch();

    const loading =
        isLoading === LOADING.PENDING || isLoading === LOADING.SUCCESS;

    useEffect(() => {
        if (isAuthenticated) {
            dispatch(resetLoading());
            router.push("/dashboard");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuthenticated]);

    return (
        <AuthLayout title="Entrar">
            <section className="grid grid-cols-1 lg:grid-cols-2 w-full lg:w-[80%] h-full lg:h-[90%] z-10 shadow-2xl">
                <picture>
                    <Image
                        src={bgAuthaimage}
                        alt="Auth Image0"
                        className="h-full w-full object-cover rounded-none lg:rounded-l-xl"
                        draggable="false"
                    />
                </picture>
                <main className="grid grid-cols-1 p-3 md:p-5 bg-white w-full rounded-none lg:rounded-r-xl">
                    <div className="flex flex-col justify-center items-center gap-3 lg:mt-5">
                        <Image
                            src={logo}
                            alt="logo"
                            className="hidden lg:flex h-16 w-16"
                        />
                        <Image
                            src={logoMobile}
                            alt="logo"
                            className="flex lg:hidden h-24 w-auto object-cover"
                        />
                        <p className="text-sm font-light mobile:hidden text-primary-500">
                            Seja bem-vindo!
                        </p>
                    </div>
                    <div className="mt-5 px-10 mobile:!mt-0 mobile:p-0">
                        {loading && (
                            <div className="flex justify-content-center">
                                <div
                                    className="spinner-border text-primary"
                                    role="status"
                                    style={{
                                        width: "5rem",
                                        height: "5rem",
                                    }}
                                >
                                    <span className="visually-hidden">
                                        Loading...
                                    </span>
                                </div>
                            </div>
                        )}

                        {!loading && <AuthInputs />}
                    </div>

                    <div className="w-full h-fit flex flex-col justify-center items-center ">
                        <p className="mb-0">
                            Você não tem uma conta ?
                        </p>
                        <BtnLink
                            href="/sign-up"
                        >
                            Registre-se
                        </BtnLink>
                    </div>
                </main>
            </section>
        </AuthLayout>
    );
};

export default CoverSignIn;
