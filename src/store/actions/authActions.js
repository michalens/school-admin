import { auth } from "../../firebase";
import * as actionTypes from './actionTypes';

export function signup(email, password) {
    return async dispatch => {
        const newUser = await auth.createUserWithEmailAndPassword(email, password);
        dispatch({ type: actionTypes.SET_USER, payload: newUser })
    }
}

export function login(email, password) {
  return async dispatch => {
    const newUser = await auth.signInWithEmailAndPassword(email, password);
    dispatch({ type: actionTypes.SET_USER, payload: newUser })
}
}

export function logout() {
  return auth.signOut();
}

export function resetPassword(email) {
  return auth.sendPasswordResetEmail(email);
}

// export function updateEmail(email) {
//   return currentUser.updateEmail(email);
// }

// export function updatePassword(password) {
//   return currentUser.updatePassword(password);
// }
