
import * as API from './api'
export const getFollowing = async (page) => {
    try {
        const res = await API.get('me/followings', { params: { page, } })
        return res.data
    } catch (err) {
        console.log(err);
    }
}
export const followUser = async (id) => {
    try {
        const res = await API.post(`users/${id}/follow`)
        return res.data
    } catch (err) {
        console.log(err);
    }
}
export const unFollowUser = async (id) => {
    try {
        const res = await API.post(`users/${id}/unfollow`)
        return res.data
    } catch (err) {
        console.log(err);
    }
}
