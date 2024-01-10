import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap'

import cn from 'classnames'
import { useEffect, useState } from 'react'

import withLoading from '~/Components/helpers/with-loading'
import { useAppSelector } from '~/store/hooks'
import type { StepProps, Tabs } from '~/types/helpers'
import CardPet from '../molecules/card-pet'
import StepAnamneses from '../organisms/steps/step-anamnese'
import StepPayment from '../organisms/steps/step-payment'
import StepTreatment from '../organisms/steps/step-treatment'

type TabItem = {
    id: Tabs
    title: string
    href: string
    Component: (props: StepProps) => JSX.Element
}

const items: TabItem[] = [
    {
        id: 1,
        title: 'Anamnese',
        href: '#Anamnese',
        Component: StepAnamneses,
    },
    {
        id: 2,
        title: 'Tratamento',
        href: '#Treatment',
        Component: StepTreatment,
    },
    {
        id: 3,
        title: 'Finalizar',
        href: '#Finalizar',
        Component: StepPayment,
    },
]

const VerticalTabs = () => {
    const [isFixed, setIsFixed] = useState(false)
    const [activeVerticalTab, setActiveVerticalTab] = useState(1)
    const [passedVerticalSteps, setPassedVerticalSteps] = useState([1])

    const { height } = useAppSelector((state) => state.Layout.headerSize)

    function toggleVerticalTab(tab: Tabs) {
        if (activeVerticalTab !== tab) {
            const modifiedSteps = [...passedVerticalSteps, tab]

            if (tab >= 1 && tab <= items.length) {
                setActiveVerticalTab(tab)
                setPassedVerticalSteps(modifiedSteps)
            }
        }
    }

    useEffect(() => {
        if (window.innerWidth < 768) {
            setIsFixed(window.innerWidth < 768)
        }

        return () => {
            setIsFixed(false)
        }
    }, [])

    return (
        <section className="card card-body shadow-lg gap-2 mt-2">
            <h4 className="card-title mb-0">Nova Consulta</h4>
            <CardPet />
            <section className="form-steps">
                <div className="flex flex-col relative">
                    <div
                        style={{ marginTop: isFixed ? `${height}px` : 0 }}
                        className={cn(
                            'mb-4 step-arrow-nav',
                            {
                                'fixed top-0 left-0 right-0 z-[100] bg-white':
                                    isFixed,
                            },
                            'md:static',
                        )}
                    >
                        <Nav
                            className="nav-pills custom-nav nav-justified"
                            role="tablist"
                        >
                            {items.map((item) => {
                                return (
                                    <NavItem key={item.id}>
                                        <NavLink
                                            href={item.href}
                                            id="steparrow-gen-info-tab"
                                            className={cn({
                                                active:
                                                    activeVerticalTab === item.id,
                                                done:
                                                    activeVerticalTab <=
                                                        items.length &&
                                                    activeVerticalTab === item.id,
                                            })}
                                            onClick={() => {
                                                toggleVerticalTab(item.id)
                                            }}
                                        >
                                            {/* <span className="step-title me-2">
                                                                <i className="ri-close-circle-fill step-icon me-2"/>
                                                            </span> */}
                                            {item.title}
                                        </NavLink>
                                    </NavItem>
                                )
                            })}
                        </Nav>
                    </div>

                    <TabContent activeTab={activeVerticalTab}>
                        {items.map(({ id, Component }, index) => {
                            return (
                                <TabPane tabId={id} key={`${id}-${index}`}>
                                    <Component
                                        activeTab={activeVerticalTab}
                                        toggleTab={toggleVerticalTab}
                                    />
                                </TabPane>
                            )
                        })}
                    </TabContent>
                </div>
            </section>
        </section>
    )
}

export default withLoading(VerticalTabs)
