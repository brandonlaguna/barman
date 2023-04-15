/**
=========================================================
* Silpos Barman React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// Silpos Barman React components
import MDBox from "components/MDBox";
import { useMaterialUIController } from "context";

function DataTableBodyCell({ noBorder, align, children, selected, rowColor }) {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  const colorRowSelected = darkMode ? "#657da5" : "#fbfbfb";
  const colorText = darkMode ? "white" : rowColor;
  const colorMode = darkMode ? "white" : "none";
  return (
    <MDBox
      component="td"
      textAlign={align}
      py={1.5}
      px={3}
      sx={({ palette: { light }, typography: { size }, borders: { borderWidth } }) => ({
        fontSize: size.sm,
        borderBottom: noBorder ? "none" : `${borderWidth[1]} solid ${light.main}`,
        background: selected ? colorRowSelected : "none",
      })}
    >
      <MDBox
        display="inline-block"
        width="max-content"
        color={selected ? colorText : colorMode}
        sx={{ verticalAlign: "middle" }}
      >
        {children}
      </MDBox>
    </MDBox>
  );
}

// Setting default values for the props of DataTableBodyCell
DataTableBodyCell.defaultProps = {
  noBorder: false,
  align: "left",
  selected: false,
  rowColor: "info",
};

// Typechecking props for the DataTableBodyCell
DataTableBodyCell.propTypes = {
  children: PropTypes.node.isRequired,
  noBorder: PropTypes.bool,
  align: PropTypes.oneOf(["left", "right", "center"]),
  selected: PropTypes.bool,
  rowColor: PropTypes.oneOf([
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "dark",
    "light",
  ]),
};

export default DataTableBodyCell;
