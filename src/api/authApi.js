import { dontShow } from '../redux/appSlice';
import { loginFailed, loginStart, loginSuccess, logoutSucces, registerSucces, setToken } from '../redux/authSilce';
import * as API from './api'
export const getCurrentUser = async () => {
    try {
        const res = await API.get('auth/me')
        return res.data
    } catch (err) {
        console.log(err);
    }
}
export const login = async (user, dispacth) => {
    dispacth(loginStart())
    try {
        const res = await API.post('auth/login', user)
        dispacth(loginSuccess(res))
        dispacth(dontShow())
        dispacth(setToken(res.meta.token))
        return res
    } catch (error) {
        dispacth(loginFailed())
        alert("tk mk sai")
    }
}
export const logout = async (dispacth) => {
    try {
        await API.post('auth/logout')
        dispacth(logoutSucces())
    } catch (err) {
        console.log(err);
    }
}
export const register = async (dispacth, user) => {
    try {
        const res = await API.post('auth/register', user)
        dispacth(registerSucces(res))
        dispacth(dontShow())
        dispacth(setToken(res.meta.token))
    } catch (err) {
        console.log(err);
        alert("Tài khoản đã tồn tại")
    }
}
