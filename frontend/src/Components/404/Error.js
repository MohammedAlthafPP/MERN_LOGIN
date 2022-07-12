import React from 'react'
import Button from 'react-bootstrap/Button';
import LogoImage from './ezgif.com-gif-maker-1.gif';
import { Link } from "react-router-dom";
import "./ErrorPage.css"


function Error() {
  var sectionStyle = {
    backgroundImage: `url(${LogoImage})`
 }
  return (
    <div className='d-flex justify-content-center  '>

  
    <div style={sectionStyle} className="errorpage position-absolute top-50 start-50 translate-middle">
      
      <div className='d-flex justify-content-center position-absolute bottom-0 start-50 translate-middle-x'>
      <Link to="/homepage">
      <Button variant="dark" className='text-info' >GO TO <i class="fa-solid fa-house"></i></Button>
      
      </Link>
      </div>
   

    
    </div>
    </div>
  )
}

export default Error