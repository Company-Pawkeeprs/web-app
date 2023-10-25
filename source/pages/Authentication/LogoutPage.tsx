/* eslint-disable react-hooks/exhaustive-deps */
'use client';




import { useAppDispatch, useAppSelector } from '~/store/hooks';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { BtnLink } from '~/Components/atoms/btn';
import { resetLoading, signOutUser } from '~/store/slices/auth/login/actions';
import AuthLayout from '../_layouts/auth/auth_layout';

const LogoutPage = () => {
    const dispatch = useAppDispatch();
    const { isAuthenticated } = useAppSelector(state => state.Login)
    const router = useRouter()

    useEffect(() => {
        if (!isAuthenticated) {
            router.push('/sign-in')
        }

        if (isAuthenticated) {
            dispatch(resetLoading());
            dispatch(signOutUser());
        }

    }, [isAuthenticated]);

    return (
        <AuthLayout title='Sair'>

            <div className='flex flex-col items-center justify-center'>
                {/* icon de um emoji chorando */}
                <div className="mt-4 pt-2 text-center">
                    <h4>Você acabou de sair 😭</h4>
                    <p className="text-gray-400">Obrigado por usar a <span className="font-semibold text-gray-500">PawKeepr</span>, não se esqueça de voltar</p>
                    <BtnLink href='sign-in' className="!w-full !bg-primary-500 !text-white" message='Entrar' />
                </div>
            </div>

        </AuthLayout>
    );
};

export default LogoutPage;