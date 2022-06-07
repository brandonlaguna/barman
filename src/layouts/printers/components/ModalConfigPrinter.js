import { useState, useEffect } from "react";
import MainModal from "components/MDModales";
import { Box, Button, Grid, Typography } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import SendIcon from "@mui/icons-material/Send";
import NativeSelect from "@mui/material/NativeSelect";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import { useMaterialUIController } from "context";
import formatoImpresion from "functions/formatosImpresion";
import { savePrinter } from "services/configuracionServices";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ModalConfigPrinterStyle } from "../style";

const schema = yup
  .object({
    nombre: yup.string().required("Debe seleccionar una impresora válida"),
    ruta: yup.string().required("Debe ingresar una ruta"),
    tipo: yup.string().required("Debe ingresar un tipo de impresora  ej: POS"),
    formato: yup.string().required("Debe seleccionar un formato válido"),
  })
  .required();

export default function ModalConfigPrinter({
  isOpen,
  handleOnForceClose,
  data,
  handleSavePrinter,
}) {
  const [listPrinter, setListPrinter] = useState([]);
  const [selectedValue, setSelectedValue] = useState("a");
  const [controller] = useMaterialUIController();
  const { darkMode, sidenavColor } = controller;
  const active = true;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = (dataInput) => {
    savePrinter({
      ...dataInput,
      formato: formatoImpresion[dataInput.formato],
      estado: 1,
    }).then((response) => {
      console.log(response);
      if (response.status) {
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
    });
    handleSavePrinter();
  };

  const handleChangeCircleButton = (event) => {
    setSelectedValue(event.target.value);
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

  const controlProps = (item) => ({
    checked: selectedValue === item,
    onChange: handleChangeCircleButton,
    value: item,
    name: `formato`,
    inputProps: { "aria-label": item },
  });

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
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <NativeSelect {...register("nombre", { required: true })}>
                    <RenderPrintOption />
                  </NativeSelect>
                </FormControl>
                <Typography variant="caption" display="block" gutterBottom style={{ color: "red" }}>
                  {errors.nombre?.message}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <Box sx={{}}>
                <FormControl variant="standard" fullWidth>
                  <TextField
                    label="Ruta"
                    id="ruta"
                    defaultValue=""
                    variant="standard"
                    {...register("ruta")}
                  />
                </FormControl>
                <Typography variant="caption" display="block" gutterBottom style={{ color: "red" }}>
                  {errors.ruta?.message}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <Box sx={{}}>
                <FormControl variant="standard" fullWidth>
                  <TextField
                    label="Tipo de impresora"
                    id="tipo"
                    defaultValue=""
                    variant="standard"
                    {...register("tipo", { pattern: /^[A-Za-z]+$/i })}
                  />
                </FormControl>
                <Typography variant="caption" display="block" gutterBottom style={{ color: "red" }}>
                  {errors.tipo?.message}
                </Typography>
              </Box>
            </Grid>
            <Grid xs={12} sm={12} md={12} lg={12} style={{ paddingTop: 5 }}>
              <FormControl>
                <FormLabel id="buttons-group-label" variant="standard">
                  Formato
                </FormLabel>
                <RadioGroup {...register("formato")}>
                  <FormControlLabel
                    {...controlProps("1")}
                    size="small"
                    control={<Radio />}
                    label="Comanda"
                  />
                  <FormControlLabel
                    {...controlProps("2")}
                    size="small"
                    control={<Radio />}
                    label="Ticket"
                  />
                </RadioGroup>
                <Typography variant="caption" display="block" gutterBottom style={{ color: "red" }}>
                  {errors.formato?.message}
                </Typography>
              </FormControl>
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
