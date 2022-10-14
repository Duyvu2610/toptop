import axios from "axios";
// const token = JSON.parse(JSON.parse(localStorage.getItem('persist:root')).auth).token
const API = axios.create({
    baseURL: "https://tiktok.fullstack.edu.vn/api/",
})
export const get = async (path, data,) => {
    const response = await API.get(path, data);
    return response.data
}
export const post = async (path, data) => {
    const response = await API.post(path, data);
    return response.data
}
export const del = async (path, data) => {
    const response = await API.delete(path, data);
    return response.data
}
export default API