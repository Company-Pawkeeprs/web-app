'use client'

import { usePathname, useRouter } from 'next/navigation'
import { createContext, useEffect } from 'react'
import cookies from '~/constants/cookies'
import LOADING from '~/constants/loading'
import { decrypt, encrypt } from '~/helpers/encrypt-and-decrypt'
import { useAppDispatch, useAppSelector } from '~/store/hooks'
import {
    recoverUserByToken,
    signInUser,
    signOutUser,
} from '~/store/slices/auth/login/actions'
import {
    LoginState,
    onChangePassword,
    onChangeRememberMe,
    onChangeUsername,
    onSetRememberMe,
} from '~/store/slices/auth/login/slice'
import { getCookie, setCookie } from '~/utils/cookies-utils'

interface SignInData {
    username: string
    password: string
}

interface AuthContextType {
    isAuthenticated: boolean
    user: any
    password: string
    username: string
    isLoading: LOADING
    rememberMe: boolean
    onToggleRememberMe: () => void
    signIn: (data: SignInData) => Promise<void>
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType)

interface AuthProviderProps {
    children: React.ReactNode
}

const PUBLIC_ROUTES = [
    '/',
    '/sign-in',
    '/sign-up',
    '/forgot-password',
    '/activation',
    '/logout',
    '/confirm-account',
]

export function AuthProvider({ children }: AuthProviderProps) {
    const dispatch = useAppDispatch()
    const { user, isAuthenticated, isLoading, password, rememberMe, username } =
        useAppSelector((state) => state.Login as LoginState)
    const router = useRouter()
    const pathname = usePathname()

    useEffect(() => {
        const token = getCookie(cookies.token.name)
        const isPublicRoute = PUBLIC_ROUTES.includes(pathname)

        if (!token && isPublicRoute) return

        if (!token) {
            dispatch(signOutUser())
            router.prefetch('/sign-in')
            return
        }

        dispatch(recoverUserByToken(token))

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname])

    useEffect(() => {
        getRememberInfo()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    async function signIn({ username, password }: SignInData) {
        await setRememberInfo()
        dispatch(signInUser({ username, password }))
    }

    async function setRememberInfo() {
        const JSON_REMEMBER = JSON.stringify({
            username,
            password: encrypt(password),
        })

        if (rememberMe) {
            setCookie(
                cookies.remember.name,
                JSON_REMEMBER,
                cookies.remember.expires,
            )
        }
    }

    async function getRememberInfo() {
        const rememberInfo = getCookie(cookies.remember.name)

        if (!rememberInfo) {
            return
        }

        const { username, password } = rememberInfo

        dispatch(onSetRememberMe(true))
        dispatch(onChangeUsername(username))
        dispatch(onChangePassword(decrypt(password)))
    }

    const onToggleRememberMe = () => {
        dispatch(onChangeRememberMe())
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated,
                rememberMe,
                isLoading,
                password,
                username,
                onToggleRememberMe,
                signIn,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}
