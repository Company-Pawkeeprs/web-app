import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap'

import cn from 'classnames'
import { useState } from 'react'

import { tv } from 'tailwind-variants'
import withLoading from '~/Components/helpers/with-loading'
import useResizeMobile from '~/hooks/use-resize-mobile'
import { useAppSelector } from '~/store/hooks'
import type { StepProps, Tabs } from '~/types/helpers'
import StepAnamneses from '../organisms/steps/step-anamnese'
import StepGeral from '../organisms/steps/step-geral'
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
        title: 'Prontuário',
        href: '#Prontuário',
        Component: StepGeral,
    },
    {
        id: 2,
        title: 'Anamnese',
        href: '#Anamnese',
        Component: StepAnamneses,
    },
    {
        id: 3,
        title: 'Tratamento',
        href: '#Treatment',
        Component: StepTreatment,
    },
    {
        id: 4,
        title: 'Finalizar',
        href: '#Finalizar',
        Component: StepPayment,
    },
]

const tab = tv({
    // Ajuste os estilos base e variantes conforme necessário
    base: `
        w-full rounded-sm mobile:py-4
        ring-white/60 ring-offset-2
        leading-1 font-bold text-white
        mobile:text-xs
        text-sm flex web:flex-row items-center justify-center
        mobile:flex-col gap-2 step-arrow-nav
        mobile:border border-primary-500
        `,
    // Ajustes adicionais para os estilos mobile
    variants: {
        selected: {
            true: 'bg-white !text-primary-500 shadow',
            false: 'text-blue-100 ',
        },
        disabled: {
            true: '!text-gray-600 cursor-not-allowed bg-transparent hover:bg-transparent hover:text-gray-600',
            false: 'text-blue-100 ',
        },
    },
})

const VerticalTabs = () => {
    const [activeVerticalTab, setActiveVerticalTab] = useState(1)
    const [passedVerticalSteps, setPassedVerticalSteps] = useState([1])
    const { height } = useAppSelector((state) => state.Layout.headerSize)

    const { isMobile } = useResizeMobile()

    function toggleVerticalTab(tab: Tabs) {
        if (activeVerticalTab !== tab) {
            const modifiedSteps = [...passedVerticalSteps, tab]

            if (tab >= 1 && tab <= items.length) {
                setActiveVerticalTab(tab)
                setPassedVerticalSteps(modifiedSteps)
            }
        }
    }

    return (
        <section>
            <div
                style={{ marginTop: isMobile ? `${height}px` : 0 }}
                className={cn(
                    'mobile:fixed mobile:bottom-0 mobile:left-0 mobile:right-0 h-fit z-[100] bg-white mobile:border-t-2 border-primary-500',
                )}
            >
                <Nav className="nav-pills custom-nav nav-justified" role="tablist">
                    {items.map((item) => {
                        return (
                            <NavItem key={item.id}>
                                <NavLink
                                    href={item.href}
                                    id="steparrow-gen-info-tab"
                                    className={tab({
                                        selected: activeVerticalTab === item.id,
                                    })}
                                    onClick={() => {
                                        toggleVerticalTab(item.id)
                                    }}
                                >
                                    {item.title}
                                </NavLink>
                            </NavItem>
                        )
                    })}
                </Nav>
            </div>

            <TabContent
                activeTab={activeVerticalTab}
                className="card card-body shadow-lg mobile:!shadow-none mobile:!rounded-none mobile:m-0 mobile:p-4 rounded-t-none"
            >
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
        </section>
    )
}

export default withLoading(VerticalTabs)
