import {setGroupListAction} from "../groups";

export const setGroupList = (payload) => {
  return async (dispatch) => dispatch(setGroupListAction(payload))
}