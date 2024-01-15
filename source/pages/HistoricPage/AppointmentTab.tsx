import DefaultLayout from '../_layouts/dashboard/dashboard'

import HorizontalTabs from './components/organisms/templates/Horizontal-List'

const AppointmentsTabs = <T,>() => {
    return (
        <DefaultLayout title="Dashboard">
            <HorizontalTabs />
        </DefaultLayout>
    )
}

export default AppointmentsTabs