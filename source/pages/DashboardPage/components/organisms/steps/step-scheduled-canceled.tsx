import { RadioGroup } from "@headlessui/react";
import { useState } from "react";
import { useAppointmentCanceled } from "~/store/hooks/appointments";
import CardScheduled from "../organisms/card-scheduled";

const StepCanceled = () => {
    const { activeData } = useAppointmentCanceled()
    const [selected, setSelected] = useState(null)

    return (
        <RadioGroup value={selected} onChange={setSelected}>
            <RadioGroup.Label className="sr-only ">Server size</RadioGroup.Label>
            <div className="space-y-10 w-full">

                {activeData.map((appointment) => (
                    <CardScheduled key={appointment.id} checked={selected === appointment} appointment={appointment} />
                ))}
            </div>
        </RadioGroup>
    );
};

export default StepCanceled;
