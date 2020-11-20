import { auth } from "../../firebase";
import * as actionTypes from './actionTypes';

const authSuccess = (user) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        payload: user,
    }
}

export const fetchUser = () => async dispatch => {
    try {
      await auth.onAuthStateChanged(currentUser => {
        if (currentUser) {
          localStorage.setItem("isAuthenticated", true)
          dispatch(authSuccess(currentUser.toJSON()))
        } else {
          localStorage.removeItem("isAuthenticated")
          dispatch(authSuccess(null))
        }
      })
    } catch (error) {
      throw error
    }
  }

export function signup(email, password) {
    return async dispatch => {
        await auth.createUserWithEmailAndPassword(email, password);
        dispatch(authSuccess(auth.currentUser.toJSON()))
    }
}

export function login(email, password) {
  return async dispatch => {
        await auth.signInWithEmailAndPassword(email, password);
        dispatch(authSuccess(auth.currentUser.toJSON()))
    }
}

export function logout() {
    return async dispatch => {
        await auth.signOut()
        dispatch(authSuccess(auth.currentUser))
    }
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
