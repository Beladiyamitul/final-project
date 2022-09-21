import { combineReducers } from "redux";
import { CartReducer } from "./cart.reducer";
import { Counterreducer } from "./Counter.reducer";
import { doctorReducer } from "./doctor.reducer";
import { productReducer } from "./product.reducer";
// import { medicineReducer } from "./medicine.reducer";


export const rootreducer = combineReducers({
    counter : Counterreducer,
    doctors : doctorReducer,
    product : productReducer,
    cartpro : CartReducer
  })
  

  