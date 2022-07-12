import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import { Link, useParams } from 'react-router-dom';
import Admin_Navbar from './Admin_Navbar';
import React,{useEffect,useState} from 'react';
import axios from 'axios';





const initialState= {
    name:"",
    email: "",
    joindOn:""
  }
  




function Single_user() {
    
    const [state, setState] = useState(initialState);
    const {name,email,joindOn} = state
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




  return (
    <div>

 
    <Admin_Navbar/>
    <Container>

 
    <Card className="text-center mt-5">
      <Card.Header>User</Card.Header>
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>
          {email}
        </Card.Text>
        <Link to={"/admin"}>
        <Button variant="primary">Go to Admin Panel</Button>
        </Link>
      </Card.Body>
      <Card.Footer className="text-muted">{joindOn}</Card.Footer>
    </Card>
    </Container>
    </div>
  );
}

export default Single_user;