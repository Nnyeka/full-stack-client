import * as React from "react";
import {useState, useEffect} from "react"
import { Link, useNavigate } from "react-router-dom";
import AuthenticateConsumer from "../helpers/AuthContext";


function Nav() {
  const { authenticate, logout, login } = AuthenticateConsumer();
  const navigate = useNavigate();
  const [toggle, setToggle] =  useState(false)

  const handleLogout = () => {
    logout();
    navigate("/")

  }

  // const handleLogin = () => {
  //   login();
  //   navigate("/olduser")

  // }


  return(
    <header className="primary-header flex">
          <Link to="/">
    <h1 className="logo">SleepTracker</h1>
    </Link>
      <button className="mobile-nav-toggle" onClick={() => setToggle(!toggle)} 
      aria-controls="primary-navigation" aria-expanded={toggle ? true : false}></button>
    <nav>
    <ul id="primary-navigation" className={`primary-navigation flex ${toggle ? "active" : "close"}`}>
      <li>
      <Link onClick={() => setToggle(!toggle)} to="/">Homepage</Link>
      </li><li>
      <Link onClick={() => setToggle(!toggle)} to="/createsleep">CreateSleep</Link>
      </li>
      {/* <li>
      {!authenticate.status && <Link to="/registration"> Registration</Link>}
      </li> */}
      <li>
      <Link onClick={() => setToggle(!toggle)} to="/olduser">Profile</Link>
      </li>
      <li className="">
      {!authenticate.status && <Link onClick={() => setToggle(!toggle)} to="/login">Login</Link>}
      </li>
      <li>
      <h4 className={`username ${authenticate.status && "top"}`}>Hi {authenticate.username}!</h4>
      </li>
      <li>
      {authenticate.status && <button className="logout" onClick={handleLogout}>Logout</button>}
      </li>
    </ul>
    
    </nav>

    </header>

  )
} 

export default Nav;