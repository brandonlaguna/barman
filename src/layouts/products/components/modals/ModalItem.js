import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import { useForm, Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import InputLabel from "@mui/material/InputLabel";
import { MenuItem, Select } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useMaterialUIController } from "context";
import MainModal from "components/MDModales";
import DEFAULTFORM from "config/defaultMessages";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { onlyLetters, onlyNumbers } from "utils/mask";
import ModalItems from "./style";

const schema = yup
  .object({
    articulo: yup.string().required(DEFAULTFORM.required),
    barras: yup.number().typeError(DEFAULTFORM.onlyNumber),
    referencia: yup.string().required(DEFAULTFORM.required),
    descripcion: yup.string().required(DEFAULTFORM.required),
    factor_venta: yup
      .number()
      .typeError(DEFAULTFORM.onlyNumber)
      .min(1, `${DEFAULTFORM.min} 1`)
      .required(DEFAULTFORM.required),
    cantidad: yup
      .number()
      .typeError(DEFAULTFORM.onlyNumber)
      .min(1, `${DEFAULTFORM.min} 1`)
      .required(DEFAULTFORM.required),
    unidad: yup.string().min(1, DEFAULTFORM.selectItem).required(DEFAULTFORM.selectItem),
    fraccion: yup.string().min(1, DEFAULTFORM.selectItem).required(DEFAULTFORM.selectItem),
    precio_referencia: yup.string().min(1, DEFAULTFORM.selectItem).required(DEFAULTFORM.selectItem),
    precio_venta_1: yup.string().min(3, `${DEFAULTFORM.min} 3`).required(DEFAULTFORM.required),
    precio_venta_2: yup.string().min(3, `${DEFAULTFORM.min} 3`).required(DEFAULTFORM.required),
    precio_venta_3: yup.string().min(3, `${DEFAULTFORM.min} 3`).required(DEFAULTFORM.required),
  })
  .required();

export default function ModalItem({ isOpen, handleOnForceClose, data }) {
  const [defaultData, setDefaultData] = useState({});

  const [controller] = useMaterialUIController();
  // context methods
  const { darkMode, sidenavColor } = controller;
  const active = true;

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onBlur",
    defaultValues: {
      articulo: defaultData?.articulo,
    },
  });
  const onSubmit = (handleData) => console.log(handleData);

  useEffect(() => {
    setDefaultData(data);
  }, [data]);

  return (
    <MainModal
      key={2}
      isOpen={isOpen}
      onForceClose={handleOnForceClose}
      modalStyle={(theme) =>
        ModalItems(theme, {
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
          }}
        >
          <Grid item xs={12} sm={6} md={6} lg={4}>
            <FormControl fullWidth sx={{ mb: 1, mt: 1 }}>
              <Controller
                name="articulo"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    autoFocus
                    label="Articulo*"
                    placeholder=""
                    error={Boolean(errors.articulo)}
                    onChange={(e) => field.onChange(onlyLetters(e.target.value))}
                  />
                )}
              />
              {errors.articulo && (
                <FormHelperText sx={{ color: "red" }}>{errors.articulo.message}</FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={4}>
            <FormControl fullWidth sx={{ mb: 1, mt: 1 }}>
              <Controller
                name="barras"
                control={control}
                rules={{ required: false }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    autoFocus
                    label="Codigo de Barras"
                    placeholder=""
                    error={Boolean(errors.barras)}
                    onChange={(e) => field.onChange(onlyNumbers(e.target.value))}
                  />
                )}
              />
              {errors.barras && (
                <FormHelperText sx={{ color: "red" }}>{errors.barras.message}</FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={4}>
            <FormControl fullWidth sx={{ mb: 1, mt: 1 }}>
              <Controller
                name="referencia"
                control={control}
                rules={{ required: false }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    autoFocus
                    label="Referencia"
                    placeholder=""
                    error={Boolean(errors.referencia)}
                    onChange={(e) => field.onChange(onlyLetters(e.target.value))}
                  />
                )}
              />
              {errors.referencia && (
                <FormHelperText sx={{ color: "red" }}>{errors.referencia.message}</FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={4}>
            <FormControl fullWidth sx={{ mb: 1, mt: 1 }}>
              <Controller
                name="descripcion"
                control={control}
                rules={{ required: false }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    autoFocus
                    label="Descripcion"
                    placeholder=""
                    error={Boolean(errors.descripcion)}
                    onChange={(e) => field.onChange(onlyLetters(e.target.value))}
                  />
                )}
              />
              {errors.descripcion && (
                <FormHelperText sx={{ color: "red" }}>{errors.descripcion.message}</FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={3} md={3} lg={3}>
            <FormControl fullWidth sx={{ mb: 1, mt: 1 }}>
              <Controller
                name="factor_venta"
                control={control}
                rules={{ required: false }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    autoFocus
                    label="Factor"
                    placeholder=""
                    error={Boolean(errors.factor_venta)}
                    onChange={(e) => field.onChange(onlyNumbers(e.target.value))}
                  />
                )}
              />
              {errors.factor_venta && (
                <FormHelperText sx={{ color: "red" }}>{errors.factor_venta.message}</FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={2} md={2} lg={2}>
            <FormControl fullWidth sx={{ mb: 1, mt: 1 }}>
              <Controller
                name="cantidad"
                control={control}
                rules={{ required: false }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    autoFocus
                    label="Cantidad Total"
                    placeholder=""
                    error={Boolean(errors.cantidad)}
                    onChange={(e) => field.onChange(onlyNumbers(e.target.value))}
                  />
                )}
              />
              {errors.cantidad && (
                <FormHelperText sx={{ color: "red" }}>{errors.cantidad.message}</FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={3} md={3} lg={3}>
            <FormControl fullWidth sx={{ mb: 1, mt: 1 }}>
              <Controller
                name="unidad"
                control={control}
                rules={{ required: false }}
                render={({ field }) => (
                  <>
                    <InputLabel id="unidad_label">Unidad de Medida</InputLabel>
                    <Select
                      {...field}
                      label="Unidad de medida"
                      labelId="unidad_label"
                      id="unidad"
                      defaultValue=""
                      style={{
                        height: 43,
                      }}
                    >
                      <MenuItem value="cada">Cada</MenuItem>
                    </Select>
                  </>
                )}
              />
              {errors.unidad && (
                <FormHelperText sx={{ color: "red" }}>{errors.unidad.message}</FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={3} md={3} lg={3}>
            <FormControl fullWidth sx={{ mb: 1, mt: 1 }}>
              <Controller
                name="fraccion"
                control={control}
                rules={{ required: false }}
                render={({ field }) => (
                  <>
                    <InputLabel id="fraccion_label">Fraccion de Medida</InputLabel>
                    <Select
                      {...field}
                      label="Fraccion de Medida"
                      labelId="fraccion_label"
                      id="fraccion"
                      defaultValue=""
                      style={{
                        height: 43,
                      }}
                    >
                      <MenuItem value="cada">Cada</MenuItem>
                    </Select>
                  </>
                )}
              />
              {errors.fraccion && (
                <FormHelperText sx={{ color: "red" }}>{errors.fraccion.message}</FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={3} md={3} lg={3}>
            <FormControl fullWidth sx={{ mb: 1, mt: 1 }}>
              <Controller
                name="precio_referencia"
                control={control}
                rules={{ required: false }}
                render={({ field }) => (
                  <>
                    <InputLabel id="precio_referencia_label">Precio de Referencia</InputLabel>
                    <Select
                      {...field}
                      label="Precio de Referencia"
                      labelId="precio_referencia_label"
                      id="precio_referencia"
                      defaultValue=""
                      style={{
                        height: 43,
                      }}
                    >
                      <MenuItem value="cada">Cada</MenuItem>
                    </Select>
                  </>
                )}
              />
              {errors.precio_referencia && (
                <FormHelperText sx={{ color: "red" }}>
                  {errors.precio_referencia.message}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={3} md={3} lg={3}>
            <FormControl fullWidth sx={{ mb: 1, mt: 1 }}>
              <Controller
                name="precio_venta_1"
                control={control}
                rules={{ required: false }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    autoFocus
                    label="Precio Venta 1"
                    placeholder=""
                    error={Boolean(errors.precio_venta_1)}
                    onChange={(e) => field.onChange(e.target.value)}
                  />
                )}
              />
              {errors.precio_venta_1 && (
                <FormHelperText sx={{ color: "red" }}>
                  {errors.precio_venta_1.message}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={3} md={3} lg={3}>
            <FormControl fullWidth sx={{ mb: 1, mt: 1 }}>
              <Controller
                name="precio_venta_2"
                control={control}
                rules={{ required: false }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    autoFocus
                    label="Precio Venta 2"
                    placeholder=""
                    error={Boolean(errors.precio_venta_2)}
                    onChange={(e) => field.onChange(e.target.value)}
                  />
                )}
              />
              {errors.precio_venta_2 && (
                <FormHelperText sx={{ color: "red" }}>
                  {errors.precio_venta_2.message}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={3} md={3} lg={3}>
            <FormControl fullWidth sx={{ mb: 1, mt: 1 }}>
              <Controller
                name="precio_venta_3"
                control={control}
                rules={{ required: false }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    autoFocus
                    label="Precio Venta 3"
                    placeholder=""
                    error={Boolean(errors.precio_venta_3)}
                    onChange={(e) => field.onChange(e.target.value)}
                  />
                )}
              />
              {errors.precio_venta_3 && (
                <FormHelperText sx={{ color: "red" }}>
                  {errors.precio_venta_3.message}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <FormControl fullWidth sx={{ mb: 1, mt: 1 }}>
              <LoadingButton
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                sx={{ mb: 2 }}
                disabled={!isValid}
                loading={false}
              >
                <p style={{ color: "white" }}>Guardar</p>
              </LoadingButton>
            </FormControl>
          </Grid>
        </Grid>
      </form>
    </MainModal>
  );
}

ModalItem.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  data: PropTypes.number.isRequired,
  handleOnForceClose: PropTypes.func.isRequired,
};
