import * as API from './api'
export const getVideoList = async (type, page) => {
    try {
        const res = await API.get('videos', {
            params: {
                type,
                page
            }
        })
        return res.data
    } catch (err) {
        console.log(err);
    }
}
export const getVideo = async (id) => {
    try {
        const res = await API.get(`videos/${id}`)
        return res.data
    } catch (err) {
        console.log(err);
    }
}
// export const postVideo = async (id, token) => {
//     try {
//         const res = await API.post(`videos/${id}`,{
//             header: {
//                 "Authorization": `Bearer ${token}`
//             }
//         })
//         return res.data
//     } catch (err) {
//         console.log(err);
//     }
// }
