import { useField } from "formik";
import Form from "react-bootstrap/Form";
import { If } from "~/utils/tsx-control-statements";

import InputGroup from "react-bootstrap/InputGroup";
import ErrMessage from "~/Components/atoms/err-message";

import { useEffect, useRef } from "react";
import type { InputControlProps } from "./types";
import { sub_speciality } from "~/common/data/subSpecialitys";
import Select from "react-select";

const options = sub_speciality.map((item) => ({
    value: item,
    label: item,
    color: 'rgb(255 200 107);',
  }));


const colorStyles = {
    control: (styles: any) => ({ ...styles, backgroundColor: "white" }),
    option: (styles: any, { data }: any) => {
      return { ...styles, color: 'black' };
    },
    multiValue: (styles: any, { data }: any) => {
      return {
        ...styles,
        backgroundColor: data.color,
        color: "#fff",
      };
    },
    multiValueLabel: (styles: any) => {
      return {
        ...styles,
        color: "#0b0909",
      };
    },
    multiValueRemove: (styles: any) => {
      return {
        ...styles,
        color: "#fff",
        cursor: "pointer",
        ":hover": {
          color: "#fff",
        },
      };
    },
};

const FieldControlTest = ({
    label,
    children,
    required = false,
    component,
    startChildren,
    disabledError = false,
    className,
    initialFocus = false,
    divClassName,
    ...props
}: InputControlProps) => {
    const ref = useRef<HTMLInputElement>(null);
    const { current } = ref;

    useEffect(() => {
        if (!initialFocus) return;

        if (!current?.focus) {
            console.warn(
                "FieldControl: initialFocus is true, but the component does not have the focus method"
            );
        }

        if (current?.focus) {
            current.focus();
        }
    }, [current, initialFocus]);

    const [inputProps, meta] = useField(props);
    const id = props.name || props.id;

    const InputComponent = component as any;
    const display =
        !disabledError && meta.touched && !!meta.error ? "block" : "none";

    const onChange = (e: any) => {
        props.onChange?.(e);
        inputProps.onChange(e);
    };

    return (
        <div className={divClassName}>
            <If condition={!!label}>
                <Form.Label
                    htmlFor={id}
                    className="mb-0 list-group-item fs-12"
                    data-testid={`label-${id}`}
                >
                    {label}
                    <If condition={required}>
                        <span className="text-danger">*</span>
                    </If>
                </Form.Label>
            </If>
            <InputGroup className="position-relative mb-2 z-10">
                {startChildren}
                <Select
                    className="w-full"
                    theme={(theme) => ({
                        ...theme,
                        borderRadius: 0,
                        colors: {
                          ...theme.colors,
                          primary25: 'rgb(9, 178, 133);',
                          primary: 'rgb(9, 178, 133);',
                        },
                      })}
                    styles={colorStyles}
                    placeholder="Selecione uma ou mais opções"
                    isSearchable={true}
                    isMulti
                    name="speciality"
                    options={options}

                />
                {children}
            </InputGroup>
            <ErrMessage
                message={meta.error?.toString() as string}
                data-testid={`err-${id}`}
                style={{
                    display,
                }}
            />
        </div>
    );
};

FieldControlTest.defaultProps = {
    component: "input",
};

export default FieldControlTest;
