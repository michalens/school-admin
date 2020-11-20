import { auth } from '../../firebase';
import * as actionTypes from '../actions/actionTypes';

const initialState = {
    groups: auth.currentUser
}

export default function studentsReducer(state = initialState, action) {
    switch(action.type) {
        case actionTypes.FETCH_GROUPS:
            console.log(action)
            return { groups: action.payload };
            break;
        default: return state;
    }
}