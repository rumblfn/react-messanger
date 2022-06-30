import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from '../../routes/Auth/Login'
import SignUp from '../../routes/Auth/SignUp'

export const Views = () => {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<SignUp />} />
            <Route path="*" element={<Login />} />
        </Routes>
    )
}

export default Views