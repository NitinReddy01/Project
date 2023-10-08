import { useEffect } from "react";
import { useAuth } from "./useAuth";
import useRefreshToken from "./useRefreshToken"
import { axiosPrivate } from "../Api/axios";


const useAxiosPrivate = ()=>{
    const refresh = useRefreshToken();
    const {auth} = useAuth();
    useEffect(()=>{
        const requestInterceptor = axiosPrivate.interceptors.request.use((config)=>{
            if(!config.headers['Authorization']){
                config.headers['Authorization'] = `Bearer ${auth?.accessToken}`;
            }
            return config;
        },(err)=>Promise.reject(err));
        const responseInterceptor = axiosPrivate.interceptors.response.use((response)=>{
            return response;
        },async (err)=>{
            const prevReq=err.config;
            if(err?.response?.status===403 && !prevReq.sent){
                prevReq.sent=true;
                const accessToken=await refresh();
                prevReq.headers['Authorization']=`Bearer ${accessToken}`;
                return axiosPrivate(prevReq);
            }
            return Promise.reject(err);
        })
        return ()=>{
            axiosPrivate.interceptors.request.eject(requestInterceptor);
            axiosPrivate.interceptors.response.eject(responseInterceptor);
        }
    },[auth,refresh]);
    return axiosPrivate;
}
export default useAxiosPrivate;