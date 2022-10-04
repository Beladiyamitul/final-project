import { combineReducers } from "redux";
import { CartReducer } from "./cart.reducer";
import { doctorReducer } from "./doctor.reducer";
import { OrderReducer } from "./orderplace.reducer";
import { productReducer } from "./product.reducer";
// import { medicineReducer } from "./medicine.reducer";


export const rootreducer = combineReducers({
    doctors : doctorReducer,
    product : productReducer,
    cartpro : CartReducer,
    order : OrderReducer
  })
  

  