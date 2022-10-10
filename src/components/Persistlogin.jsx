import { useEffect,useState } from "react";
import { Outlet } from "react-router";
import { useAuth } from "../context/contextauth";
import useRefresh from "../Hooks/useRefresh";
export default function Persistlogin(params) {
    const {auth}=useAuth()
    const refresh=useRefresh()
    const [loading,setLoading]=useState(true)
    useEffect(()=>{
        async function Persist(params) {
            
            try {
                await refresh()
            } catch (error) {
                console.log(error);
            } finally{
                setLoading(false)
            }


        }
        !auth?.accessToken?Persist():setLoading(false)

    },[])

    // useEffect(()=>{
    //     console.log(`isloading:${loading}`);
    //     console.log(`at:${JSON.stringify(auth?.accessToken)}`);
    // },[loading])
    
    return loading?<p>loading...</p> :<Outlet />

}