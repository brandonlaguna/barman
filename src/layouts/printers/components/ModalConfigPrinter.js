import MainModal from "components/MDModales";
import { Box, Button, Grid } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import AccountCircle from "@mui/icons-material/AccountCircle";
import SendIcon from "@mui/icons-material/Send";
import { useMaterialUIController } from "context";
import PropTypes from "prop-types";
import { ModalConfigPrinterStyle } from "../style";

export default function ModalConfigPrinter({
  isOpen,
  handleOnForceClose,
  data,
  handleSavePrinter,
}) {
  const [controller] = useMaterialUIController();
  const { darkMode, sidenavColor } = controller;
  const active = true;

  return (
    <MainModal
      key={1}
      isOpen={isOpen}
      onForceClose={handleOnForceClose}
      modalStyle={(theme) =>
        ModalConfigPrinterStyle(theme, {
          darkMode,
          sidenavColor,
          active,
          scrollY: "scroll",
        })
      }
    >
      <Box sx={{ "& > :not(style)": { m: 1 } }} style={{ overflowY: "scroll", height: "100%" }}>
        <FormControl variant="standard">
          <Grid container spacing={1} style={{ overflowY: "scroll", height: "100%" }}>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <Box sx={{}}>
                <AccountCircle sx={{ color: "action.active", mr: 1, my: 0.5 }} />
                <TextField id="input-with-sx" label="With sx" variant="standard" />
              </Box>
            </Grid>
            <Grid xs={12} sm={6} md={6} lg={6}>
              <Box sx={{}}>
                <AccountCircle sx={{ color: "action.active", mr: 1, my: 0.5 }} />
                <TextField id="input-with-sx" label="With sx" variant="standard" />
              </Box>
            </Grid>
            <Grid xs={12} sm={12} md={12} lg={12}>
              <Button
                variant="contained"
                endIcon={<SendIcon />}
                onClick={() => handleSavePrinter()}
                style={{ color: "white" }}
              >
                Send
              </Button>
            </Grid>
          </Grid>
        </FormControl>
        <p>{JSON.stringify(data)}</p>
      </Box>
    </MainModal>
  );
}

ModalConfigPrinter.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  data: PropTypes.instanceOf(Array).isRequired,
  handleSavePrinter: PropTypes.func.isRequired,
  handleOnForceClose: PropTypes.func.isRequired,
};
