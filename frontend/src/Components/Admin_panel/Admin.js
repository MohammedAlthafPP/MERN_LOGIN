import React, { Fragment,useEffect } from 'react'
import { useCookies } from 'react-cookie';
import { useNavigate } from "react-router-dom";
import Nav from './Admin_Navbar'
import View_Users from './View_Users'

function Admin() {
  const navigate = useNavigate() ;
  const [cookies,setCookie,removeCookie]= useCookies([])
  useEffect(() => {

    const verifyUser = async()=>{
      if(cookies.admin) {
       navigate('/admin')
      }else {
        navigate('/')
      }
    }
      verifyUser()
}, []);
  return (
    <Fragment>
        <Nav/>
        <View_Users/>
    </Fragment>
  )
}

export default Admin