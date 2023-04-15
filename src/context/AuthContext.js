import { createContext, useMemo, useReducer, useContext } from "react";
import PropTypes from "prop-types";

const UserAuth = createContext();
UserAuth.displayName = "UserAuthContext";

const initialState = {
  userInfo: {
    name: "nombre",
  },
};

function reducer(state, action) {
  const { value } = action;
  switch (action.type) {
    case "SET_userInfo": {
      return {
        ...state,
        sendTransaction: value,
      };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function UserAuthProvider({ children }) {
  const [userAuthController, userAuthDispatch] = useReducer(reducer, initialState);

  const data = useMemo(
    () => [userAuthController, userAuthDispatch],
    [userAuthController, userAuthDispatch]
  );

  return <UserAuth.Provider value={data}>{children}</UserAuth.Provider>;
}

// Silpos Barman React custom hook for using context
function useUserAuthController() {
  const context = useContext(UserAuth);

  if (!context) {
    throw new Error("useUserAuthController should be used inside the ProductControllerProvider.");
  }

  return context;
}

UserAuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

const setUserAuth = (userAuthDispatch, value) => userAuthDispatch({ type: "SET_USER", value });

export { useUserAuthController, UserAuthProvider, setUserAuth };
