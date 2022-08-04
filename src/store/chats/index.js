import {createSlice} from "@reduxjs/toolkit";

const defaultMessagesObject = {
  firstLoading: false,
  newmessageindex:  0,
  messages: [],
  unreadMessages: 1
}

const initialState = {
  friendList: [],
  messages: {},
  friendIndex: -1,
  confirmations: [],
  unreadMessages: {}
}

const chatsSlice = createSlice({
  name: 'chats',
  initialState,
  reducers: {
    setFriendListAction: (state, action) => {
      state.friendList = action.payload
    },
    addFriendAction: (state, action) => {
      state.friendList.unshift(action.payload)
    },
    setFriendIndexAction: (state, action) => {
      state.friendIndex = action.payload
    },
    setMessagesAction: (state, action) => {
      state.messages[action.payload.userid] = {
        firstLoading: true,
        newmessageindex: action.payload.lastindex,
        messages: action.payload.messages
      }
    },
    addMessageAction: (state, action) => {
      const userid = action.payload.userid

      if (state.messages[userid]) {
        state.messages[userid].messages.unshift(action.payload.message)
        state.messages[userid].newmessageindex += 1
      } else {
        state.messages[userid] = {...defaultMessagesObject}
      }

      state.unreadMessages[userid] = (state.unreadMessages[userid] || 0) + 1
    },
    deleteMessageAction: (state, action) => {
      const userid = action.payload.userid

      if (state.messages[userid]) {
        state.messages[userid].messages = state.messages[userid].messages.filter(
          msg => msg.index !== action.payload.index)
      } else {
        state.messages[userid] = {...defaultMessagesObject}
      }
    },
    setUnreadMessagesAction: (state, action) => {
      state.unreadMessages = action.payload
    },
    readMessagesAction: (state, action) => {
      state.unreadMessages[action.payload] = null
    },
    changeFriendStatusAction: (state, action) => {
      state.friendList.forEach(friend => {
        if (friend.username === action.payload.username) {
          friend.connected = action.payload.status
          friend.formattedTime = action.payload.formattedTime
          friend.lastActiveDay = action.payload.dateStr
        }
      })
    },
    changeFriendAvatarAction: (state, action) => {
      for (let i = 0; i < state.friendList.length; i++) {
        if (state.friendList[i].username === action.payload.username) {
          state.friendList[i].avatar = action.payload.filename
          break
        }
      }
    },
    changeFriendBannerAction: (state, action) => {
      for (let i = 0; i < state.friendList.length; i++) {
        if (state.friendList[i].username === action.payload.username) {
          state.friendList[i].banner = action.payload.filename
          break
        }
      }
    },
    changeFriendAboutAction: (state, action) => {
      for (let i = 0; i < state.friendList.length; i++) {
        if (state.friendList[i].username === action.payload.username) {
          state.friendList[i].description = action.payload.about
          break
        }
      }
    },
    setConfirmationsAction: (state, action) => {
      state.confirmations = action.payload
    },
    addConfirmationAction: (state, action) => {
      state.confirmations.unshift(action.payload)
    },
    removeConfirmation: (state, action) => {
      state.confirmations = state.confirmations.filter(conf => conf.username !== action.payload)
    },
    clearChatsAction: () => initialState
  }
})

export const {
  setFriendListAction,
  addFriendAction,
  setFriendIndexAction,
  setMessagesAction,
  addMessageAction,
  deleteMessageAction,
  setUnreadMessagesAction,
  readMessagesAction,
  setConfirmationsAction,
  addConfirmationAction,
  removeConfirmation,
  clearChatsAction,
  changeFriendAboutAction,
  changeFriendBannerAction,
  changeFriendAvatarAction,
  changeFriendStatusAction
} = chatsSlice.actions

export default chatsSlice.reducer