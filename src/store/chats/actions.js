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
export const READ_CHANNEL_MESSAGES = 'READ_CHANNEL_MESSAGES'
export const SET_UNREAD_MESSAGES = 'SET_UNREAD_MESSAGES'
export const CHANGE_FRIENDS_AVATAR = 'CHANGE_FRIENDS_AVATAR'
export const CHANGE_FRIENDS_BANNER = 'CHANGE_FRIENDS_BANNER'
export const CHANGE_FRIENDS_ABOUT = 'CHANGE_FRIENDS_ABOUT'
export const DELETE_MESSAGE = 'DELETE_MESSAGE'

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

export const changeFriendAvatarAction = (payload) => ({
    type: CHANGE_FRIENDS_AVATAR, payload
})

export const changeFriendBannerAction = (payload) => ({
    type: CHANGE_FRIENDS_BANNER, payload
})

export const changeFriendAboutAction = (payload) => ({
    type: CHANGE_FRIENDS_ABOUT, payload
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

export const readMessagesAction = (payload) => ({
    type: READ_CHANNEL_MESSAGES, payload
})

export const setUnreadMessagesAction = (payload) => ({
    type: SET_UNREAD_MESSAGES, payload
})

export const deleteMessageAction = payload => ({
    type: DELETE_MESSAGE, payload
})