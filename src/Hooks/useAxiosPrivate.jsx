import axios from "axios";
import { useEffect } from "react";
import { axiosPrivate } from "../api/axios";
import { useAuth } from "../context/contextauth";
import useRefresh from "./useRefresh";
export default function useAxiosprivate(params) {
    const {auth}=useAuth()
    const refresh=useRefresh()

    useEffect(()=>{
       
    const request=axiosPrivate.interceptors.request.use(
        config=>{
            if (!config.headers['Authorization']) {
                config.headers['Authorization']=`Bearer ${auth?.accessToken}`
            }
            return config
        },error=>Promise.reject(error)
    )
    const response=axiosPrivate.interceptors.response.use(
        response=>response,
        async(error)=>{
            const prevRequest=error?.config
            if (error?.response?.status===401 && !prevRequest.sent) {
                prevRequest.sent=true
                let newaccesstoken=refresh()
                prevRequest.headers['Authorization']=`Bearer ${newaccesstoken}`
                return axiosPrivate(prevRequest)
            }
            return Promise.reject(error)
        }
    )
       
    return ()=>{
        axiosPrivate.interceptors.request.eject(request)
        axiosPrivate.interceptors.response.eject(response)
    }
    },[auth,refresh])
    
    return axiosPrivate
}