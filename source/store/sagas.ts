import { all, fork } from "redux-saga/effects";
import ConsultsSagas from './consults/sagas';
//layout
import LoginSagas from "./auth/login/sagas";
import LayoutSaga from "./layouts/saga";
//Auth
import ActivateAccountSaga from "./auth/activate-account/sagas";
import ForgetSaga from "./auth/forget-pwd/sagas";
import ProfileSaga from "./auth/profile/sagas";
import AccountSaga from "./auth/register/sagas";
//calendar
import calendarSaga from "./calendar/saga";
//chat
import chatSaga from "./chat/saga";

import AppointmentVetSagas from './appointment-vet/sagas';
import PetsSagas from './pets/sagas';
import TutorsSagas from './tutor/sagas';


// Task
import taskSaga from "./tasks/saga";
// Crypto

//crm
import crmSaga from "./tutor/sagas";

// Pages > Team
import teamSaga from "./team/saga";


export default function* rootSaga() {
    yield all([
        //public
        fork(LayoutSaga),
        fork(AccountSaga),
        fork(ForgetSaga),
        fork(ProfileSaga),
        fork(chatSaga),
        fork(taskSaga),
        fork(ActivateAccountSaga),
        fork(TutorsSagas),
        fork(PetsSagas),
        fork(AppointmentVetSagas),
        fork(calendarSaga),
        fork(crmSaga),
        fork(ConsultsSagas),
        fork(teamSaga),
        fork(LoginSagas),
    ]);
}
