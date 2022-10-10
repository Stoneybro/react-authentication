import axios from "../api/axios";
import { useAuth } from "../context/contextauth";
export default function Logout(params) {
    const {setAuth}=useAuth()
   return async ()=>{
        setAuth({})
        try {
            const response=axios.post('/auth/logout/' ,{withCredientials:true})
        } catch (error) {
            console.log(error);
        }
    }
}