import { RadioGroup } from '@headlessui/react';
import { useState } from 'react';
import { useAppointmentConfirmed } from '~/store/hooks/appointments';
import CardScheduled from "../organisms/card-scheduled";

const StepConfirmed = () => {


    const { activeData, isLoading } = useAppointmentConfirmed()

    const [selected, setSelected] = useState(null)

    if (isLoading) return <div>Loading...</div>

    return (

        <RadioGroup value={selected} onChange={setSelected}>
            <RadioGroup.Label className="sr-only ">Server size</RadioGroup.Label>
            <div className="space-y-10 w-full">

                {activeData?.scheduled?.map((appointment) => (
                    <CardScheduled key={appointment.id} checked={selected === appointment} appointment={appointment} />
                ))}
            </div>
        </RadioGroup>
    );
};

export default StepConfirmed;
