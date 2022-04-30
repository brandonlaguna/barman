import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "App";
import { Auth0Provider } from "@auth0/auth0-react";
// Silpos Barman React Context Provider
import { MaterialUIControllerProvider } from "context";
import { SelectorProvider } from "context/selectorContext";

ReactDOM.render(
  <BrowserRouter>
    <SelectorProvider>
      <Auth0Provider
        domain="silpos.us.auth0.com"
        clientId="pGq9qahjQB40GcNNsWWakAUtMPTmnMAc"
        redirectUri={window.location.origin}
      >
        <MaterialUIControllerProvider>
          <App />
        </MaterialUIControllerProvider>
      </Auth0Provider>
    </SelectorProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
