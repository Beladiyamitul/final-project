import * as ActionType from "../ActionType"


export const initalstate = {

    isLoading: false,
    cart: [],
    
    error: ""


}



export const CartReducer = (state = initalstate, action) => {

    console.log("action.type",action.type, action.payload, state.cart);

    switch (action.type) {
       
        case ActionType.ADD_CART:

            const Cdata = state.cart.find((s) => s.id === action.payload.id)
            if (Cdata) {
                 Cdata.quantity++;
            }
            else{
                state.cart.push(action.payload)
            }

            return {
                ...state,
                isLoading: false,
                // cart: state.cart.concat(action.payload),
                error: ""
            }
        case ActionType.GET_CART:
            return {
                ...state,
                isLoading: false,
                cart: action.payload,
                error: ""
            }
        case ActionType.EMPTY_CART:
            return {
                ...state,
                isLoading: false,
                cart: [],
                error: ""
            }
        case ActionType.EMPTY_BUY:
            return {
                ...state,
                isLoading: false,
                buy: [],
                error: ""
            }
        case ActionType.DELETE_CART:
            return {
                ...state,
                isLoading: false,
                cart: state.cart.filter((d , f) => d.id !== action.payload),
                error: ""
            }
            case ActionType.INCREMENT :
                return {
                    ...state,
                    cart : state.cart.map((r)=>{
                        if (r.id === action.payload) {
                            return{
                                id : r.id ,
                                quantity : r.quantity +1,
                            }
                        }
                        else{
                            return r;   
                         }
                    }) 
                
                }
            case ActionType.DECREMENT :
                return {
                    ...state,
                    cart : state.cart.map((r)=>{
                        if (r.id === action.payload) {
                            return{
                                id : r.id ,
                                
                                quantity : r.quantity -1,
                            }
                        }
                        else{
                            return r;
                         }
                    }) 
                }   

        default:
            return state

    }

}