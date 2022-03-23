import MDBox from "components/MDBox";
import PropTypes from "prop-types";
import { useMaterialUIController } from "context";
import ItemCartBarStyle from "./style";

export default function ItemCartBar({ light }) {
  const [controller] = useMaterialUIController();
  const { darkMode, sidenavColor } = controller;
  const active = true;

  return (
    <MDBox
      mb={1.5}
      sx={(theme) =>
        ItemCartBarStyle(theme, {
          darkMode,
          sidenavColor,
          active,
        })
      }
    >
      <h1>Productos</h1>
      <h6>{light}</h6>
    </MDBox>
  );
}

ItemCartBar.defaultProps = {
  light: false,
};

ItemCartBar.propTypes = {
  light: PropTypes.bool,
};
