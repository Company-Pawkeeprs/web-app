import { useState } from "react";
import { useField } from 'formik'
import { Switch } from "@headlessui/react";
import ControlSwitch from "../switch/switch";


type AnswerProps = {
    question: string
    name: string
}

type AnswerSwitchProps = {
    answers: AnswerProps[]
    name: string
    title: string
    onClick?: () => void;
    color?: 'primary' | 'secondary'
}

const AnswerSwitch = ({ answers, title, name, onClick, color = 'primary' }: AnswerSwitchProps) => {
    const [enableds, setEnableds] = useState<string[]>([]);

    const [field, meta, helpers] = useField(`anamnese.${name}`)

    const { setValue } = helpers

    function onChange(e: any, name : string){
        if (e){
            return setEnableds(state => {
                const result = [...state, name]
                setValue(result)
                return result
            })
        }

        setEnableds(state => {
            const result = state.filter(value => value !== name)
            setValue(result)
            return result
        })
                

    }

    return (
        <ControlSwitch
            label={title}
            className="mt-2 lg:w-16 lg:h-7 w-[3.72rem] h-6"
        >
            {
                answers.map((answer, index) => (
                    <div className="flex  col-span-3 p-1 m-1 border-[0.5px] dark:border-zinc-700 shadow-sm justify-between items-center" key={index}>

                        <h6 className="col-span-2 ml-1">
                            <strong>{(index + 1).toString().padStart(2, '0')}. </strong>
                            {answer.question}
                        </h6>
                      <div className="align-middle lg:w-16 lg:h-7 w-[3.72rem] h-6">
                      <Switch
                        onClick={onClick}
                        checked={enableds.includes(answer.name)}
                        onChange={(e) => onChange(e, answer.name)}
                        className={`${
                            enableds.includes(answer.name) ? `bg-${color}-500` : `bg-${color}-600`
                                    }
                        relative inline-flex h-full w-full shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
                                >
                                    <span className="sr-only">Use setting</span>
                                    <span
                                        aria-hidden="true"
                                        className={`${
                                            enableds.includes(answer.name) ? "translate-x-9" : "translate-x-0"
                                        }
                        pointer-events-none inline-block lg:h-[24px] lg:w-[24px] h-[20px] w-[20px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                                    />
                        </Switch>
                      </div>
                    </div>
                ))
            }
        </ControlSwitch>
    )
}

export default AnswerSwitch