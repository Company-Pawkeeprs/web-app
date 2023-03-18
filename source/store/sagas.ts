import { all, fork } from "redux-saga/effects";
//layout
import LoginSagas from "./auth/login/sagas";
import LayoutSaga from "./layouts/saga";
//Auth
import ForgetSaga from "./auth/forget-pwd/saga";
import ProfileSaga from "./auth/profile/saga";
import AccountSaga from "./auth/register/sagas";

//calendar
import calendarSaga from "./calendar/saga";
//chat
import chatSaga from "./chat/saga";

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

    fork(calendarSaga),
    fork(crmSaga),

    fork(teamSaga),

    fork(LoginSagas),
  ]);
}
