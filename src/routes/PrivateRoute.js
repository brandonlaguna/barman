import { Route, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import useUser from "hooks/useUser";

function PrivateRoute({ component: Component, ...rest }) {
  const { isLoggedIn } = useUser();
  const navigate = useNavigate();

  return (
    <Route
      {...rest}
      render={(props) => (isLoggedIn ? <Component {...props} /> : navigate("/login"))}
    />
  );
}

PrivateRoute.propTypes = {
  component: PropTypes.node.isRequired,
};

export default PrivateRoute;
