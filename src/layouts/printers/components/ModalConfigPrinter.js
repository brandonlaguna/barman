import { useState, useEffect } from "react";
import MainModal from "components/MDModales";
import { Box, Button, Grid } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import SendIcon from "@mui/icons-material/Send";
import InputLabel from "@mui/material/InputLabel";
import NativeSelect from "@mui/material/NativeSelect";
import { useMaterialUIController } from "context";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import MDTextEditor from "components/MDTextEditor";
import { ModalConfigPrinterStyle } from "../style";

export default function ModalConfigPrinter({
  isOpen,
  handleOnForceClose,
  data,
  handleSavePrinter,
}) {
  const [listPrinter, setListPrinter] = useState([]);
  const [controller] = useMaterialUIController();
  const { darkMode, sidenavColor } = controller;
  const active = true;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (dataInput) => {
    console.log("aqui");
    console.log(dataInput);
    handleSavePrinter();
  };

  useEffect(() => {
    setListPrinter(data);
  }, [data]);

  function RenderPrintOption() {
    const options = [];
    listPrinter.forEach((element) => {
      options.push(<option value={element}>{element}</option>);
    });
    return options;
  }
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ "& > :not(style)": { m: 1 } }} style={{ overflowY: "scroll", height: "100%" }}>
          <Grid container spacing={1} style={{ overflowY: "scroll", height: "100%" }}>
            {errors.exampleRequired && <span>This field is required</span>}
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <Box sx={{}}>
                <FormControl variant="standard">
                  <TextField
                    label="Nombre para la impresora"
                    id="standard-size-normal"
                    defaultValue=""
                    variant="standard"
                    {...register("printerName", { required: true, pattern: /^[A-Za-z]+$/i })}
                  />
                </FormControl>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <Box sx={{}}>
                <FormControl variant="standard">
                  <TextField
                    label="Ruta"
                    id="standard-size-normal"
                    defaultValue=""
                    variant="standard"
                    {...register("printerRoute")}
                  />
                </FormControl>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <Box sx={{}}>
                <FormControl variant="standard">
                  <TextField
                    label="Tipo de impresora"
                    id="standard-size-normal"
                    defaultValue=""
                    variant="standard"
                    {...register("printerType", { pattern: /^[A-Za-z]+$/i })}
                  />
                </FormControl>
              </Box>
            </Grid>
            <Grid xs={12} sm={6} md={6} lg={6}>
              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <InputLabel variant="standard" htmlFor="uncontrolled-native">
                    Impresora
                  </InputLabel>
                  <NativeSelect
                    defaultValue={30}
                    inputProps={{
                      name: "printer",
                      id: "uncontrolled-native",
                    }}
                    {...register("printerSelected", { required: true })}
                  >
                    <RenderPrintOption />
                  </NativeSelect>
                </FormControl>
              </Box>
            </Grid>
            <Grid xs={12} sm={12} md={12} lg={12} style={{ paddingTop: 5 }}>
              <MDTextEditor />
            </Grid>
            <Grid xs={12} sm={12} md={12} lg={12}>
              <FormControl fullWidth>
                <Button
                  type="submit"
                  variant="contained"
                  endIcon={<SendIcon />}
                  style={{ color: "white" }}
                >
                  Send
                </Button>
              </FormControl>
            </Grid>
          </Grid>
        </Box>
      </form>
    </MainModal>
  );
}

ModalConfigPrinter.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  data: PropTypes.instanceOf(Array).isRequired,
  handleSavePrinter: PropTypes.func.isRequired,
  handleOnForceClose: PropTypes.func.isRequired,
};
