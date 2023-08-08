import { twMerge } from 'tailwind-merge';
import { tv } from "tailwind-variants";

const button = tv({
    base: `
        mobile:p-4
        px-4 m-1 text-white
        text-sm font-semibold rounded-md 
        gap-4 leading-4 font-semibold 
        rounded-lg transition 
        duration-300 ease-in-out w-32 border-none
        disabled:opacity-50 disabled:cursor-not-allowed
        opacity-80 hover:opacity-100 active:opacity-100
        hover:transform hover:scale-105
    `,
    variants: {
        color: {
            primary: "bg-primary-500 dark:bg-secondary-500",
            secondary: "bg-secondary-500 dark:bg-primary-500",
            success: "bg-green-500",
            cancel: "bg-transparent text-gray-500 dark:hover:text-gray-100",
            error: "bg-red-500",
            label: "bg-transparent text-gray-500 dark:hover:text-gray-100",
        },
    },
    defaultVariants: {
        color: "primary",
    }
})

type BtnProps = {
    color?: 'primary' | 'secondary' | 'success' | 'error';
} & React.ButtonHTMLAttributes<HTMLButtonElement>;


const Button = ({
    children,
    className,
    color = 'primary',
    type = 'button',
    ...props
}: BtnProps) => {
    return (
        <button
            type={type}
            className={twMerge(button({ color }), className)} {...props}>
            <span>{children}</span>
        </button>
    )
}


export default Button

