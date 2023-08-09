import { combineReducers } from "@reduxjs/toolkit";
import Consults from "./consults/slice";

// Front
import Layout from "./layouts/slice";

// Authentication
import ActivateAccount from './auth/activate-account/slice';
import ForgetPassword from "./auth/forget-pwd/slice";
import Login from "./auth/login/slice";
import Profile from "./auth/profile/slice";
import Account from "./auth/register/slice";

//Calendar
import Calendar from "./calendar/reducer";
//Chat
import chat from "./chat/reducer";

// Tasks
import Tasks from "./tasks/reducer";

//Tutor
import Tutor from "./tutor/slice";

// Pets
import Pets from "./pets/slice";

import VeterinaryAppointments from "./veterinary-appointments/slice";

// Pages > Team
import Team from "./team/reducer";


const rootReducer = combineReducers({
    // public
    Layout,
    Login,
    Account,
    ForgetPassword,
    VeterinaryAppointments,
    Profile,
    Calendar,
    chat,
    Tasks,
    Tutor,
    Team,
    Pets,
    ActivateAccount,
    Consults,
});

export default rootReducer;