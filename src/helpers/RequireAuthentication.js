import * as React from "react";
import {
    Navigate, useLocation
  } from "react-router-dom";
  import AuthenticateConsumer from "../helpers/AuthContext";
//   import AuthUser from "../helpers/AuthContext";

function RequireAuthentication({ children }) {
    const { authenticate } = AuthenticateConsumer();
    const location = useLocation();
  
    return authenticate.status === true ? (
      children
    ) : (
      <Navigate to="/login" replace state={{ path: location.pathname }} />
    );
}

export default RequireAuthentication;