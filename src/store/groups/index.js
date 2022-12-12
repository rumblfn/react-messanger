import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  groups: []
}

const groupsSlice = createSlice({
  name: 'groups',
  initialState,
  reducers: {
    setGroupListAction: (state, action) => {
      state.groups = [...state.groups, ...action.payload]
    },
    clearGroupsAction: () => initialState
  }
})

export const {
  setGroupListAction,
  clearGroupsAction
} = groupsSlice.actions

export default groupsSlice.reducer