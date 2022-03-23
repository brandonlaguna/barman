import MDBox from "components/MDBox";
import PropTypes from "prop-types";
import { useMaterialUIController } from "context";
import HeaderStyle from "./style";

export default function HeaderBarMenu({ light }) {
  const [controller] = useMaterialUIController();
  const { darkMode, sidenavColor } = controller;
  const active = true;

  return (
    <MDBox
      mb={1.5}
      sx={(theme) =>
        HeaderStyle(theme, {
          darkMode,
          sidenavColor,
          active,
        })
      }
    >
      <h1>Nada</h1>
      <h6>{light}</h6>
    </MDBox>
  );
}

HeaderBarMenu.defaultProps = {
  light: false,
};

HeaderBarMenu.propTypes = {
  light: PropTypes.bool,
};
