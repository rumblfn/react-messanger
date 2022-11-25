import {
    addConfirmationAction,
    addFriendAction,
    addMessageAction,
    changeFriendAboutAction,
    changeFriendAvatarAction,
    changeFriendBannerAction,
    changeFriendStatusAction,
    clearChatsAction,
    deleteMessageAction,
    readMessagesAction,
    removeConfirmation,
    setConfirmationsAction,
    setFriendIndexAction,
    setFriendListAction,
    setMessagesAction,
    setUnreadMessagesAction
} from "../chats"
import {handleTimestamp} from "../common/handleTimestamp";
import {useSelector} from "react-redux";
import {getFriendList} from "../chats/selectors";

export const setFriendList = (payload) => {
    return async (dispatch) => {
        const friendList = []

        for (let friend of payload) {
            const {formattedTime, dateStr} = handleTimestamp(+friend.lastActiveTime)

            friendList.push({
                ...friend,
                formattedTime,
                lastActiveDay: dateStr
            })
        }

        dispatch(setFriendListAction(friendList))
    }
}

export const addFriend = (payload) => {
    return async (dispatch) => {
        dispatch(addFriendAction(payload))
        dispatch(removeConfirmation(payload.username))
    }
}

const handleMessage = (date, message, messages) => {
    let hours = date.getHours();
    let minutes = "0" + date.getMinutes();

    let formattedTime = hours + ":" + minutes.substr(-2);

    message.formattedTime = formattedTime

    if (message.type.startsWith('REPLY')) {
        let reply = message.type.split(':')
        message.type = reply.shift()
        message.reply = reply
        if (message.messageToReply) {
            message.reply = message.messageToReply
        } else {
            const messageindex = parseInt(reply[0])
            if (messageindex || messageindex === 0) {
                message.reply = messages.find(msg => msg.index === messageindex)
            }
        }
    }

    if (message.type !== 'MESSAGE' && message.type !== 'REPLY') {
        const splitContent = message.content.split(' ')

        if (splitContent.length >= 2) {
            message.src = splitContent[0]
            message.fileName = splitContent.slice(1).join(' ')
        }
    }
}

export const setMessages = (payload) => {
    return async (dispatch) => {
        const messages = []
        let lastDay = new Date(0)

        for (let message of payload.messages) {
            
            if (!message) continue

            const date = new Date(+message.timestamp)
            let today = new Date(date.getFullYear(), date.getMonth(), date.getDate())

            if (today > lastDay) {
                lastDay = today

                let day = "0" + today.getDate();
                let month = "0" + (today.getMonth() + 1);
                let year = today.getFullYear();

                const dateStr = `${day.substr(-2)}.${month.substr(-2)}.${year}`;

                messages.unshift({
                    type: 'time',
                    time: dateStr
                })
            }

            handleMessage(date, message, messages)
            messages.unshift(message)
        }
        dispatch(setMessagesAction({messages, userid: payload.userid, lastindex: payload.lastindex}))
    }
}

export const addMessage = (payload) => {
    return async (dispatch) => {
        const message = payload.message

        const date = new Date(+message.timestamp)
        handleMessage(date, message)
        dispatch(addMessageAction({message, userid: payload.userid}))
    }
}

export const deleteMessage = (payload) => {
    return async dispatch => {
        try {
            dispatch(deleteMessageAction(payload))
        } catch {
            throw Error("some errors in changeFriendStatus")
        }
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

export const changeFriendAvatar = (payload) => {
    return async dispatch => {
        try {
            dispatch(changeFriendAvatarAction(payload))
        } catch {
            throw Error("some errors in changeFriendAvatar")
        }
    }
}

export const changeFriendBanner = (payload) => {
    return async dispatch => {
        try {
            dispatch(changeFriendBannerAction(payload))
        } catch {
            throw Error("some errors in changeFriendAvatar")
        }
    }
}

export const changeFriendAbout = (payload) => {
    return async dispatch => {
        try {
            dispatch(changeFriendAboutAction(payload))
        } catch {
            throw Error("some errors in changeFriendAvatar")
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