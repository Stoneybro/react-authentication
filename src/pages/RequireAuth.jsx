import {Outlet,useLocation,Navigate} from 'react-router-dom'
import { useAuth } from "../context/contextauth";
export default function RequireAuth(params) {
    const {auth}=useAuth()
    const Location=useLocation()
    
    return(
        auth?<Outlet />:<Navigate to='/Login' state={{from:Location}} replace />
    )

}