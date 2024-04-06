import Link, { type LinkProps } from 'next/link'
import type React from 'react'
import type { ComponentProps } from 'react'
import { type VariantProps, tv } from 'tailwind-variants'
import BtnAvatar from './btn-avatar'

import withControl from '~/Components/helpers/with-control'
import withLoading from '~/Components/helpers/with-loading'

export const button = tv({
    base: `
        mobile:p-4 mobile:w-full w-52
        px-4 m-1 h-12 py-2
        text-sm font-semibold rounded-md text-center
        gap-1 leading-1 font-semibold
        transition duration-100 ease-in-out
        disabled:opacity-50 disabled:cursor-not-allowed
        bg-opacity-80 hover:bg-opacity-100 active:opacity-100
        hover:transform hover:scale-105 disabled:hover:scale-100
        text-opacity-100
        flex justify-center items-center
    `,
    variants: {
        primary: {
            true: 'bg-primary-500 dark:bg-secondary-500 text-gray-50 dark:text-gray-600 border border-secondary-600',
        },
        secondary: {
            true: 'bg-secondary-500 text-gray-500 dark:bg-primary-500',
        },
        success: {
            true: 'bg-primary-500',
        },
        confirm: {
            true: 'bg-confirm-500',
        },
        cancel: {
            true: 'bg-secondary-500 text-gray-500',
        },
        text: {
            true: 'bg-transparent border-2 border-secondary-500 text-secondary-500 hover:!bg-gray-100',
        },
        link: {
            true: 'text-secondary-500 dark:text-primary-600 hover:no-underline capitalize w-fit',
        },
        icon: {
            true: 'w-fit p-1 m-0 h-fit text-gray-400 border-none hover:!bg-transparent',
        },
    },
})

const styledIcon = tv({
    base: `
        flex justify-center items-center
        w-6 h-6
    `,
})

export type BtnProps = {
    icon?: React.ReactNode | string | JSX.Element | JSX.ElementType | null
    label?: string
    iconStyle?: string
    children?: React.ReactNode
    isLoading?: boolean
    condition?: boolean
} & ComponentProps<'button'> &
    VariantProps<typeof button> &
    VariantProps<typeof styledIcon>

const Btn = ({
    label,
    icon,
    className,
    children,
    type = 'button',
    ...props
}: BtnProps) => {
    return (
        <button type={type} className={button({ ...props, className })} {...props}>
            {icon && <span className={styledIcon({ ...props })}>{icon}</span>}
            {children && (
                <span className={styledIcon({ ...props })}>{children}</span>
            )}
            <p>{label}</p>
        </button>
    )
}

const BtnCompose = withLoading(withControl(Btn))

const BtnPrimary = ({ label = 'Primário', ...props }: BtnProps) => {
    return <BtnCompose primary label={label} {...props} />
}

const BtnSecondary = ({ label = 'Secundário', ...props }: BtnProps) => {
    return <BtnCompose secondary label={label} {...props} />
}

const BtnSuccess = ({ label = 'Sucesso', ...props }: BtnProps) => {
    return <BtnCompose success label={label} {...props} />
}

const BtnConfirm = ({ label = 'Confirmar', ...props }: BtnProps) => {
    return <BtnCompose confirm label={label} {...props} />
}

const BtnCancel = ({ label = 'Cancelar', ...props }: BtnProps) => {
    return <BtnCompose cancel label={label} {...props} />
}

const BtnLabel = ({ label = 'Texto', ...props }: BtnProps) => {
    return <BtnCompose text label={label} {...props} />
}

const BtnIcon = ({
    icon,
    ...props
}: Omit<BtnProps, 'icon'> & {
    icon?: React.ReactNode
}) => {
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    return <BtnCompose icon={icon as any} {...props} />
}

type BtnLinkProps = {
    message?: string
    children?: React.ReactNode
    className?: string
} & VariantProps<typeof button> &
    LinkProps

const BtnLink = ({
    href,
    children,
    link = true,
    message,
    className,
    ...props
}: BtnLinkProps) => {
    return (
        <Link
            href={href}
            className={button({ ...props, link, className })}
            {...(props as any)}
        >
            {children && (
                <span className={styledIcon({ ...props })}>{children}</span>
            )}
            {message}
        </Link>
    )
}

export {
    Btn,
    BtnAvatar,
    BtnCancel,
    BtnConfirm,
    BtnIcon,
    BtnLabel,
    BtnLink,
    BtnPrimary,
    BtnSecondary,
    BtnSuccess
}

