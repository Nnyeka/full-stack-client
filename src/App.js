import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import OldUser from "./pages/OldUser";
import CreateSleep  from './pages/CreateSleep';
import Sleep from './pages/Sleep';
import Registration from './pages/Registration';
import Login from './pages/Login';
import Homepage from './pages/Homepage';
import Nav from './pages/Nav';
import { AuthenticationProvider } from './helpers/AuthContext';
import RequireAuthentication from "./helpers/RequireAuthentication"
// import {useState, useEffect} from "react";
// import axios from 'axios';

function App() {

  return (
  <div className='App'>
    <div>
    <Router>
    <AuthenticationProvider>
    <Nav/>
      <Routes>
        <Route path='/' element={<Homepage/>}/>
        <Route path='/olduser' element={
          <RequireAuthentication>
            <OldUser/>
          </RequireAuthentication>
        }/>
        <Route path='/createsleep' element={
          <RequireAuthentication>
              <CreateSleep/>
          </RequireAuthentication>
        }/>
        <Route path='/sleep/:id' element={
          <RequireAuthentication>
              <Sleep/>
          </RequireAuthentication>
        }/>
        <Route path='/registration' element={<Registration/>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>

    </AuthenticationProvider>
    </Router>
    </div>
   

  </div>
  )

}

export default App;

// function App() {

//   const [authState, setAuthState] = useState({
//     username: "",
//     id: 0,
//     status: false,
//   });

//   useEffect(() => {
//       axios.get("http://localhost:3001/auth/auth", {
//         headers: {
//           accessToken: localStorage.getItem("accessToken"),
//         },
//       }).then((res) => {
//         if (res.data.error) {
//           setAuthState({
//             ...authState, status: false
//           })
//         } else {
//         setAuthState({
//           username: res.data.username,
//           id: res.data.id,
//           status: true,
//         })
//       } 
//       })
      
    
//   }, []);

//   const logout = () => {
//     localStorage.removeItem("accessToken")
//     setAuthState({
//       username: "",
//       id: 0,
//       status: false,
//     })

//   }

//   return (
//   <div className='App'>
//     <div>
//     <Router>
//     <div className='navbar'>
//     <Link to="/"> Homepage</Link>
//     {authState.status && (
//     <>
//     <Link to="/createsleep"> CreateSleep</Link>
//     </>
//     )}
//     {!authState.status ? (
//     <>
//     <Link to="/login"> Login</Link>
//     <Link to="/registration"> Registration</Link>
//     </>
//     ) : (
//       <button onClick={logout}>Logout</button>
//     )}
//     <h1>{authState.username}</h1>

//     </div>
//       <Routes>
//         <Route path='/' element={<Homepage/>}/>
//         <Route path='/olduser' element={<OldUser/>}/>
//         <Route path='/createsleep' element={<CreateSleep/>}/>
//         <Route path='/sleep/:id' element={<Sleep/>}/>
//         <Route path='/registration' element={<Registration/>}/>
//         <Route path='/login' element={<Login/>}/>
//       </Routes>
//     </Router>
//     </div>
   

//   </div>
//   )

// }
