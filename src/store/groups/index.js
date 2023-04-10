import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  groups: [],
  groupIndex: -1,
}

const groupsSlice = createSlice({
  name: 'groups',
  initialState,
  reducers: {
    setGroupListAction: (state, action) => {
      state.groups = action.payload
    },
    addGroupAction: (state, action) => {
      state.groups.push(action.payload)
    },
    setGroupIndexAction: (state, action) => {
      state.groupIndex = action.payload
    },
    clearGroupsAction: () => initialState
  }
})

export const {
  setGroupListAction,
  addGroupAction,
  setGroupIndexAction,
  clearGroupsAction
} = groupsSlice.actions

export default groupsSlice.reducer