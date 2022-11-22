import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "https://blog-app-mg.herokuapp.com/api"
})