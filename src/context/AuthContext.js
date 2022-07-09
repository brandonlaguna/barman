import { createContext, useState, useMemo } from "react";
import PropTypes from "prop-types";

const AuthContext = createContext();

const initialAuth = null;

function AuthProvider({ children }) {
  const [auth, setAuth] = useState(initialAuth);

  const handleAuth = (e) => {
    console.log(e);
    if (auth) {
      setAuth(null);
    } else {
      setAuth(true);
    }
  };

  const data = useMemo(() => [auth, handleAuth]);
  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { AuthProvider };
export default AuthContext;
