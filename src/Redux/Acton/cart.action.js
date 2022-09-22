import * as ActionType from '../ActionType'


export const AddcartAction = (data) => (dispatch) =>{
    console.log(data);
    dispatch ({type : ActionType.ADD_CART  , payload : data})
}


export const GetcartAction = () => (dispatch) =>{
    dispatch ({type : ActionType.GET_CART})
}