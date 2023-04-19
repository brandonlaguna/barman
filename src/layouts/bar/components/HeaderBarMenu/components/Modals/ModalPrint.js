import { Grid, Card, Box } from "@mui/material";
import { useMaterialUIController } from "context";
import MainModal from "components/MDModales";
import PropTypes from "prop-types";
import MDTypography from "components/MDTypography";
import { BANK_ICONS } from "config/contants";
import { toast } from "react-toastify";
import { ModalPrintStyle } from "../../style";

export default function ModalPrint({
  isOpen,
  handleOnForceClose,
  handleSelectPrint,
  enabledPrinters,
}) {
  const [controller] = useMaterialUIController();
  // context methods
  const { darkMode, sidenavColor } = controller;
  const active = true;
  const listPrintMode = [
    {
      id: 1,
      title: "Imprimir todas",
      value: "all",
      icon: `${BANK_ICONS}/interface/red_printer.png`,
      onTable: false,
    },
    {
      id: 2,
      title: "Imprimir caja",
      value: 1,
      icon: `${BANK_ICONS}/interface/bar.png`,
      onTable: false,
    },
    {
      id: 3,
      title: "Imprimir comanda",
      value: 2,
      icon: `${BANK_ICONS}/interface/frying-pan.png`,
      onTable: true,
    },
    {
      id: 4,
      title: "No imprimir",
      value: false,
      icon: `${BANK_ICONS}/interface/error_print.png`,
      onTable: true,
    },
  ];

  const RenderPrintMode = () => {
    const renderReturn = [];
    listPrintMode.map((printMode) =>
      renderReturn.push(
        <Grid item xs={12} md={3} lg={3}>
          <Card
            role="button"
            sx={{ justifyContent: "center" }}
            key={printMode.id}
            onClick={() =>
              enabledPrinters.includes(printMode.value) || enabledPrinters.length === 0
                ? handleSelectPrint(printMode.value)
                : toast.warning("Impresora no disponible por el tipo de venta")
            }
          >
            <Box
              component="img"
              sx={{
                height: 150,
                width: 150,
                maxHeight: { xs: 220, md: 220 },
                maxWidth: { xs: 220, md: 220 },
                alignSelf: "center",
                filter: `grayscale(${
                  enabledPrinters.includes(printMode.value) || enabledPrinters.length === 0
                    ? "0%"
                    : "100%"
                })`,
              }}
              alt={printMode.title}
              src={printMode.icon}
            />
            <MDTypography
              fontWeight="bold"
              textTransform="capitalize"
              variant="h5"
              color="dark"
              noWrap
              alignSelf="center"
            >
              {printMode.title}
            </MDTypography>
          </Card>
        </Grid>
      )
    );

    return renderReturn;
  };

  return (
    <MainModal
      key={2}
      isOpen={isOpen}
      onForceClose={handleOnForceClose}
      modalStyle={(theme) =>
        ModalPrintStyle(theme, {
          darkMode,
          sidenavColor,
          active,
          scrollY: "scroll",
        })
      }
    >
      <Grid
        container
        spacing={1}
        style={{
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
          padding: 6,
          marginLeft: -2,
          overflowX: "scroll",
        }}
      >
        <RenderPrintMode />
      </Grid>
    </MainModal>
  );
}

ModalPrint.defaultProps = {
  enabledPrinters: [],
};

ModalPrint.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleOnForceClose: PropTypes.func.isRequired,
  handleSelectPrint: PropTypes.func.isRequired,
  enabledPrinters: PropTypes.instanceOf(Array),
};
