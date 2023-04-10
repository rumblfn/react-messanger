export const getFriendList = (state) => state.chats.friendList || []
export const getMessages = (state) => state.chats.messages || {}
export const getFriendIndex = (state) => state.chats.friendIndex
export const getConfirmations = (state) => state.chats.confirmations || []
export const getUnreadMessages = (state) => state.chats.unreadMessages || {}