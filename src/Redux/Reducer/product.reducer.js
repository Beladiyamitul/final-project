import * as ActionType from "../ActionType"


export const initalstate = {

    isLoading: false,
    product: [],
    error: ""


}



export const productReducer = (state = initalstate, action) => {

    switch (action.type) {
        case ActionType.LOADING_MEDICINE:
            return {
                ...state,
                isLoading: true,

                error: ""
            }
        case ActionType.GET_PRODUCT:
            return {
                ...state,
                isLoading: false,
                product: action.payload,
                error: ""
            }
        case ActionType.POST_PRODUCT:
            return {
                ...state,
                isLoading: false,
                product: state.product.concat(action.payload),
                error: ""
            }

        case ActionType.DELETE_PRODUCT:
            return {
                ...state,
                isLoading: false,
                product: state.product.filter((d, i) => d.id !== action.payload),
                error: ""
            }


        case ActionType.UPDATE_PRODUCT:
            return {
                ...state,
                isLoading: false,
                product: state.product.map((u) => {
                    if (u.id === action.payload.id) {
                        return action.payload
                    } else {
                        return u
                    }
                }),
                error: ""
            }

        case ActionType.ERROR_MEDICINE:
            return {
                ...state,
                isLoading: false,
                product: [],
                error: action.payload
            }
        default:
            return state

    }

}