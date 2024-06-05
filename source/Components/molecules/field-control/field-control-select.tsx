import { useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import type { Props } from 'react-select'
import Label from '~/Components/atoms/label'
import Select from '~/Components/atoms/select'
import useFormikContextSafe from '~/hooks/use-formik-context-safe'
import type { ObjPaths } from '~/types/helpers'
import type { InputControlProps, OptionSelect } from './types'

export type FieldSelectControl<Ctx> = Omit<
    InputControlProps<Props, Ctx>,
    'value' | 'disabled'
> & {
    ctx?: Ctx extends undefined ? never : Ctx
    name: Ctx extends undefined ? string : ObjPaths<Ctx>
    deps?: unknown[]
    onChangeValue?: (item: unknown) => void
    options?: OptionSelect[]
    value?: OptionSelect | null
    required?: boolean
    label: string
    isDisabled?: boolean
    divClassName?: string
}

const FieldControlSelect = <Ctx,>({
    label,
    required = false,
    name,
    divClassName,
    options = [],
    onChangeValue = () => {},
    ...props
}: FieldSelectControl<Ctx>) => {
    const { values: defaultValues, setFieldValue } = useFormikContextSafe<Ctx>()
    const { t } = useTranslation('common')
    const values = defaultValues as Ctx & { [key: string]: unknown }

    useEffect(() => {
        const item = options.find((option) => option.value === values[name])

        if (!item) return

        setFieldValue(name, item)
    }, [values[name]])

    const onChange = useCallback(
        (option: unknown | OptionSelect) => {
            onChangeValue?.(option)
            setFieldValue(name as ObjPaths<Ctx>, option, true)
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [setFieldValue],
    )

    return (
        <div className={divClassName}>
            <Label label={label} required={required} id={name} separator={':'} />
            <Select
                {...props}
                id={name}
                required={required}
                className={required ? 'border-secondary-500' : ''}
                options={options.map((option) => ({
                    ...option,
                    label: t(option.label),
                }))}
                name={name}
                onChange={onChange}
                value={props.value ?? values?.[name]}
            />
        </div>
    )
}

export default FieldControlSelect
