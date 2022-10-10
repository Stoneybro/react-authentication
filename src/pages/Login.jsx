import { useEffect,useState,useRef } from "react"
import { useAuth } from "../context/contextauth"
import axios from "../api/axios"
const Login_url='/auth/login/'
import { Link,useNavigate,useLocation } from "react-router-dom"
export default function Login(params) {
    const navigate=useNavigate()
    const Location=useLocation()
    const from=Location.state?.from?.pathname || '/'

    const userRef=useRef()
    const errRef=useRef()
    const [user,setUser]=useState('')
    const [pwd,setPwd]=useState('')
    const [errMsg,setErrMsg]=useState('')
    const [success,setSuccess]=useState(false)
    const {auth,setAuth}=useAuth()


    useEffect(()=>{
       userRef.current.focus()
    },[])
    useEffect(()=>{
        setErrMsg('')
    },[user,pwd])
    async function handleSubmit(e) {
        e.preventDefault()
        try {
            const response=await axios.post(Login_url,JSON.stringify({username:user,password:pwd}),{headers:{'content-Type':'application/json'} })
            setSuccess(true)

            const accessToken = response?.data?.access_token;
            const refreshToken=response?.data?.refresh_token
            const roles = response?.data?.user?.role;
            setAuth({user,accessToken,roles})
            navigate(from, { replace: true });
        } catch (error) {
            if (!error?.response) {
                
                setErrMsg('No server response')
            }else if(error.response?.status===400){
                setErrMsg('wrong username or password')
            }else if(error.response?.status===401){
                setErrMsg('Unauthorized')
            }else{
                setErrMsg('login failed')
            }
        }
    }

    return(

    <section>
            <p aria-live="assertive" className={errMsg?'errmsg':'offscreen'}>{errMsg}</p>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
            <label htmlFor="username">
                username:
            </label>
            <input type="text"
            ref={userRef}
            aria-describedby="uidnote"
            id="username"
            autoComplete="off"
            required
            onChange={e=>setUser(e.target.value)}
            value={user}
            />
             <label htmlFor="password">
                password:
            </label>
            <input type="password"
            aria-describedby="password"
            id="password"
            autoComplete="off"
            required
            onChange={e=>setPwd(e.target.value)}
            value={pwd}
            />
            <button>Login</button>
            </form>
            don't have an account?<br/>
            <Link to='/register'>sign up</Link>
        </section>
    )
}