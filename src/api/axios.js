import axios from "axios";
import { json } from "react-router";

export default axios.create({
    baseURL:'http://127.0.0.1:8000/',
    withCredentials:true
});

export const axiosPrivate=axios.create({
    baseURL:'http://127.0.0.1:8000/',
    headers:{'content-Type':'application/json'},
    withCredentials:true
    
})