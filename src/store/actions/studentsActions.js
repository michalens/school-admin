import { db } from "../../firebase";
import * as actionTypes from "../actions/actionTypes";

export function fetchGroups() {
  return async (dispatch) => {
    const groupsData = await db.collection("groups").get();
    const groups = groupsData.forEach(async (doc) => {
      const newItem = doc.data();
      newItem.id = doc.id;
      if (newItem.students) {
        const students = await newItem.students.get();
        newItem.students = students.map((stdDoc) => {
          const newStd = stdDoc.data();
          newStd.id = stdDoc.id();
        });
      }
      return newItem;
    });
    dispatch({ type: actionTypes.FETCH_GROUPS, payload: groups });
  };
}

export function selectGroup(id) {
  return { type: actionTypes.SELECT_GROUP, payload: id };
}
