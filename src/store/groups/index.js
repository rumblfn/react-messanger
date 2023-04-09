import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  groups: []
}

const groupsSlice = createSlice({
  name: 'groups',
  initialState,
  reducers: {
    setGroupListAction: (state, action) => {
      state.groups = action.payload
    },
    addGroupAction: (state, action) => {
      console.log(action.payload)
      state.groups.push(action.payload)
    },
    clearGroupsAction: () => initialState
  }
})

export const {
  setGroupListAction,
  addGroupAction,
  clearGroupsAction
} = groupsSlice.actions

export default groupsSlice.reducer