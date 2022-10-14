import * as API from './api'
export const getCmtList = async (id) => {
    try {
        const res = await API.get(`videos/${id}/comments`)
        return res.data
    } catch (err) {
        console.log(err);
    }
}
export const createCmt = async (id, text) => {
    try {
        const res = await API.post(`videos/${id}/comments`, {
            comment: text
        })
        return res.data
    } catch (err) {
        console.log(err);
    }
}
export const deleteCmt = async (id) => {
    try {
        const res = await API.del(`comments/${id}`)
        return res.data
    } catch (err) {
        console.log(err);
    }
}
