export const SET_FRIEND_LIST = 'SET_FRIEND_LIST'
export const SET_MESSAGES = 'SET_MESSAGES'
export const ADD_MESSAGE = 'ADD_MESSAGE'
export const CHANGE_FRIENDS_STATUS = 'CHANGE_FRIENDS_STATUS'
export const SET_FRIEND_INDEX = 'SET_FRIEND_INDEX'
export const CLEAR_CHATS = 'CLEAR_CHATS'
export const ADD_FRIEND = 'ADD_FRIEND'
export const SET_CONFIRMATIONS = 'SET_CONFIRMATIONS'
export const ADD_CONFIRMATION = 'ADD_CONFIRMATION'
export const REMOVE_CONFIRMATION = 'REMOVE_CONFIRMATION'

export const setFriendListAction = (payload) => ({
    type: SET_FRIEND_LIST, payload
})

export const setMessagesAction = (payload) => ({
    type: SET_MESSAGES, payload
})

export const addMessageAction = (payload) => ({
    type: ADD_MESSAGE, payload
})

export const changeFriendStatusAction = (payload) => ({
    type: CHANGE_FRIENDS_STATUS, payload
})

export const setFriendIndexAction = (payload) => ({
    type: SET_FRIEND_INDEX, payload
})

export const clearChatsAction = () => ({
    type: CLEAR_CHATS
})

export const addFriendAction = (payload) => ({
    type: ADD_FRIEND, payload
})

export const setConfirmationsAction = (payload) => ({
    type: SET_CONFIRMATIONS, payload
})

export const addConfirmationAction = (payload) => ({
    type: ADD_CONFIRMATION, payload
})

export const removeConfirmation = (payload) => ({
    type: REMOVE_CONFIRMATION, payload
})