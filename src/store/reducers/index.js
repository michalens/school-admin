import {combineReducers} from "redux";
import authReducer from "./authReducer";
import studentsReducer from "./studentsReducer";

export default combineReducers({
    auth : authReducer,
    students : studentsReducer,
});