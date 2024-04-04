import type { ComponentProps } from 'react'

import { type VariantProps, tv } from 'tailwind-variants'

export const input = tv({
    base: `
        w-full px-4 py-2 rounded-sm
        transition-all duration-100 ease-in-out
        transition-shadow 
        disabled:opacity-70 text-gray-600 disabled:bg-gray-200
        text-sm h-10 invalid:!shadow-outline-secondary-500 invalid:!text-secondary-500
        font-sans dark:bg-[#292e33] dark:text-gray-200 
        invalid:border-secondary-500 border invalid:focus:border-gray-300
        focus:!border-none focus:ring-0
        outline-primary
    `,
    variants: {
        required: {
            true: '!border-secondary-500',
        },
        isValid: {
            true: '!border-primary-500',
        },
        center: {
            true: 'text-center',
        },
    },
})

export type InputProps = ComponentProps<'input'> & VariantProps<typeof input>

const Input = ({
    className,
    isValid = false,
    required = false,
    ...props
}: InputProps) => {
    return (
        <input
            placeholder={props.placeholder || 'Digite aqui ...'}
            className={input({
                className,
                required: required && !isValid,
                isValid: required && isValid,
            })}
            {...props}
        />
    )
}
export default Input
