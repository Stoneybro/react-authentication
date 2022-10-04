import React from "react";
import { useEffect,useState,useRef } from "react"
import {FaCheck,FaTimes,FaInfoCircle} from 'react-icons/fa'
import axios from "../api/axios";
const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL='/signup/'
export default function Register(params) {
    const userRef=useRef()
    const errRef=useRef()


    const [user,setUser]=useState('')
    const [validUser,setValidUser]=useState(false)
    const [userFocus,setUserFocus]=useState(false)

    const [pwd,setPwd]=useState('')
    const [validPwd,setValidPwd]=useState(false)
    const [pwdFocus,setPwdFocus]=useState(false)

    const [matchPwd,setMatchPwd]=useState('')
    const [validMatch,setValidMatch]=useState(false)
    const [matchFocus,setMatchFocus]=useState(false)

    useEffect(()=>{
        userRef.current.focus()
    },[])
    useEffect(()=>{
        const result=USER_REGEX.test(user)
        setValidUser(result)
    },[user])

    useEffect(()=>{
        const result=PWD_REGEX.test(pwd)
        setValidPwd(result)
        const confirm=pwd===matchPwd
        setValidMatch(confirm)
    },[pwd,matchPwd])
    useEffect(()=>{
        setErrMsg('')
    },[user,pwd,matchPwd])

    const [success,setSuccess]=useState(false)
    const [errMsg,setErrMsg]=useState('')

    async function handleSubmit(e) {
        e.preventDefault()
        const v1=USER_REGEX.test(user)
        const v2=PWD_REGEX.test(pwd)
        if (!v1||!v2) {
            setErrMsg('invalid access')
            return
        }
        try {
            const response=await axios.post(REGISTER_URL,JSON.stringify({username:user,password1:pwd,password2:matchPwd})
            ,{headers:{'content-Type':'application/json'},withCredentials:true
               }
            );
            console.log(response);
            setSuccess(true)
        } catch (error) {
            if (!error?.response) {
                setErrMsg('No server response')
            }else if(error.response?.status===409){
                setErrMsg('Username taken')
            }else{
                setErrMsg('Registration failed')
            }
        }
    }
    return(
        <>
        {success?   <section>
                    <h1>Success!</h1>
                    <p>
                        <a href="#">Sign In</a>
                    </p>
                </section>:
          <section>
          <p aria-live="assertive" className={errMsg?'errmsg':'offscreen'} >{errMsg}</p>
          <h1>Register</h1>
          <form onSubmit={handleSubmit}>
              <label htmlFor="username">
                  username:
              </label>
              <span className={validUser?'valid':'hide'}><FaCheck /></span>
              <span className={user&&!validUser?'invalid':'hide'}><FaTimes /></span>
              <input type="text"
              aria-describedby="uidnote"
              aria-invalid={validUser?'false':'true'}
              ref={userRef}
              id='username'
              autoComplete="off"
              onChange={(e)=>setUser(e.target.value)}
              value={user}
              required
              onFocus={()=>setUserFocus(true)}
              onBlur={()=>setUserFocus(false)} 
              />
              <p className={user&&!validUser&&userFocus? 'instructions':'offscreen'}>
                  <FaInfoCircle />4 to 24 characters.<br />
                          Must begin with a letter.<br />
                          Letters, numbers, underscores, hyphens allowed.
              </p>
              <label htmlFor="password">
                  password:
              </label>
              <span className={validPwd?'valid':'hide'}><FaCheck /></span>
              <span className={pwd&&!validPwd?'invalid':'hide'}><FaTimes /></span>
              <input type="password"
              aria-describedby="password"
              aria-invalid={validPwd?'false':'true'}
          
              id='password'

              onChange={(e)=>setPwd(e.target.value)}
              value={pwd}
              required
              onFocus={()=>setPwdFocus(true)}
              onBlur={()=>setPwdFocus(false)} 
              />
              <p className={pwd&&!validPwd&&pwdFocus? 'instructions':'offscreen'}>
                  <FaInfoCircle />   8 to 24 characters.<br />
                          Must include uppercase and lowercase letters, a number and a special character.<br />
                          Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
              </p>
              <label htmlFor="confirm-password">
                  confirm password:
              </label>
              <span className={validMatch&&matchPwd?'valid':'hide'}><FaCheck /></span>
              <span className={matchPwd&&!validMatch?'invalid':'hide'}><FaTimes /></span>
              <input type="password"
              aria-describedby="confirm password"
              aria-invalid={validMatch?'false':'true'}
          
              id='confirm-password'

              onChange={(e)=>setMatchPwd(e.target.value)}
              value={matchPwd}
              required
              onFocus={()=>setMatchFocus(true)}
              onBlur={()=>setMatchFocus(false)} 
              />
              <p className={matchPwd&&!validMatch&&matchFocus? 'instructions':'offscreen'}>
                  <FaInfoCircle />Must match the first password input field.
              </p>

              <button disabled={!validMatch||!validPwd||!validUser?true:false}>Create account</button>
          </form>

      </section>

        }
        </>
      
    )
    
}
