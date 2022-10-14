import * as API from './api'
export const search = async (q, type = 'less') => {
    try {
        const res = await API.get('users/search', {
            params: {
                q,
                type
            }
        })
        return res.data
    } catch (err) {
        console.log(err);
    }
}