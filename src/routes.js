// Silpos Barman React layouts
import Dashboard from "layouts/dashboard";
// import Tables from "layouts/tables";
// import Billing from "layouts/billing";
// import RTL from "layouts/rtl";
// import Notifications from "layouts/notifications";
// import Profile from "layouts/profile";
// import SignIn from "layouts/authentication/sign-in";
// import SignUp from "layouts/authentication/sign-up";
import Bar from "layouts/bar";
import SyncServer from "layouts/sync_server";
import Printers from "layouts/printers";
import Basic from "layouts/authentication/sign-in";

// @mui icons
import Icon from "@mui/material/Icon";

const routes = [
  {
    type: "collapse",
    name: "Inicio",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <Dashboard />,
    auth: true,
    restricted: true,
  },
  {
    type: "collapse",
    name: "Bar",
    key: "bar",
    icon: <Icon fontSize="small">attach_money</Icon>,
    route: "/bar",
    component: <Bar />,
    auth: true,
    restricted: true,
  },
  {
    type: "collapse",
    name: "Sincronizar Servicios",
    key: "sync_server",
    icon: <Icon fontSize="small">cloud_sync</Icon>,
    route: "/sync_server",
    component: <SyncServer />,
    auth: true,
    restricted: true,
  },
  {
    type: "collapse",
    name: "Impresoras",
    key: "printers",
    icon: <Icon fontSize="small">print_icon</Icon>,
    route: "/printers",
    component: <Printers />,
    auth: true,
    restricted: true,
  },
  {
    type: "route",
    name: "Inicio de sesion",
    key: "login",
    icon: <Icon fontSize="small">print_icon</Icon>,
    route: "/login",
    component: <Basic />,
    auth: false,
    restricted: false,
  },
];

export default routes;
