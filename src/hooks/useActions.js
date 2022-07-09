import { bindActionCreators } from "@reduxjs/toolkit"
import { useDispatch } from "react-redux"
import * as ActionCreators from '../store/action-creators/index'

export const useActions = () => {
    const dispatch = useDispatch()
    return bindActionCreators(ActionCreators, dispatch)
}