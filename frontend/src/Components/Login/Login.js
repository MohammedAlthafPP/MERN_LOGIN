import React,{useState,useEffect} from "react";
import { Link,useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useCookies } from 'react-cookie';
import axios from "axios";
import "./Login.css"

function Login() {
  const navigate = useNavigate() ;
  const [cookies,setCookie,removeCookie]= useCookies([])
  useEffect(() => {

    const verifyUser = async()=>{
      if(cookies.user) {
       navigate('/homepage')
      }else {
        navigate('/')
      }
    }
      verifyUser()
}, []);
  

  const [values, setValues] = useState({
   
    email:"",
    password:"",
  });

  const generateError = (err) =>toast.error(err,{
    position : "top-center"
  })

  const handleSubmit =async (e)=>{
    e.preventDefault();
    try {
      const {data} = await axios.post("http://localhost:4000/login",{
        ...values
      },{
        withCredentials:true,
      })
      console.log(data,"============login data");
      if (data) {

        if (data.errors) {

          const { email, password ,name} = data.errors;
          if (email) generateError(email);
          else if (password) generateError(password)
          else if (name) generateError(name)

        } else {

          if (data.value) {

            navigate("/admin");
          } else {
            navigate("/homepage");
          }
         
        }



      }


    } catch (error) {
      console.log(error,"==========register error");
      
    }
  };



  return (
    <div className="CardBody">
      <div className="container innerbody">
        <h2>Login Account</h2>
        <form className="form" action="" onSubmit={(e)=>handleSubmit(e)}>
         
          <div>
            <label htmlFor="email">Email</label>
            <input  className="input" type="email" name="email" placeholder="Enter your Email" onChange={(e)=>setValues({...values,[e.target.name]: e.target.value})} />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
             className="input"
              type="password"
              name="password"
              placeholder="Enter your Password" onChange={(e)=>setValues({...values,[e.target.name]: e.target.value})} />
          </div>

          <button className="button" type="submit">Sublimt</button>
          <span className="Login-span">
            New User ? <Link to="/register">Register</Link>{" "}
          </span>
        </form>
        <ToastContainer />
      </div>
    </div>
    
  );
}

export default Login;
