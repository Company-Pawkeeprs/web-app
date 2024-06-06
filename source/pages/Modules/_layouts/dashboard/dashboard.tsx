'use client'

import type React from 'react'
import { memo } from 'react'
import HeaderTitle from '~/Components/atoms/header-title'
import ContextSettersStatusAppointmentsModals from '~/contexts/setters-status-appointments-modals-context'

type DashboardLayoutsSearch =
    | {
          searchBlock: true
          name: 'appointments' | 'veterinary' | 'tutor' | 'pet' | 'historic'
      }
    | {
          searchBlock?: false
          name?: never
      }

type DashboardLayoutsProps = {
    children: React.ReactNode
    title?: string
} & DashboardLayoutsSearch

const DashboardLayouts = ({
    children,
    title = '',
    searchBlock = true,
    name,
}: DashboardLayoutsProps) => {
    return (
        <main>
            <HeaderTitle title={title} />
            {/* {searchBlock && <BlockSearchAndInputDocument name={name as string} />} */}
            <div className="block h-6 web:hidden" />
            {children}
            <ContextSettersStatusAppointmentsModals />
        </main>
    )
}

export default memo(DashboardLayouts)
