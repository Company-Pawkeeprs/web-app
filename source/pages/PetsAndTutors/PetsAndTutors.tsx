import DefaultLayout from "../_layouts/dashboard/dashboard";

import HorizontalTabs from "./components/organisms/templates/Horizontal-List";

const PetAndTutors = <T,>() => {
    return (
        <DefaultLayout title="Dashboard">
            <HorizontalTabs />
        </DefaultLayout>
    );
};

export default PetAndTutors;
