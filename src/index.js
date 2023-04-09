import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "App";
import { MaterialUIControllerProvider } from "context";
import { SelectorProvider } from "context/selectorContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContextProvider } from "context/userContext";
import { ProductControllerProvider } from "context/productContext";
import { ClientsControllerProvider } from "context/clientsContext";
import { UserAuthProvider } from "context/AuthContext";
import { PrintersControllerProvider } from "context/printersContext";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { firebaseConfig } from "config/contants";

const app = initializeApp(firebaseConfig);
// eslint-disable-next-line no-unused-vars
const analytics = getAnalytics(app);

ReactDOM.render(
  <AuthContextProvider>
    <BrowserRouter>
      <SelectorProvider>
        <UserAuthProvider>
          <MaterialUIControllerProvider>
            <ClientsControllerProvider>
              <PrintersControllerProvider>
                <ProductControllerProvider>
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
                </ProductControllerProvider>
              </PrintersControllerProvider>
            </ClientsControllerProvider>
          </MaterialUIControllerProvider>
        </UserAuthProvider>
      </SelectorProvider>
    </BrowserRouter>
  </AuthContextProvider>,
  document.getElementById("root")
);
