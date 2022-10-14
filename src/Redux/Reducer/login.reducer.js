import * as ActionType from  '../ActionType'

const initalstate = {
    isLoading : false,
    user: null,
    error : ''
}


export const loginreducer = (state=initalstate , action) => {

    
    console.log("action.type",action.type, action.payload, state.cart);
    
    switch (action.type) {
        case ActionType.AUTH_LOGED : 
            return{
                ...state,
                isLoading : false,
                user:action.payload,
                error : ''
            }
        case ActionType.LOGGGEDOUT_USER : 
            return{
                ...state,
                isLoading : false,
                user:null,
                error : ''
            }
        
         default :
            return state;       

    }
}