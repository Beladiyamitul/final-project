import { combineReducers } from "redux";
import { alertReducer } from "./alert.reducer";
import { CartReducer } from "./cart.reducer";
import { doctorReducer } from "./doctor.reducer";
import { loginreducer } from "./login.reducer";
import { OrderReducer } from "./orderplace.reducer";
import { productReducer } from "./product.reducer";
// import { medicineReducer } from "./medicine.reducer";


export const rootreducer = combineReducers({
    doctors : doctorReducer,
    product : productReducer,
    cartpro : CartReducer,
    login : loginreducer,
    order : OrderReducer,
    alert : alertReducer
  })
  

  