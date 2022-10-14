import { createSlice } from "@reduxjs/toolkit";
const userSlice = createSlice({
    name: "user",
    initialState: {

    },
    reducers: {
        getfollowingListStart: (state) => {
            state.followingList.isFetching = true
        },
        getfollowingListSuccess: (state, action) => {
            state.followingList.isFetching = false
            state.followingList.allUsers = action.payload
            state.followingList.error = false
        },
        getfollowingListFailed: (state) => {
            state.followingList.error = true
            state.followingList.isFetching = false
        },
        getSuggestListStart: (state) => {
            state.suggestList.isFetching = true
        },
        getSuggestListSuccess: (state, action) => {
            state.suggestList.isFetching = false
            state.suggestList.allUsers = action.payload
            state.suggestList.error = false
        },
        getSuggestListFailed: (state) => {
            state.suggestList.error = true
            state.suggestList.isFetching = false
        },

    }
})
export const {
    getfollowingListStart,
    getfollowingListSuccess,
    getfollowingListFailed,
    getSuggestListStart,
    getSuggestListSuccess,
    getSuggestListFailed
} = userSlice.actions
export default userSlice.reducer