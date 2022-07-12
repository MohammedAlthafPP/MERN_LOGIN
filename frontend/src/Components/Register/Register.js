import React,{useState,useEffect} from "react";
import { Link,useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios"
import { useForm } from 'react-hook-form'
import { useCookies } from 'react-cookie';
import './Register.css'


function Register() {
  const naviagte = useNavigate() ;
  const [cookies,setCookie,removeCookie]= useCookies([])
  useEffect(() => {

    const verifyUser = async()=>{
      if(cookies.user) {
        naviagte('/homepage')
      }else {
        naviagte('/register')
      }
    }
      verifyUser()
}, []);






  const { register, handleSubmit, formState: { errors } } = useForm();


  const [values, setValues] = useState({
    name:"",
    email:"",
    password:"",
  });

  const generateError = (err) =>toast.error(err,{
    position : "top-center"
  })

  const onSubmit =async (values)=>{
   
   
    try {
      const {data} = await axios.post("http://localhost:4000/register",{
        ...values
      },{
        withCredentials:true,
      })
      
      if (data) {
       

        if (data.errors) {

          const { email, password ,name} = data.errors;
          if (email) generateError(email);
          else if (password) generateError(password)
          else if (name) generateError(name)

        } else {

          if (data.value) {

            naviagte("/admin");
          } else {
            naviagte("/homepage");
          }
         
        }



      }


    } catch (error) {
      console.log(error,"==========register error");
      
    }
  };



  return (
 <section className="register">



  
    <div className="CardBody">
      <div className="container innerbody">
        <h2>Register Account</h2>
        <form className="form" action="" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="name">Name</label>
            <input  className="input" type="text" name="name" placeholder="Enter your Name" 
            
           onChange={(e)=>setValues({...values,[e.target.name]: e.target.value})} 
            
            {...register("name", {
              required: "Name is required",
               maxLength: {
                value: 10,
                message: "Name cannot exceed more than 10 characters"
              },
              pattern: { 
                value: /^[a-zA-Z ]*$/, 
                message: "Sorry,only alphabets are allowed" 
               }


            })}

            />

            {errors.name && <p style={{ color: "red" }}>{errors.name.message}</p>}


          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input  className="input" type="email" name="email" placeholder="Enter your Email"
            
            onChange={(e)=>setValues({...values,[e.target.name]: e.target.value})} 
            
            {...register("email", {
               required: "Email is required", 
               pattern: { 
               value: /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/, 
               message: "Enter valid email" 
              }

             })}
              />

             {errors.email && <p style={{ color: "red" }}>{errors.email.message}</p>}

          </div>

          <div>
            <label htmlFor="password">Password</label>
            <input
            className="input"
              type="password"
              name="password"
              placeholder="Enter your Password" 
              onChange={(e)=>setValues({...values,[e.target.name]: e.target.value})}
              
              {...register("password", {
                required: "Password is required", 
                minLength: {
                  value: 8,
                  message: "At least 8 characters required"
                },
                pattern: { 
                value: /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/, 
                message: "The password must contain at least 1 number,1 lower case letter, and 1 upper case letter" 
               }
 
              })}
              
              />
                {errors.password && <p style={{ color: "red" }}>{errors.password.message}</p>}

          </div>

          <button className="button" type="submit">Sublimt</button>
          <span className="span">
            Already have an acoount? <Link to="/">Login</Link>{" "}
          </span>
        </form>
        <ToastContainer />
      </div>
    </div>
    </section>
   
  );
}

export default Register;
