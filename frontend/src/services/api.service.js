import axios from "axios";
import { BASE_URL } from './../constants/index';
console.log(BASE_URL);
const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/v1'
})

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${JSON.parse(token)}`
        }

        return config;
    },
    (error) => {
        return Promise.reject(error)
    }
)

export default api