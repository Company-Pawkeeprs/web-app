import React from 'react';
import { Col, Container, Row } from 'reactstrap';

// Import Images
import processArrow from "~/assets/images/landing/process-arrow-img.png";

const WorkProcess = () => {
    return (
        <React.Fragment>
            <section className="section">
                <Container>
                    <Row className="justify-content-center">
                        <Col lg={8}>
                            <div className="text-center mb-5">
                                <h3 className="mb-3 fw-semibold">Mais tranquilidade para você, mais saúde
                                para o seu bichinho.</h3>
                                <p className="text-muted mb-4 ff-secondary">PawKeepr te dá
                                a tranquilidade de saber que todos os cuidados do seu amigo estão
                                em dia.</p>
                            </div>
                        </Col>
                    </Row>


                    <Row className="text-center">
                        <Col lg={4}>
                            <div className="process-card mt-4">
                                <div className="process-arrow-img d-none d-lg-block">
                                    <img src={processArrow} alt="" className="img-fluid" />
                                </div>
                                <div className="avatar-sm icon-effect mx-auto mb-4">
                                    <div className="avatar-title bg-transparent text-success rounded-circle h1">
                                        <i className="ri-quill-pen-line"></i>
                                    </div>
                                </div>

                                <h5>Tell us what you need</h5>
                                <p className="text-muted ff-secondary">The profession and the employer and your desire to make your mark.</p>
                            </div>
                        </Col>

                        <Col lg={4}>
                            <div className="process-card mt-4">
                                <div className="process-arrow-img d-none d-lg-block">
                                    <img src={processArrow} alt="" className="img-fluid" />
                                </div>
                                <div className="avatar-sm icon-effect mx-auto mb-4">
                                    <div className="avatar-title bg-transparent text-success rounded-circle h1">
                                        <i className="ri-user-follow-line"></i>
                                    </div>
                                </div>

                                <h5>Get free quotes</h5>
                                <p className="text-muted ff-secondary">The most important aspect of beauty was, therefore, an inherent part.</p>
                            </div>
                        </Col>

                        <Col lg={4}>
                            <div className="process-card mt-4">
                                <div className="avatar-sm icon-effect mx-auto mb-4">
                                    <div className="avatar-title bg-transparent text-success rounded-circle h1">
                                        <i className="ri-book-mark-line"></i>
                                    </div>
                                </div>

                                <h5>Deliver high quality product</h5>
                                <p className="text-muted ff-secondary">We quickly learn to fear and thus automatically avoid potentially.</p>
                            </div>
                        </Col>

                    </Row>
                </Container>
            </section>
        </React.Fragment>
    );
};

export default WorkProcess;