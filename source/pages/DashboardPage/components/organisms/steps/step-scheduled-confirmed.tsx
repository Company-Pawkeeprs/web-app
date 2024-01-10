import useListAppointments from '~/store/hooks/list-appointments'
import CardScheduled from '../organisms/card-scheduled'

const StepConfirmed = () => {
    const { activeData, isLoading } = useListAppointments({ mode: 'confirmed' })

    if (isLoading) return <div>Loading...</div>

    return (
        <div className="space-y-10 w-full">
            {activeData?.map((appointment) => (
                <CardScheduled key={appointment.id} appointment={appointment} />
            ))}
        </div>
    )
}

export default StepConfirmed
