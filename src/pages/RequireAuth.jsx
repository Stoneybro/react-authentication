import {Outlet,useLocation,Navigate} from 'react-router-dom'
import { useAuth } from "../context/contextauth";
export default function RequireAuth({allowedRoles}) {
    const {auth}=useAuth()
    const Location=useLocation()
    return(
        auth?.roles?.find(role=>allowedRoles?.includes(role))
        ?<Outlet />:auth?.user ?<Navigate to='/unauthorized' state={{from:Location}} replace  />
        :<Navigate to='/login' state={{from:Location}} replace />
    )
}