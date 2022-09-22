import * as ActionType from "../ActionType"


export const initalstate = {

    isLoading: false,
    cart: [],
    error: ""


}



export const CartReducer = (state = initalstate, action) => {

    console.log(action.type, action.payload, state.cart);

    switch (action.type) {
       
        case ActionType.ADD_CART:
            return {
                ...state,
                isLoading: false,
                cart: state.cart.concat(action.payload),
                error: ""
            }
        case ActionType.GET_CART:
            return {
                ...state,
                isLoading: false,
                cart: action.payload,
                error: ""
            }

        default:
            return state

    }

}