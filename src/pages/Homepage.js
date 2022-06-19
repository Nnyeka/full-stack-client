import React from 'react'
import { Link } from 'react-router-dom';
import AuthenticateConsumer from "../helpers/AuthContext";

function Homepage() {
  const { authenticate } = AuthenticateConsumer();

  return (
    <div className='homepage'>
      <h1>Create a Pattern</h1>
      <p>have a sleep cycle</p>

      {!authenticate.status && <Link className="get-started" to="/login">Get Started</Link>}

      {authenticate.status && <Link className="get-started" to="/createsleep">Get Started</Link>}
{}
    </div>
  )
}

export default Homepage