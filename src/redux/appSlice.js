import { createSlice } from "@reduxjs/toolkit";
const appSlice = createSlice({
    name: 'app',
    initialState: {
        isShowModalLogin: false,
        isShowInput: false,
        inputValue: ""
    },
    reducers: {
        dontShow: (state) => {
            state.isShowModalLogin = false
        },
        show: (state) => {
            state.isShowModalLogin = true
        },
        showInput: (state) => {
            state.isShowInput = true
        },
        dontShowInput: (state) => {
            state.isShowInput = false
        },
        setInputValue: (state, action) => {
            state.inputValue = action.payload
        }
    }
})
export const {
    dontShow,
    show,
    showInput,
    dontShowInput,
    setInputValue
} = appSlice.actions
export default appSlice.reducer