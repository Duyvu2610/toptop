import { createSlice } from "@reduxjs/toolkit";
const authSilce = createSlice({
    name: "auth",
    initialState: {
        login: {
            currentUser: null,
            isFetching: false,
            error: false
        },
        token: ""
    },
    reducers: {
        loginStart: (state) => {
            state.login.isFetching = true
        },
        loginSuccess: (state, action) => {
            state.login.isFetching = false
            state.login.currentUser = action.payload
            state.login.error = false
        },
        loginFailed: (state) => {
            state.login.error = true
            state.login.isFetching = false
            state.login.currentUser = null
        },
        logoutSucces: (state) => {
            state.login.currentUser = null
            state.token = ""
        },
        setToken: (state, action) => {
            state.token = action.payload
        },
        registerSucces: (state, action) => {
            state.login.isFetching = false
            state.login.currentUser = action.payload
            state.login.error = false
        }

    }
})
export const {
    loginStart,
    loginFailed,
    loginSuccess,
    logoutSucces,
    setToken,
    registerSucces
} = authSilce.actions
export default authSilce.reducer