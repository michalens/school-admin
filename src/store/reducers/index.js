import { combineReducers } from "redux";
import authReducer from "./authReducer";
import { firebaseReducer } from "react-redux-firebase";
import { firestoreReducer } from 'redux-firestore';
import studentsReducer from "./studentsReducer";

export default combineReducers({
    firebase: firebaseReducer,
    firestore: firestoreReducer,
  auth: authReducer,
  students: studentsReducer,
});
