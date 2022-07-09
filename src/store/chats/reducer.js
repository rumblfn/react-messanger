import { ADD_FRIEND, ADD_MESSAGE, CHANGE_FRIENDS_STATUS, CLEAR_CHATS, SET_FRIEND_INDEX, SET_FRIEND_LIST, SET_MESSAGES } from "./actions"

const initialState = {
    friendList: [],
    messages: [],
    friendIndex: 0
}

export const chatsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_FRIEND_LIST:
            return {
                ...state,
                friendList: action.payload
            }
        case ADD_FRIEND:
            return {
                ...state,
                friendList: [action.payload, ...state.friendList]
            }
        case SET_FRIEND_INDEX:
            return {
                ...state,
                friendIndex: action.payload
            }
        case SET_MESSAGES:
            return {
                ...state,
                messages: action.payload
            }
        case ADD_MESSAGE:
            return {
                ...state,
                messages: [action.payload, ...state.messages]
            }
        case CHANGE_FRIENDS_STATUS:
            const friendList = JSON.parse(JSON.stringify(state.friendList)).map((friend) => {
                if (friend.username === action.payload.username) {
                    friend.connected = action.payload.status;
                }
                return friend;
              });
            return {
                ...state,
                friendList
            }
        case CLEAR_CHATS:
            return initialState
        default:
            return state
    }
}