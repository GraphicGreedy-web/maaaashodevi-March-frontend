import axios from "axios"
console.log("url in api: ", import.meta.env.VITE_API)
export const api = axios.create({
    baseURL: import.meta.env.VITE_API,
    withCredentials: true
})
export const getAllTours = () => api.get("/tours")