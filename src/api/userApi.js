import * as API from './api'
export const suggest = async (page, per_page) => {
    try {
        const res = await API.get('users/suggested', {
            params: {
                page,
                per_page
            }
        })
        return res.data
    } catch (err) {
        console.log(err);
    }
}
export const getUser = async (nickname) => {
    try {
        const res = await API.get(`users/@${nickname}`, {

        })
        return res.data
    } catch (err) {
        console.log(err);
    }
}
