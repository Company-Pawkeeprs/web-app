import { Combobox, Transition } from '@headlessui/react'
import { Fragment, useEffect, useState } from 'react'
import { FaArrowAltCircleDown, FaCheck } from 'react-icons/fa'
import FieldControl from '../field-control/field-control'

import { useFormikContext } from 'formik'
import { InputControlProps } from '../field-control/types'

import cn from 'classnames'

type Item = {
    value: string | number
    name: string
}

type ComboBoxAutocompleteProps<T> = {
    items: Array<Item & T>
} & InputControlProps

const ComboBoxAutocomplete = <T,>({ name, items = [], ...rest }: ComboBoxAutocompleteProps<T>) => {
    const [selected, setSelected] = useState<Item>()
    const [query, setQuery] = useState('')

    const { setFieldValue, values } = useFormikContext<{ [key in string]: any }>()
    const queryValue = values[name]

    useEffect(() => {
        setQuery(queryValue)
    }, [queryValue])

    const onChangeValue = (item: Item) => {
        setSelected(item)
        setFieldValue(name, item.name)
    }

    const filteredPeople =
        query === ''
            ? items
            : items.filter((item) =>
                item.name
                    .toLowerCase()
                    .replace(/\s+/g, '')
                    .includes(query.toLowerCase().replace(/\s+/g, ''))
            )

    return (
        <Combobox value={selected} onChange={onChangeValue}>
            <div className="relative">
                <div className="relative">
                    <FieldControl
                        name={name}
                        component={Combobox.Input as any}
                        displayValue={(item: Item) => item.name}
                        {...rest}
                    >
                        <Combobox.Button className="flex items-center p-1 ml-2">
                            <FaArrowAltCircleDown
                                className="h-3 w-3 text-gray-400"
                                aria-hidden="true"
                            />
                        </Combobox.Button>
                    </FieldControl>
                </div>

                <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                    afterLeave={() => setQuery('')}
                >
                    <Combobox.Options
                        className="
                            absolute max-h-60 
                            w-full overflow-auto 
                            rounded-md bg-white 
                            text-base shadow-lg 
                            ring-1 ring-black 
                            ring-opacity-5 
                            focus:outline-none 
                            sm:text-sm
                            z-50
                        "
                    >
                        {filteredPeople.length === 0 && query !== '' ? (
                            <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                                Nothing found.
                            </div>
                        ) : (
                            filteredPeople.map((item) => (
                                <Combobox.Option
                                    key={item.value}
                                    className={({ active }) =>
                                        cn({
                                            'relative cursor-default select-none py-2 pl-10 pr-4': true,
                                            'bg-teal-600 text-white': active,
                                            'text-gray-900': !active
                                        })
                                    }
                                    value={item}
                                >
                                    {({ selected, active }) => (
                                        <div>
                                            <span
                                                className={
                                                    cn({
                                                        'block truncate': true,
                                                        'font-medium': selected,
                                                        'font-normal': !selected
                                                    })
                                                }
                                            >
                                                {item.name}
                                            </span>
                                            {selected && (
                                                <span
                                                    className={`absolute inset-y-0 left-0 flex items-center pl-3 ${active ? 'text-white' : 'text-teal-600'
                                                        }`}
                                                >
                                                    <FaCheck />
                                                </span>
                                            )}
                                        </div>
                                    )}
                                </Combobox.Option>
                            ))
                        )}
                    </Combobox.Options>
                </Transition>
            </div>
        </Combobox>
    )
}

export default ComboBoxAutocomplete