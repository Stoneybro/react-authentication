import { useEffect } from "react";
import { Link } from "react-router-dom"
import axios from "../api/axios"
import { useAuth } from "../context/contextauth";
const Lounge = () => {

    const {setAuth,auth}=useAuth()
useEffect(()=>{
    async function test() {
           
        try {
          //  const response=await axios.get('/refresh/',{withCredentials:true})
           const response= await Promise.all([axios.get('/refresh/',{withCredentials:true}),axios.get('/user-role/',{withCredentials:true})])
            console.log(response);
           
        } catch (error) {
            console.log(error);
        }


  
}
test()
},[])
  
    return (
        <section>
            <h1>The Lounge</h1>
            <br />
            <p>Admins and Editors can hang out here.</p>
            <div className="flexGrow">
                <Link to="/">Home</Link>
            </div>
        </section>
    )
}

export default Lounge
