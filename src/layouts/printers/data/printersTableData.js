import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";
import PropTypes from "prop-types";
import { getAllPrinters } from "model/printersModel";
// Images
import team2 from "../../../assets/images/icons/hardware/printer.png";

function Printer({ image, name }) {
  return (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={name} size="sm" variant="rounded" />
      <MDTypography display="block" variant="button" fontWeight="medium" ml={1} lineHeight={1}>
        {name}
      </MDTypography>
    </MDBox>
  );
}

function Type({ title, description }) {
  return (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        {title}
      </MDTypography>
      <MDTypography variant="caption">{description}</MDTypography>
    </MDBox>
  );
}

const data = async () => {
  try {
    const rows = [];
    const printerList = getAllPrinters();
    printerList.forEach((printer) => {
      rows.push({
        printer: <Printer image={team2} name={printer.nombre} email="" />,
        function: <Type title={printer.tipo} description="80mm" />,
        status: (
          <MDBox ml={-1}>
            <MDBadge badgeContent="online" color="success" variant="gradient" size="sm" />
          </MDBox>
        ),
        route: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            {printer.ruta}
          </MDTypography>
        ),
        action: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            Edit
          </MDTypography>
        ),
      });
    });

    return rows;
  } catch (e) {
    return e;
  }
};

Printer.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};

Type.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default data;
