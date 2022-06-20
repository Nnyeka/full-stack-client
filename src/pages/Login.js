import React from "react";
import axios from "axios";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
// import {AuthContext} from '../helpers/AuthContext'
// import {AuthenticationProvider} from "../helpers/AuthContext"
import AuthenticateConsumer from "../helpers/AuthContext";



function Login() {

  const { register, handleSubmit, formState: {errors} } = useForm();
  // const {setAuthState} = useContext(AuthContext)
  const { login } = AuthenticateConsumer();
  const { state } = useLocation();

  const navigate = useNavigate();

  const onSubmit = data => {
    
    axios.post("https://sleeptrack-full-stack-api.herokuapp.com/auth/login", data).then((res) => {
      if (res.data.error) {
        alert(res.error);
      } else {

        localStorage.setItem("accessToken", res.data.token);
        // console.log("login res data..", res.data)
      login(res.data.username, res.data.id);
      }
      navigate(state?.path || "/olduser")
      // console.log(state)
    });
  }


  // const handleLogin = () => {
    
      
  //   const data = {
  //     username: username,
  //     password: password,
  //   };
  //   axios.post("http://localhost:3001/auth/login", data).then((res) => {
  //     if (res.data.error) {
  //       alert(res.error);
  //     } else {

  //       localStorage.setItem("accessToken", res.data.token);
  //       console.log("login res data..", res.data)
  //     login(res.data.username, res.data.id);
  //     }
  //     navigate(state?.path || "/olduser")
  //     console.log(state)
  //   });
  // };
  return (
    <div className="form">
      <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
        <input placeholder="username" type="text" {...register("username")}/>
        <input placeholder="password" type="password" {...register("password")}/>
        {/* <input type="submit"/> */}
        <button type="submit">login</button>
      </form>
        <Link to="/registration">
        Don't have an account? <span>sign up</span> </Link>

    </div>



  );
}

export default Login;


  //   <div className="form">
  //   <form className="login-form">
  //   <input type="text" placeholder="username" onChange={(e) => setUsername(e.target.value)} />
  //   <input type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} />
  //   </form>
  //   <button onClick={handleLogin}> Login</button>
  //   <Link to="/registration">
  //   Don't have an account? <span>sign up</span>
  // </Link>
     
  //   </div>
