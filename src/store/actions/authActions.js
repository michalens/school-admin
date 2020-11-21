export const signIn = (credentials) => {
  return (dispatch, getState, {getFirebase}) => {
    const firebase = getFirebase();
    
    firebase.auth().signInWithEmailAndPassword(
      credentials.email,
      credentials.password
    ).then(() => {
      dispatch({ type: 'LOGIN_SUCCESS' });
    }).catch((err) => {
      dispatch({ type: 'LOGIN_ERROR', err });
    });

  }
}

export const signOut = () => {
  return (dispatch, getState, {getFirebase}) => {
    const firebase = getFirebase();

    firebase.auth().signOut().then(() => {
      dispatch({ type: 'SIGNOUT_SUCCESS' })
    });
  }
}

export const signUp = (newUser) => {
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    const firebase = getFirebase();
    const firestore = getFirestore();

    firebase.auth().createUserWithEmailAndPassword(
      newUser.email, 
      newUser.password
    ).then(resp => {
      return firestore.collection('users').doc(resp.user.uid).set({
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        initials: newUser.firstName[0] + newUser.lastName[0]
      });
    }).then(() => {
      dispatch({ type: 'SIGNUP_SUCCESS' });
    }).catch((err) => {
      dispatch({ type: 'SIGNUP_ERROR', err});
    });
  }
}


// import { auth } from "../../firebase";
// import * as actionTypes from './actionTypes';

// const authSuccess = (user) => {
//     return {
//         type: actionTypes.AUTH_SUCCESS,
//         payload: user,
//     }
// }

// export const fetchUser = () => async dispatch => {
//     try {
//       await auth?.onAuthStateChanged(currentUser => {
//         if (currentUser) {
//           localStorage.setItem("isAuthenticated", true)
//           dispatch(authSuccess(currentUser.toJSON()))
//         } else {
//           localStorage.removeItem("isAuthenticated")
//           dispatch(authSuccess(null))
//         }
//       })
//     } catch (error) {
//       throw error
//     }
//   }

// export function signup(email, password) {
//     return async dispatch => {
//         await auth.createUserWithEmailAndPassword(email, password);
//         dispatch(authSuccess(auth.currentUser.toJSON()))
//     }
// }

// export function login(email, password) {
//   return async dispatch => {
//         await auth.signInWithEmailAndPassword(email, password);
//         dispatch(authSuccess(auth.currentUser.toJSON()))
//     }
// }

// export function logout() {
//     return async dispatch => {
//         await auth.signOut()
//         dispatch(authSuccess(auth.currentUser))
//     }
// }

// export function resetPassword(email) {
//   return auth.sendPasswordResetEmail(email);
// }

// // export function updateEmail(email) {
// //   return currentUser.updateEmail(email);
// // }

// // export function updatePassword(password) {
// //   return currentUser.updatePassword(password);
// // }
