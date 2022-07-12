import React,{Fragment, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import axios  from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import { useCookies } from 'react-cookie';
import UserNavbar from './UserNavbar';
import Cards from './Cards';

 
function Secrete() {
  
    const navigate = useNavigate()
    const [cookies,setCookie,removeCookie]= useCookies([])
    useEffect (()=>{

      const verifyUser = async()=>{
       if(!cookies.user) {
        navigate('/')
       }else {
        const {data} = await axios.post("http://localhost:4000/",{},{withCredentials:true})
       
       if(!data.status){
        removeCookie("user")
        navigate('/')
       } else toast(`HI $(data.user)`,{theme:"dark"})
      }}
      verifyUser()
    },[cookies,navigate,removeCookie])
  
  
  



    const logOut= ()=>{
      removeCookie("user")
        navigate("/")
    }
  return (
    <Fragment>
      <UserNavbar/>
      <Cards/>
      <ToastContainer/>
      
      {/* <div className='private'>
      <h1>Homepage</h1>
      <button onClick={logOut}>LOG OUT</button> */}
        {/* </div> */}

    </Fragment>
    
  )
}

export default Secrete


