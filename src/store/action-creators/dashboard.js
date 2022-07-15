import { FETCH_USER, FETCH_USER_ERROR } from "../dashboard"

export const setDashboard = () => {
    return async (dispatch) => {
        try {
            dispatch({type: FETCH_USER})

            
        } catch (e) {
            dispatch({
                type: FETCH_USER_ERROR,
                payload: 'Some errors'
            })
        }
    }
}