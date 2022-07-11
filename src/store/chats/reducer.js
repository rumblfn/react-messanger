import { ADD_CONFIRMATION, ADD_FRIEND, ADD_MESSAGE, CHANGE_FRIENDS_STATUS, CLEAR_CHATS, READ_CHANNEL_MESSAGES, REMOVE_CONFIRMATION, SET_CONFIRMATIONS, SET_FRIEND_INDEX, SET_FRIEND_LIST, SET_MESSAGES, SET_UNREAD_MESSAGES } from "./actions"

const initialState = {
    friendList: [],
    messages: [],
    friendIndex: -1,
    confirmations: [],
    unreadMessages: {}
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
                messages: [action.payload, ...state.messages],
                unreadMessages: {
                    ...state.unreadMessages,
                    [action.payload.from]: (state.unreadMessages[action.payload.from] || 0) + 1
                }
            }
        case SET_UNREAD_MESSAGES:
            return {
                ...state,
                unreadMessages: {
                    ...action.payload
                }
            }
        case READ_CHANNEL_MESSAGES:
            return {
                ...state,
                unreadMessages: {
                    ...state.unreadMessages,
                    [action.payload]: null
                }
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
        case SET_CONFIRMATIONS:
            return {
                ...state,
                confirmations: action.payload
            }
        case ADD_CONFIRMATION:
            return {
                ...state,
                confirmations: [action.payload, ...state.confirmations]
            }
        case REMOVE_CONFIRMATION:
            const confirmations = state.confirmations.filter((confirmation) => {
                return confirmation.username !== action.payload
            });
            return {
                ...state,
                confirmations
            }
        case CLEAR_CHATS:
            return initialState
        default:
            return state
    }
}