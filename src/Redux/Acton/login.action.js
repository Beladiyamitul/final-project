import * as ActionType from "../ActionType"


export const loginUser = (data) => (dispatch) => {

    dispatch({type: ActionType.AUTH_LOGIN , payload:data})
}


export const logedUser = (data) => (dispatch) => {

    dispatch({type: ActionType.AUTH_LOGED , payload:data})
}

export const logoutUser = () => (dispatch) => {
    dispatch({type:ActionType.LOGOUT_USER})
}

export const resetPassword = (data) => (dispatch) => {
    dispatch({type:ActionType.FORGOT_PASSWORD, payload:data})
}

export const googleLogin = () => (dispatch) => {
    dispatch({type:ActionType.GOOGLE_LOGIN})
}

export const loggedoutUser = () => (dispatch) => {
    dispatch({type:ActionType.LOGGGEDOUT_USER})
}

export const signupUser = (data) => (dispatch) => {

    dispatch({type: ActionType.AUTH_SIGNUP , payload:data})
}

export const emailVerify = (user) => (dispatch) => {

    dispatch({type: ActionType.EMAIL_VERIFY , payload:user})
}