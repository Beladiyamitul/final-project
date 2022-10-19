import { call, put, takeLatest, all } from 'redux-saga/effects'
import { ForgotpassAPI, GoogleLoginAPI, LoginAPI, LogoutApi, SignupApi } from '../../common/apis/login.api';
import { history } from '../../history';
import * as ActionType from "../ActionType"
import { setAlert } from '../Acton/Alert.action';
import { logedUser, loggedoutUser } from '../Acton/login.action';


// function* loginsaga(action) {
function*  signupsaga(action) {
   try {

      const user = yield call( SignupApi , action.payload);
      yield put(setAlert({ text: user.payload, color: "success" }))
      // yield put(emailVerify(user));
   } catch (e) {
      yield put(setAlert({ text: e.payload, color: "error" }))
      yield put({ type: "USER_FETCH_FAILED", message: e.message });
   }
}


// function* signupsaga(action) {
function* loginsaga(action) {
   try {
      const user = yield call(LoginAPI  , action.payload);
      history.push("/")
      yield put(setAlert({ text: "login Succesess", color: "success" }))

      yield put(logedUser(user.payload))
   }
   catch (e) 
   {
      yield put(setAlert({ text: e.payload, color: "error" }))
   }
    
}



function* logoutsaga(action) {
   try{
      const user = yield call(LogoutApi , action.payload)
      history.push("/")
      yield put (loggedoutUser(user))
      yield put(setAlert({ text: user.payload, color: "success" }))
   }
   catch (e){
      yield put(setAlert({ text: e.payload, color: "error" }))

   }

}


function* Resetpassword(action) {
   try{
      const user = yield call(ForgotpassAPI , action.payload)
      history.push("/")
      yield put(setAlert({ text: user.payload, color: "success" }))
   }
   catch (e){
      yield put(setAlert({ text: e.payload, color: "error" }))

   }

}

function* googleLoginsaga(action) {
   try{
      const user = yield call(GoogleLoginAPI );
      history.push("/")
      yield put(setAlert({ text: "login Succesess", color: "success" }))
      yield put(logedUser(user.user))
   }
   catch (e){
      yield put(setAlert({ text: e.payload, color: "error" }))

   }

}


function* watchlogin() {

   yield takeLatest(ActionType.AUTH_LOGIN, loginsaga);
}

function* watchsignup() {
   yield takeLatest(ActionType.AUTH_SIGNUP, signupsaga);
}


function* watchlogout () {
   yield takeLatest(ActionType.LOGOUT_USER, logoutsaga)
}

function* watchgoogleLogin () {
   yield takeLatest(ActionType.GOOGLE_LOGIN, googleLoginsaga)
}

function* watchResetpass () {
   yield takeLatest(ActionType.FORGOT_PASSWORD, Resetpassword)
}


export function* authSagaCall() {
   yield all([
      watchlogin(),
      watchsignup(),
      watchlogout(),
      watchgoogleLogin(),
      watchResetpass()
   ])
}

