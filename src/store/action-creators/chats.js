import {
    addConfirmationAction,
    addFriendAction,
    addMessageAction,
    changeFriendStatusAction,
    clearChatsAction,
    readMessagesAction,
    removeConfirmation,
    setConfirmationsAction,
    setFriendIndexAction,
    setFriendListAction,
    setMessagesAction,
    setUnreadMessagesAction
} from "../chats/actions"

export const setFriendList = (payload) => {
    return async (dispatch) => {
        dispatch(setFriendListAction(payload))
    }
}

export const addFriend = (payload) => {
    return async (dispatch) => {
        dispatch(addFriendAction(payload))
        dispatch(removeConfirmation(payload.username))
    }
}

export const setMessages = (payload) => {
    return async (dispatch) => {
        dispatch(setMessagesAction(payload))
    }
}

export const addMessage = (payload) => {
    return async (dispatch) => {
        dispatch(addMessageAction(payload))
    }
}

export const changeFriendStatus = (payload) => {
    return async (dispatch) => {
        try {
            dispatch(changeFriendStatusAction(payload))
        } catch {
            throw Error("some errors in changeFriendStatus")
        }
    }
}

export const setFriendIndex = (payload) => {
    return async (dispatch) => {
        dispatch(setFriendIndexAction(payload))
    }
}

export const clearChats = () => {
    return async (dispatch) => {
        dispatch(clearChatsAction())
    }
}

export const setConfirmations = (payload) => {
    return async (dispatch) => {
        dispatch(setConfirmationsAction(payload))
    }
}

export const addConfirmation = (payload) => {
    return async (dispatch) => {
        dispatch(addConfirmationAction(payload))
    }
}

export const removeConfirmationAfterDecline = (payload) => {
    return async (dispatch) => {
        dispatch(removeConfirmation(payload))
    }
}


export const readMessages = (payload) => {
    return async (dispatch) => {
        dispatch(readMessagesAction(payload))
    }
}

export const setUnreadMessages = (payload) => {
    return async (dispatch) => {
        dispatch(setUnreadMessagesAction(payload))
    }
}