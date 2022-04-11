import axios from "axios";
import baseUrl from "../config/env";

let headers = {
    api_secret: process.env.REACT_APP_API_SECRET || "",
    api_key: process.env.REACT_APP_API_KEY || "",
}

const axiosInstance = axios.create({
    baseURL: baseUrl(),
    headers
})

axiosInstance.interceptors.request.use(
    async(config) => {
        const token = localStorage.getItem("token")

        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`
        }

        return config
    }, (error) => {
        console.log("axiosInstance",error)
        return Promise.reject(error);
    }
)

export default axiosInstance