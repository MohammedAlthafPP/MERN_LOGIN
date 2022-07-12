
import React,{useState,useEffect} from "react";
import { Link,useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios"

const initialState= {
  name:"",
  email: ""
}



function Update() {

  const navigate = useNavigate()


  const [state, setState] = useState(initialState);
  const {name,email} = state
const {id} =useParams();



useEffect(() => {
    if(id){
     
      getSingleUser(id)
    }
}, [id]);





const getSingleUser = async (id) =>{
  const response =await axios.get(`http://localhost:4000/user/${id}`);
  if(response.status===200){
    setState({...response.data[0]})
  

  }
}

const handleInputChange = (e) => {
  let { name, value } = e.target;
  setState({ ...state, [name]: value });
}

const handleSubmit = (e) => {
  e.preventDefault()
  if (id) {
    updateUser(state, id)
  }

}


const generateError = (err) =>toast.error(err,{
  position : "top-center"
})

const updateUser = async (data, id) => {
  try {

    const response = await axios.put(`http://localhost:4000/user/${id}`, data)
    

    if (response) {
      if (response.data.errors) {
        console.log(response.errors);
        const { name, email } = response.data.errors;
        if (name) generateError(name)
        else if (email) generateError(email)
      } else {
        navigate("/admin")
       
      }
    }


  } catch (error) {
    console.log(error);
  }

}



  return (
    <div className="CardBody">
    <div className="container innerbody">
      <h2>Edit Account Details</h2>
      <form className="form" action="" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input  className="input" type="text" name="name" placeholder="Enter your Name" value={name} onChange={ handleInputChange }/>
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input  className="input" type="email" name="email" placeholder="Enter your Email" value={email} onChange={ handleInputChange }/>
        </div>
        {/* <div>
          <label htmlFor="password">Password</label>
          <input
          className="input"
            type="password"
            name="password"
            placeholder="Enter your Password" 
            />
        </div> */}

        <button className="button" type="submit" >Sublimt</button>
        
      </form>
      <ToastContainer />
    </div>
  </div>
  )
}

export default Update