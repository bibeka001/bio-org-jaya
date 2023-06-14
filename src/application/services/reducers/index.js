import { combineReducers } from "redux";
import { SUCCESS, LOGOUT } from "../../action-types";
import authReducer from "./authReducer";

const rootReducer = combineReducers({
  authReducer,
});

const appReducer = (state, action) => {
  if (action.type === `${LOGOUT}_${SUCCESS}`) {
    return rootReducer(undefined);
  }
  return rootReducer(state, action);
};
export default appReducer;
