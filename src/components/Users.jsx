import React from "react"
import { useEffect } from "react"
import { useState } from "react"
import useAxiosprivate from "../Hooks/useAxiosPrivate"
import axios from "../api/axios"
import useRefresh from "../Hooks/useRefresh"
import { useNavigate,useLocation } from "react-router"
const USER_URL='/users/'

export default function Users(params) {
    const location=useLocation()
    const navigate=useNavigate()
    const refresh=useRefresh()

   
    const [users,setUsers]=useState()
    const axiosprivate=useAxiosprivate()
    useEffect(()=>{

        const controller=new AbortController()
        let ismounted =true
        async function  Fetchusers ()  {
            try {
                const response= await axiosprivate.get(USER_URL,{withCredentials:true},{signal:controller.signal})
                ismounted&&setUsers(response.data.results)
            } catch (error) {
                console.log(error);
                navigate('/login',{state:{from:location},replace:true})
            }

        }
        Fetchusers()

        return ()=>{
            ismounted=false
            controller.abort()
        }
        
    },[])
    return(
        <article>
            <h2>User lists</h2>
            {users?.length?(
                <ul>
                    {users.map((user,index)=>{
                        return(
                            <li key={index}>{user?.username}</li>
                        )
                    })}
                </ul>
            ):(<div>No users to display</div>)}
          
        </article>
    )
}