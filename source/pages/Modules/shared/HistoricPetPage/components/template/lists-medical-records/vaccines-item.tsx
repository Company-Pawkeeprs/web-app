import { format } from 'date-fns'
import { useTranslations } from '~/hooks/use-translations'
import type { Vaccine } from '~/types/medical-records'

type ItemProps = {
    item: Vaccine
}

const VaccineItem = ({ item }: ItemProps) => {
    const date_log = format(new Date(item.date_register_log), 'dd/MM/yyyy')
    const { t } = useTranslations('common')

    console.log('vaccine', item)

    return (
        <li className="flex flex-row items-center justify-between h-10 ">
            <p>
                <strong className="mr-2">Hospital:</strong>
                <span>{item.name || 0}</span>
            </p>

            <p className="text-gray-500 ">
                <strong className="mr-2">Registro:</strong>
                <span>{date_log}</span>
            </p>
        </li>
    )
}

export default VaccineItem
