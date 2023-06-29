"use client";

import React, { useEffect } from "react";
import { HiOutlineArrowSmUp } from "react-icons/hi";
import NavbarLanding from "~/Components/molecules/nav-bar-landing";
import Footer from "./components/Footer";
import Plans from "./components/Plans";
import Home from "./home";

const LandingPage = () => {
    useEffect(() => {
        window.onscroll = function () {
            scrollFunction();
        };
    }, []);

    const scrollFunction = () => {
        const element = document.getElementById("back-to-top");
        if (element) {
            if (
                document.body.scrollTop > 100 ||
                document.documentElement.scrollTop > 100
            ) {
                element.style.display = "block";
            } else {
                element.style.display = "none";
            }
        }
    };

    const toTop = () => {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    };

    return (
        <React.Fragment>
            <div className="layout-wrapper landing">
                <NavbarLanding />
                <Home />
                {/* <WorkProcess /> */}
                <Plans />
                {/* <Reviews />
                <Teams />
                <FAQ />
                <Contact /> */}
                <Footer />
                <button
                    onClick={() => toTop()}
                    className="bg-secondary-500 p-3 rounded-full landing-back-top mb-[5rem] shadow-md"
                    id="back-to-top"
                >
                    <HiOutlineArrowSmUp size={20} />
                </button>
            </div>
        </React.Fragment>
    );
};

export default LandingPage;
