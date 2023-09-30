import { useFormikContext } from "formik";

import MenuMultipleSelection, { CardProps } from "~/Components/organism/menu-multiple-selection";

type Vaccines = {
    value: string
    label: string
    color: string
}


const CardVaccines = ({ label, index, name }: CardProps<Vaccines>) => {
    return (
        <div className="grid grid-cols-2 gap-2 card card-body shadow-2xl rounded-sm">
            <h3 className="text-lg font-bold col-span-2 text-gray-600">
                {label}
            </h3>

        </div>
    )
}

const MenuSelection = () => {
    const { values } = useFormikContext<{ vaccines: Vaccines[] }>();

    return (
        <MenuMultipleSelection
            card={CardVaccines}
            options={[{
                value: "1",
                label: "Medicação",
                color: 'rgb(255 200 107);',
            }]}
            name="Vaccines"
            label="Medicação"
            items={values.vaccines}
        />
    )
}

export default MenuSelection