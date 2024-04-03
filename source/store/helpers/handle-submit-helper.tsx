import type { UseMutationResult } from '@tanstack/react-query'
import { errorToast } from './toast'

type GenericObject = {
    id?: string | null
}

export const handleSubmitHelper = async <T,>({
    data,
    entity,
    createMutation,
    updateMutation,
    onSubmit,
}: {
    data: T & GenericObject
    entity?: {
        build: (data: T) => any
    }
    onSubmit?: () => void
    createMutation: UseMutationResult<any, unknown, any, unknown>
    updateMutation: UseMutationResult<any, unknown, any, unknown>
}) => {
    try {
        const newData: GenericObject = entity ? entity.build(data) : data
        if (newData.id) {
            await updateMutation.mutateAsync(newData)
            return onSubmit?.()
        }
        await createMutation.mutateAsync(newData)
        return onSubmit?.()
    } catch (error) {
        if (!error) return errorToast('Erro')
        if (error instanceof Error) return errorToast(error.message, 'Erro')
        if (typeof error === 'string') return errorToast(error, 'Erro')
        if (typeof error !== 'object') return errorToast('Erro')
        if (!('response' in error)) return errorToast('Erro')
        if (!error.response) return errorToast('Erro')
        if (typeof error.response !== 'object') return errorToast('Erro')
        if (!('status' in error.response)) return errorToast('Erro')

        const statusCode = error?.response?.status
        if (statusCode === 401) {
            errorToast('Você não tem permissão para isso', 'Não autorizado')
            return
        }

        if (!('data' in error.response)) return errorToast('Erro')
        if (!error?.response?.data) return errorToast('Erro')

        if (typeof error?.response?.data === 'string') {
            return errorToast(error?.response?.data, 'Erro')
        }

        errorToast('Pedimos desculpas, houve um erro', 'Tente novamente')
    }
}
