import {
    UseQueryOptions,
    useMutation,
    useQueryClient
} from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'
import { useCallback, useMemo } from 'react'
import useAppQuery, { Fn } from '~/hooks/use-app-query'
import { errorToast, successToast } from '../helpers/toast'


type Data<T> = T & { id?: string }

type Stores<T, G> = {
    keys: (string | number)[]
    name: string
    enabled?: boolean
    update?: (
        id: string,
        data: Partial<Data<T>>
    ) => Promise<AxiosResponse<Data<T>>>
    del?: (id: string) => Promise<AxiosResponse<Data<T>>>
    add?: (data: Data<T> | Data<G>) => Promise<AxiosResponse<Data<T>>>
    get?: Fn<T[]>
    handleCloseModal?: () => void
    entity?: {
        build: (data: Data<T>) => Data<T>
    }
    options?: UseQueryOptions<T[]>
}

const TIME = 1000 * 60 * 5 // 5 min

const useAppStore = <T, G = unknown>({
    keys,
    add,
    update,
    get,
    del,
    entity,
    options,
    handleCloseModal,
    enabled = true,
    name
}: Stores<T, G>) => {
    const superKeys = ['active', ...keys]

    const { isLoading, data, error, isError } = useAppQuery<T[]>(superKeys, get!, {
        ...options,
        initialData: [],
        keepPreviousData: true,
        cacheTime: TIME, // 1 min
        enabled: !!get && enabled,
        // staleTime: TIME // 1 min
    })

    const queryClient = useQueryClient()

    const onError = (_err: any, _newData: any, context: any) => {
        queryClient.setQueryData(superKeys, context.oldData)
    }

    const onSettled = async () => {
        await queryClient.invalidateQueries(superKeys)
    }

    const onSuccess = useCallback(async (data: Data<T>) => {
        handleCloseModal?.()
    }, [handleCloseModal])


    const addData = useMutation({
        mutationFn: async (data: Data<T> | Data<G>) => {
            const res = await add?.(data)

            return res?.data as Data<T>
        },
        onSuccess,
        onSettled,
        onError,
    })

    const handleSubmit = useCallback(
        async (data: Data<T> | Data<G>) => {
            try {
                if (entity) {
                    data = entity.build(data as Data<T>)
                }

                const response = await addData.mutateAsync(data as Data<T>)
                successToast('Adicionado com sucesso')
                return response

            } catch (err) {

                const error = err as AxiosError;
                const statusCode = error?.response?.status

                console.info('error', error)

                const msg =
                    typeof error?.response?.data === 'string'
                        ? error?.response?.data
                        : 'Pedimos desculpas, houve um erro'

                if (statusCode === 401) {
                    errorToast('Você não tem permissão para isso', 'Não autorizado')
                    return
                }

                errorToast(msg, 'Tente novamente')

            }
        },
        [addData, entity]
    )

    const submitLoading = useMemo(
        () =>
            addData?.isLoading,
        [
            addData?.isLoading,
        ]
    )

    return {
        isLoading,
        activeData: data,
        error,
        addData,
        isError,
        handleSubmit,
        submitLoading,
        name
    }
}

export type AppStoreHook = typeof useAppStore

export default useAppStore
