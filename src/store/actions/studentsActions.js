import { db } from "../../firebase";
import * as actionTypes from "../actions/actionTypes"

export function fetchGroups() {
    return async dispatch => {
        
        const groups = await db.collection("groups").get();
        console.log(groups.docs)
        dispatch({ type: actionTypes.FETCH_GROUPS, payload: groups.docs  })
    }
}