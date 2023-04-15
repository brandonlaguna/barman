import { useState, useEffect } from "react";
import MainModal from "components/MDModales";
import { Button, Grid, InputLabel, MenuItem, Select } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import SendIcon from "@mui/icons-material/Send";
import FormHelperText from "@mui/material/FormHelperText";
import { useMaterialUIController } from "context";
import PropTypes from "prop-types";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { validationIp } from "utils/mask";
import { usePrintersController } from "context/printersContext";
import { updatePrinterAC, createPrinterAC } from "context/action-creator/printersAC";
import formatoImpresion from "functions/formatosImpresion";
import DEFAULTFORM from "config/defaultMessages";
import { ModalConfigPrinterStyle } from "../style";

const schema = yup
  .object({
    nombre: yup.string().required("Debe seleccionar una impresora válida"),
    ruta: yup.string().required("Debe ingresar una ruta"),
    tipo: yup.string().required("Debe ingresar un tipo de impresora  ej: POS"),
    formato: yup.string(),
    tipo_formato: yup.number().min(1, DEFAULTFORM.selectItem).required(DEFAULTFORM.selectItem),
    id: yup.number().nullable(),
    estado: yup.number(),
  })
  .required();

export default function ModalConfigPrinter({
  isOpen,
  handleOnForceClose,
  printerList,
  handleSavePrinter,
  data,
}) {
  const [listPrinter, setListPrinter] = useState([]);
  const [controller] = useMaterialUIController();
  // eslint-disable-next-line no-unused-vars
  const [printersController, printerDispatch] = usePrintersController();
  const { isEdited } = printersController;
  const { darkMode, sidenavColor } = controller;
  const active = true;

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = (dataInput) => {
    if (dataInput && dataInput.id) {
      updatePrinterAC(
        printerDispatch,
        { ...dataInput, formato: formatoImpresion[dataInput.tipo_formato] },
        isEdited + 1
      );
    } else {
      createPrinterAC(
        printerDispatch,
        {
          ...dataInput,
          formato: formatoImpresion[dataInput.tipo_formato],
        },
        isEdited + 1
      );
    }
  };

  useEffect(() => {
    setListPrinter(printerList);
  }, [printerList]);

  useEffect(() => {
    if (isEdited > 0) {
      handleSavePrinter();
    }
  }, [isEdited]);

  useEffect(() => {
    if (data) {
      setValue("id", data.id);
      setValue("nombre", data.nombre);
      setValue("ruta", data.ruta);
      setValue("tipo", data.tipo);
      setValue("tipo_formato", data.tipo_formato);
      setValue("estado", data.estado);
    } else {
      reset();
      setValue("estado", 1);
    }
  }, [data]);

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
        <Grid
          container
          spacing={1}
          style={{
            width: "100%",
            padding: 6,
            marginLeft: -2,
            overflowY: "auto",
          }}
        >
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <FormControl fullWidth sx={{ mb: 1, mt: 1 }}>
              <Controller
                name="nombre"
                control={control}
                rules={{ required: false }}
                render={({ field }) => (
                  <>
                    <InputLabel id="nombre_label">Impresora</InputLabel>
                    <Select
                      {...field}
                      label="Impresora"
                      labelId="nombre_label"
                      id="nombre"
                      style={{
                        height: 43,
                      }}
                    >
                      {listPrinter &&
                        listPrinter.map((sel) => <MenuItem value={sel}>{sel}</MenuItem>)}
                    </Select>
                  </>
                )}
              />
              {errors.nombre && (
                <FormHelperText sx={{ color: "red" }}>{errors.nombre.message}</FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <FormControl fullWidth sx={{ mb: 1, mt: 1 }}>
              <Controller
                name="ruta"
                control={control}
                rules={{ required: false }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Ruta*"
                    placeholder=""
                    error={Boolean(errors.ruta)}
                    onChange={(e) => field.onChange(validationIp(e.target.value))}
                  />
                )}
              />
              {errors.ruta && (
                <FormHelperText sx={{ color: "red" }}>{errors.ruta.message}</FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <FormControl fullWidth sx={{ mb: 1, mt: 1 }}>
              <Controller
                name="tipo"
                control={control}
                rules={{ required: false }}
                render={({ field }) => (
                  <>
                    <InputLabel id="tipo_label">Tipo de Impresora</InputLabel>
                    <Select
                      {...field}
                      label="Tipo de Impresora"
                      labelId="tipo_label"
                      id="tipo"
                      style={{
                        height: 43,
                      }}
                    >
                      <MenuItem value="USB">USB</MenuItem>
                      <MenuItem value="Wi-Fi">Wi-Fi</MenuItem>
                    </Select>
                  </>
                )}
              />
              {errors.tipo && (
                <FormHelperText sx={{ color: "red" }}>{errors.tipo.message}</FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <FormControl fullWidth sx={{ mb: 1, mt: 1 }}>
              <Controller
                name="tipo_formato"
                control={control}
                rules={{ required: false }}
                render={({ field }) => (
                  <>
                    <InputLabel id="tipo_formato_label">Formato de Impresora</InputLabel>
                    <Select
                      {...field}
                      label="tipo_formato de Impresora"
                      labelId="tipo_formato_label"
                      id="tipo_formato"
                      style={{
                        height: 43,
                      }}
                    >
                      <MenuItem value={1}>Comanda</MenuItem>
                      <MenuItem value={2}>Ticket</MenuItem>
                    </Select>
                  </>
                )}
              />
              {errors.tipo && (
                <FormHelperText sx={{ color: "red" }}>{errors.tipo.message}</FormHelperText>
              )}
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
      </form>
    </MainModal>
  );
}

ModalConfigPrinter.defaultProps = {
  printerList: [],
  data: [],
  handleSavePrinter: () => null,
  handleOnForceClose: () => null,
};

ModalConfigPrinter.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  printerList: PropTypes.instanceOf(Array),
  data: PropTypes.instanceOf(Array),
  handleSavePrinter: PropTypes.func,
  handleOnForceClose: PropTypes.func,
};
