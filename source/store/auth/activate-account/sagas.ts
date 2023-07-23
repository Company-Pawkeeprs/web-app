import { all, call, fork, put, takeEvery } from "redux-saga/effects";

// Login Redux States
import {
  activateAccountError,
  activateAccountSuccess,
  resendConfirmationCodeError,
  resendConfirmationCodeSuccess
} from "./actions";
import {
  ACTION_ACTIVATE_ACCOUNT,
  ACTION_RESEND_CONFIRMATION_CODE,
  ActivateAccount
} from './types';
//Include Both Helper File with needed methods
import { PayloadAction } from "@reduxjs/toolkit";

import {
  confirmSignUp,
  resendConfirmationCode,
} from "~/services/helpers/auth";
import { errorToast, successToast } from "~/store/helpers/toast";

function* onResendConfirmationCode({ payload }: PayloadAction<{ username: string }>) {
  const { username } = payload;
  try {
    const { data } = yield call(resendConfirmationCode, username);
    yield put(resendConfirmationCodeSuccess(data));
    successToast("Código de confirmação reenviado com sucesso")
  } catch (error) {
    errorToast('Error resending confirmation code')
    yield put(resendConfirmationCodeError((error as any).message));
  }
}

function* onActiveAcccount({ payload }: PayloadAction<ActivateAccount>) {
  const { username, code } = payload;
  try {
    const { data } = yield call(confirmSignUp, username, code);
    yield put(activateAccountSuccess(data));
    successToast("Conta ativada com sucesso")
  } catch (error) {
    errorToast('Erro na ativação da conta')
    yield put(activateAccountError((error as any).message));
  }
}

export function* watchActivateAccount() {
  yield takeEvery(ACTION_ACTIVATE_ACCOUNT, onActiveAcccount);
}

export function* watchResendConfirmation() {
  yield takeEvery(ACTION_RESEND_CONFIRMATION_CODE, onResendConfirmationCode);
}

function* ActivateAccountSaga() {
  yield all([
    fork(watchResendConfirmation),
    fork(watchActivateAccount),
  ]);
}

export default ActivateAccountSaga;
