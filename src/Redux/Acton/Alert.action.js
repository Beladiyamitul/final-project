import * as ActionType from '../ActionType'


export const setAlert = (data) => (dispatch) => {
    console.log(data);
 dispatch({type:ActionType.SET_ALERT, payload:data})
}

export const resetAlert = () => (dispatch) => {
 dispatch({type:ActionType.RESET_ALERT})
}