import { Route, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import useUser from "hooks/useUser";

function PublicRoute({ component: Component, restricted, ...rest }) {
  const { isLoggedIn } = useUser();
  const navigate = useNavigate();

  return (
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn && restricted ? navigate("/dashboard") : <Component {...props} />
      }
    />
  );
}

PublicRoute.defaultProps = {
  restricted: false,
};

PublicRoute.propTypes = {
  component: PropTypes.node.isRequired,
  restricted: PropTypes.bool,
};

export default PublicRoute;
