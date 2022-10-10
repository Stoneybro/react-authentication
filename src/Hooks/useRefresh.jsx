    import axios from "../api/axios"
    
    import { useAuth } from "../context/contextauth";
    const REFRESH_URL='/refresh/'
  
export default function useRefresh(params) {
 const {setAuth,auth}=useAuth()

    async function Refresh() {
            //const response=await axios.get('/refresh/',{withCredentials:true})
            const response= await Promise.all([axios.get('/refresh/',{withCredentials:true}),axios.get('/user-role/',{withCredentials:true})])

            setAuth(prev=>{
               return {...prev,
                roles:response[1].data.role,         
                accessToken:response[0].data.access}
            })

            return response.data.access
      
    }
    return Refresh
}