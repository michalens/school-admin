import { auth } from '../../firebase';
import * as actionTypes from '../actions/actionTypes';

const initialState = {
    groups: [],
    selectedGroupId: "",
    students: [],
    selectedStudent: ""
}

export default function studentsReducer(state = initialState, action) {
    switch(action.type) {
        case actionTypes.FETCH_GROUPS:
            console.log(action.payload)
            return { ...state, groups: action.payload };
        case actionTypes.SELECT_GROUP:
            const selectedGroup = state.groups.find(g => g.id === action.payload);
            const students = selectedGroup?.students?.map(std => std.get())
            console.log(students)
            return {
                ...state,
                selectedGroupId: action.payload,
                students
            }
        default: return state;
    }
}