import * as React from "react";


const authUserContext = React.createContext();

function AuthUser() {
  const [authenticate, setAuthenticate] = React.useState({
    username: "",
    id: 0,
    status: false,
  });

  return {
    authenticate,
    login(username, id) {
      return setAuthenticate({
        username: username,
        id: id,
        status: true,
      });
    },

    logout() {
      return new Promise((res) => {
        setAuthenticate({
          username: "",
          id: 0,
          status: false,
        });
        res();
      });
    },
  };
}

export function AuthenticationProvider({ children }) {
  const auth = AuthUser();

  return (
    <authUserContext.Provider value={auth}>{children}</authUserContext.Provider>
  );
}

export default function AuthenticateConsumer() {
  return React.useContext(authUserContext);
}
