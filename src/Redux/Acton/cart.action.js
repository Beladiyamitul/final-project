import * as ActionType from '../ActionType'


export const AddcartAction = (data) => (dispatch) =>{
    dispatch ({type : ActionType.ADD_CART  , payload : data})
}


export const GetcartAction = () => (dispatch) =>{
    dispatch ({type : ActionType.GET_CART})
}

export const increment = (id) => (dispatch) =>{
    dispatch ({type : ActionType.INCREMENT , payload: id})
}


export const decrement = (id) => (dispatch) =>{
    dispatch ({type : ActionType.DECREMENT , payload : id })
}

export const deletecart = (id) => (dispatch) =>{
    dispatch ({type : ActionType.DELETE_CART , payload : id })
}

export const emptycart = () => (dispatch) =>{
    dispatch({type:ActionType.EMPTY_CART})
}