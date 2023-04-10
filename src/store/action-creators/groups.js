import {setGroupListAction, addGroupAction, setGroupIndexAction} from "../groups";

export const setGroupList = (payload) => {
  return async (dispatch) => dispatch(setGroupListAction(payload))
}

export const addGroup = payload => {
  return async dispatch => dispatch(addGroupAction(payload))
}

export const setGroupIndex = payload => {
  return async (dispatch) => {
    dispatch(setGroupIndexAction(payload))
  }
}