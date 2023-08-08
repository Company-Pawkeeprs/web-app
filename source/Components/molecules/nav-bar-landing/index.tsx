"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BtnLink } from "~/Components/atoms/btn";

import ArrowRightOnRectangleIcon from '@heroicons/react/24/solid/ArrowRightOnRectangleIcon';

// Import Images
import logoLight from "~/assets/images/logo-dark.png";
import logoDark from "~/assets/images/logo-light.png";

const NavbarLanding = () => {
    // const [isOpenMenu, setIsOpenMenu] = useState(false);
    const [actionScroll, setActionScroll] = useState(false);

    // const toggle = () => setIsOpenMenu(!isOpenMenu);

    useEffect(() => {
        window.addEventListener("scroll", scrollNavigation, true);
    }, []);

    const scrollNavigation = () => {
        const scrollUp = document.documentElement.scrollTop;

        if (scrollUp > 100) {
            setActionScroll(true);
        } else {
            setActionScroll(false);
        }
    };

    return (
        <header>
            <nav
                className="fixed z-50 left-0 right-0 mobile:p-2 md:p-4 transition-colors data-[scroll-action=true]:bg-white data-[scrollAction=true]:shadow-md"
                data-scroll-action={actionScroll}
            >
                <div className="container flex flex-wrap justify-center gap-2 md:gap-0 md:justify-between">
                    <Link href="/">
                        <Image
                            src={logoDark}
                            className="hidden data-[logo-light=false]:flex"
                            data-logo-light={actionScroll}
                            alt="logo light"
                            height="40"
                        />
                        <Image
                            src={logoLight}
                            className="hidden data-[logo-light=true]:flex"
                            data-logo-light={actionScroll}
                            alt="logo dark"
                            height="40"
                        />
                    </Link>

                    {/* <NavbarToggler
                        className="navbar-toggler py-0 fs-20 text-body"
                        onClick={toggle}
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <i className="mdi mdi-menu"></i>
                    </NavbarToggler> */}

                    {/* <Collapse in={isOpenMenu} className="navbar-collapse"> */}

                    {/* <ScrollSpy
                                offset={0}
                                items={[
                                    "hero",
                                    "services",
                                    "features",
                                    "plans",
                                    "reviews",
                                    "team",
                                    "contact",
                                ]}
                                currentClassName="active"
                                className="navbar-nav mx-auto mt-2 mt-lg-0 items-center justify-center w-fit"
                                id="navbar-example"
                            >
                                <li className="nav-item">
                                    <a className="nav-link fs-15 fw-semibold text-secondary" href="#hero">Home</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link fs-15 fw-semibold text-light" href="#services">Services</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link fs-15 fw-semibold text-light" href="#features">Features</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link fs-15 fw-semibold text-light" href="#plans">Plans</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link fs-15 fw-semibold text-light" href="#reviews">Reviews</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link fs-15 fw-semibold text-light" href="#team">Team</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link fs-15 fw-semibold text-light" href="#contact">Contact</a>
                                </li>


                            </ScrollSpy> */}
                    <div className="z-50 flex gap-2">
                        <BtnLink
                            size="sm"
                            color="label"
                            bgColor="label"
                            weight="bold"
                            className=" w-32"
                            href="/sign-in"
                        >
                            Entrar
                            <ArrowRightOnRectangleIcon className="w-5 h-5" />
                        </BtnLink>
                        <BtnLink
                            size="sm"
                            weight="bold"
                            color="label"
                            bgColor="label"
                            className="border-2 border-solid border-primary-600 w-32 hover:!bg-secondary-500"
                            href="/sign-up"
                        >
                            Criar Conta
                            {/* icon de cadastro */}
                        </BtnLink>
                    </div>
                    {/* </Collapse> */}
                </div>
            </nav>
        </header>
    );
};

export default NavbarLanding;
