import axios from "axios";
const URL:string='http://localhost:9000';

export default axios.create({
    baseURL:URL,
    withCredentials:true
})

export const axiosPrivate = axios.create({
    baseURL:URL,
    withCredentials:true
})