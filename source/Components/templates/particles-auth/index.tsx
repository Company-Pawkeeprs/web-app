'use client'

import React from 'react';
import FooterAuth from '~/Components/organism/footer-auth';

type ParticlesAuthProps = {
    children: React.ReactNode;
}

const ParticlesAuth = ({ children }: ParticlesAuthProps) => {
    return (
        <div className="!bg-primary-500">
            <div className="auth-page-wrapper g-0">
                <div className="auth-one-bg-position auth-one-bg h-full" id="auth-particles">
                    <div className="bg-overlay"></div>
                    <div className="shape">
                        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 1440 60">
                            <path d="M 0,36 C 144,53.6 432,123.2 720,124 C 1008,124.8 1296,56.8 1440,40L1440 140L0 140z"></path>
                        </svg>
                    </div>
                </div>

                {children}
                {/* pass the children */}

                <FooterAuth />
            </div>
        </div>
    );
};

export default ParticlesAuth;