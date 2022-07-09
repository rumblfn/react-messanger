import { addFriendAction, addMessageAction, changeFriendStatusAction, clearChatsAction, setFriendIndexAction, setFriendListAction, setMessagesAction } from "../chats/actions"

export const setFriendList = (payload) => {
    return async (dispatch) => {
        dispatch(setFriendListAction(payload))
    }
}

export const addFriend = (payload) => {
    return async (dispatch) => {
        dispatch(addFriendAction(payload))
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