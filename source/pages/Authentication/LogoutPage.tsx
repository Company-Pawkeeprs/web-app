'use client';

import Link from 'next/link';
import { useEffect } from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';


import { resetLoading, signOutUser } from '~/store/auth/login/actions';
import { useAppDispatch, useAppSelector } from '~/store/hooks';

import { useRouter } from 'next/navigation';
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
            dispatch(signOutUser());
            setTimeout(() => {
                dispatch(resetLoading());
                router.push('/sign-in')
            }, 1000);
        }
    }, [dispatch, isAuthenticated, router]);

    return (
        <AuthLayout title='Sair'>
            <Row className="justify-content-center g-0">
                <Col lg={6}>
                    <div className="p-lg-5 p-4 text-center">
                        {/* icon de um emoji chorando */}
                        <div className="mt-4 pt-2">
                            <h4>Você acabou de sair 😭</h4>
                            <p className="text-muted">Obrigado por usar <span className="fw-bold">PawKeeprs</span>, não esqueça de voltar</p>
                            <div className="mt-4">
                                <Link href="/sign-in" className="btn btn-success bg-green-600 w-100">Entrar</Link>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
        </AuthLayout>
    );
};

export default LogoutPage;