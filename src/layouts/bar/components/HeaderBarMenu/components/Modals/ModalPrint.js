import { Grid, Card, Box } from "@mui/material";
import { useMaterialUIController } from "context";
import MainModal from "components/MDModales";
import PropTypes from "prop-types";
import MDTypography from "components/MDTypography";
import { BANK_ICONS } from "config/contants";
import { ModalPrintStyle } from "../../style";

export default function ModalPrint({ isOpen, handleOnForceClose, handleSelectPrint }) {
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
    },
    {
      id: 2,
      title: "Imprimir caja",
      value: 1,
      icon: `${BANK_ICONS}/interface/bar.png`,
    },
    {
      id: 2,
      title: "Imprimir comanda",
      value: 2,
      icon: `${BANK_ICONS}/interface/frying-pan.png`,
    },
    {
      id: 3,
      title: "No imprimir",
      value: false,
      icon: `${BANK_ICONS}/interface/error_print.png`,
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
            onClick={() => handleSelectPrint(printMode.value)}
          >
            <Box
              component="img"
              sx={{
                height: 150,
                width: 150,
                maxHeight: { xs: 220, md: 220 },
                maxWidth: { xs: 220, md: 220 },
                alignSelf: "center",
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

ModalPrint.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleOnForceClose: PropTypes.func.isRequired,
  handleSelectPrint: PropTypes.func.isRequired,
};
