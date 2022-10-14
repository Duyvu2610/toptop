import { show } from '../redux/appSlice'
import * as API from './api'
export const likeVideo = async (id, dispacth) => {
    try {
        const res = await API.post(`videos/${id}/like`)
        return res.data
    } catch (err) {
        dispacth(show())
    }
}
export const unLikeVideo = async (id, dispacth) => {
    try {
        const res = await API.post(`videos/${id}/unlike`)
        return res.data
    } catch (err) {
        dispacth(show())
    }
}
export const likeComment = async (id) => {
    try {
        const res = await API.post(`comments/${id}/like`)
        return res.data
    } catch (err) {
        console.log(err);
    }
}
export const unLikeComment = async (id) => {
    try {
        const res = await API.post(`comments/${id}/unlike`)
        return res.data
    } catch (err) {
        console.log(err);
    }
}

