import * as actionTypes from '../actions/actionTypes';

const initialState = {
    currentUser: null
}

export default function authReducer(state = initialState, action) {
    switch(action.type) {
        case actionTypes.SET_USER:
            console.log(action)
            return { currentUser: action.payload };
            break;
        case actionTypes.REMOVE_USER:
            return { currentUser: null }
            break;
        default: return state;
    }
}