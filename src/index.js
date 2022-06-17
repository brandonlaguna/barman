import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "App";
import { MaterialUIControllerProvider } from "context";
import { SelectorProvider } from "context/selectorContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContextProvider } from "context/userContext";

ReactDOM.hydrate(
  <AuthContextProvider>
    <BrowserRouter>
      <SelectorProvider>
        <MaterialUIControllerProvider>
          <App />
          <ToastContainer
            position="bottom-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </MaterialUIControllerProvider>
      </SelectorProvider>
    </BrowserRouter>
  </AuthContextProvider>,
  document.getElementById("root")
);
