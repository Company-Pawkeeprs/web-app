/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { Tab } from '@headlessui/react'
import cn from 'classnames'
import { useState } from 'react'
import StepScheduledCanceled from '../steps/step-scheduled-canceled'
import StepScheduledDone from '../steps/step-scheduled-done'

const Tabs = () => [
    {
        id: 3,
        title: 'Consultas Canceladas',
        href: '#canceled',
        tab: <StepScheduledCanceled />,
    },
    {
        id: 5,
        title: 'Consultas Finalizadas',
        href: '#done',
        tab: <StepScheduledDone />,
    },
]

const HorizontalTabs = () => {
    const [categories] = useState(() => Tabs())

    return (
        <div className="w-full mt-2">
            <Tab.Group>
                <Tab.List className="flex  rounded-sm bg-primary-500 p-1">
                    {categories.map((category) => (
                        <Tab
                            key={category.id}
                            className={({ selected }) =>
                                cn(
                                    'w-full rounded-sm py-2.5 text-sm leading-5 font-bold text-white',
                                    'ring-white/60 ring-offset-2 focus:outline-none focus:ring-2',
                                    selected
                                        ? 'bg-white !text-secondary-500 shadow'
                                        : 'text-blue-100 hover:bg-white/[0.12]  hover:text-white',
                                )
                            }
                        >
                            {category.title}
                        </Tab>
                    ))}
                </Tab.List>
                <Tab.Panels className="mt-2">
                    {categories.map((item) => (
                        <Tab.Panel
                            key={item.id}
                            className={cn(
                                'rounded-xl bg-white p-3',
                                'ring-white/60 ring-offset-2 focus:outline-none focus:ring-2',
                            )}
                        >
                            {item.tab}
                        </Tab.Panel>
                    ))}
                </Tab.Panels>
            </Tab.Group>
        </div>
    )
}

export default HorizontalTabs