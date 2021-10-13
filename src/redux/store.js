import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import authReducer from "./ducks/authDuck.js";
import employeeReducer from "./ducks/employeeDuck.js";
import employeeTypesReducer from "./ducks/employeeTypeDuck.js";

const rootReducer = combineReducers({
  auth: authReducer,
  employees: employeeReducer,
  employeeTypes: employeeTypesReducer,
});

export default function generateStore() {
  const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
  );
  return store;
}
