
import './App.css';
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Login from './pages/LoginPage';
import Secret from './pages/SecretPage';
import UserRegister from './pages/UserRegister';
import "react-toastify/dist/ReactToastify.css"
import Admin from './Components/Admin_panel/Admin';
import Single_user from './Components/Admin_panel/Single_user';
import Update from './Components/Admin_panel/Update';
import ErrorPage from './pages/ErrorPage';
function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route exact path="/register" element={<UserRegister/>} />
      <Route exact path="/" element={<Login/>} />
      <Route exact path="/homepage" element={<Secret/>} />
      <Route exact path="/admin" element={<Admin/>} />
      <Route exact path="/update/:id" element={<Update/>} />
      <Route exact path="/user/:id" element={<Single_user/>} />
      <Route exact path="*" element={<ErrorPage/>} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
