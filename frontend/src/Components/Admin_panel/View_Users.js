import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

function View_Users() {
  const [datas, setDatas] = useState([]);

  useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = async () => {
    const response = await axios.get("http://localhost:4000/users");
    if (response.status === 200) {
      setDatas(response.data);
    }
  };

  const onDeleteUser = async (id) => {
    if (
      window.confirm("Are You sure that you wanted to delete the user Record ?")
    ) {
      const response = await axios.delete(`http://localhost:4000/user/${id}`);
      if (response.status === 200) {
        toast.success(response.data,{position:'top-center'});
        console.log(response.data, "response.data");
        getAllUsers();
      }
    }
  };


const onBlockUser = async (id) =>{

  if (
    window.confirm("Are You sure that you wanted to Block the user ?")
  ) {
    const response = await axios.put(`http://localhost:4000/block/${id}`);
    if (response.status === 200) {
      toast.warning(response.data,{position:'top-center'});
      console.log(response.data, "response.data");
      getAllUsers();
    }
  }

}

const onUnblockUser = async (id) =>{

  if (
    window.confirm("Are You sure that you wanted to Unblock the user ?")
  ) {
    const response = await axios.put(`http://localhost:4000/unblock/${id}`);
    if (response.status === 200) {
      toast.warning(response.data,{position:'top-center'});
      console.log(response.data, "response.data");
      getAllUsers();
    }
  }

}





  return (
    <Container>
      <Table responsive striped bordered hover variant="dark" className="mt-5">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Username</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          {datas &&
            datas.map((item, index) => {
              return (
                <tr>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.email}</td>

                  <td>
                    <Link to={`/user/${item._id}`}>
                      <Button variant="outline-info" className="mt-2 ms-2">
                        <i class="fa-solid fa-eye"></i>
                      </Button>{" "}
                    </Link>
                    <Link to={`/update/${item._id}`}>
                      <Button variant="outline-primary" className="mt-2 ms-2">
                        <i class="fa-solid fa-pen-to-square "></i>
                      </Button>{" "}
                    </Link>

                    {(item.isStatus) ?
                    <Button variant="outline-danger" className="mt-2 ms-2"  onClick={() => onBlockUser(item._id)}>
                      Block
                    </Button>
                    :
                    <Button variant="outline-success" className="mt-2 ms-2"  onClick={() => onUnblockUser(item._id)}>
                      Unblock
                    </Button>
                      }
                    <Button
                      variant="outline-danger"
                      className="mt-2 ms-2"
                      onClick={() => onDeleteUser(item._id)}
                    >
                      <i class="fa-solid fa-trash "></i>
                    </Button>{" "}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
      <ToastContainer />
    </Container>
  );
}

export default View_Users;

// import Table from 'react-bootstrap/Table';

// function View_Users() {
//   return (
//     <Table responsive>
//       <thead>
//         <tr>
//           <th>#</th>
//           {Array.from({ length: 12 }).map((_, index) => (
//             <th key={index}>Table heading</th>
//           ))}
//         </tr>
//       </thead>
//       <tbody>
//         <tr>
//           <td>1</td>
//           {Array.from({ length: 12 }).map((_, index) => (
//             <td key={index}>Table cell {index}</td>
//           ))}
//         </tr>
//         <tr>
//           <td>2</td>
//           {Array.from({ length: 12 }).map((_, index) => (
//             <td key={index}>Table cell {index}</td>
//           ))}
//         </tr>
//         <tr>
//           <td>3</td>
//           {Array.from({ length: 12 }).map((_, index) => (
//             <td key={index}>Table cell {index}</td>
//           ))}
//         </tr>
//       </tbody>
//     </Table>
//   );
// }

// export default View_Users;
