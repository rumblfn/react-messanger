export const FETCH_USER = 'FETCH_USER'
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS'
export const FETCH_USER_ERROR = 'FETCH_USER_ERROR'

export const fetchUserAction = () => ({
    type: FETCH_USER
})

export const fetchUserSuccessAction = (payload) => ({
    type: FETCH_USER_SUCCESS, payload
})

export const fetchUserErrorAction = (payload) => ({
    type: FETCH_USER_ERROR, payload
})