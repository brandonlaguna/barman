import { useEffect } from "react";
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
import UploadImage from "components/MDUploadImage";
import { useProductController } from "context/productContext";
import { addProductAC, updateProductAC } from "context/action-creator/productsAC";
import { ModalItems } from "./style";

const schema = yup
  .object({
    articulo: yup.string().required(DEFAULTFORM.required),
    barras: yup.number().typeError(DEFAULTFORM.onlyNumber),
    referencia: yup.string().required(DEFAULTFORM.required),
    factor_venta: yup
      .number()
      .typeError(DEFAULTFORM.onlyNumber)
      .min(1, `${DEFAULTFORM.min} 1`)
      .required(DEFAULTFORM.required),
    total: yup
      .number()
      .typeError(DEFAULTFORM.onlyNumber)
      .min(1, `${DEFAULTFORM.min} 1`)
      .required(DEFAULTFORM.required),
    unidad: yup.string().min(1, DEFAULTFORM.selectItem).required(DEFAULTFORM.selectItem),
    fraccion: yup.string().min(1, DEFAULTFORM.selectItem).required(DEFAULTFORM.selectItem),
    precio_referencia: yup.string().min(1, DEFAULTFORM.selectItem).required(DEFAULTFORM.selectItem),
    venta_uno: yup.string().min(3, `${DEFAULTFORM.min} 3`).required(DEFAULTFORM.required),
    venta_dos: yup.string().min(3, `${DEFAULTFORM.min} 3`).required(DEFAULTFORM.required),
    venta_tres: yup.string().min(3, `${DEFAULTFORM.min} 3`).required(DEFAULTFORM.required),
    venta_detal_uno: yup.string().min(3, `${DEFAULTFORM.min} 3`).required(DEFAULTFORM.required),
    venta_detal_dos: yup.string().min(3, `${DEFAULTFORM.min} 3`).required(DEFAULTFORM.required),
    venta_detal_tres: yup.string().min(3, `${DEFAULTFORM.min} 3`).required(DEFAULTFORM.required),
    ubicacion: yup.string().min(1, DEFAULTFORM.selectItem).required(DEFAULTFORM.selectItem),
    temperatura: yup.number().typeError(DEFAULTFORM.onlyNumber),
    minimo: yup.number().typeError(DEFAULTFORM.onlyNumber),
    maximo: yup.number().typeError(DEFAULTFORM.onlyNumber),
    tipo_cantidad: yup.string().min(1, DEFAULTFORM.selectItem).required(DEFAULTFORM.selectItem),
    bonificacion: yup.number().typeError(DEFAULTFORM.onlyNumber),
    observaciones: yup.string().min(10, `${DEFAULTFORM.min} 10`),
    url_foto: yup.string(),
    usuario: yup.number(),
    iva: yup.number(),
    precio_costo: yup.string(),
    type_item_identification_id: yup.number(),
    unit_measures_unidad: yup.number(),
    unit_measures_fraccion: yup.number(),
    reference_price_id: yup.number(),
    materia_prima: yup.number(),
    id: yup.number(),
    activo: yup.number().required(DEFAULTFORM.required),
    fecha: yup.date(),
    hora: yup.string(),
  })
  .required();

export default function ModalItem({ isOpen, handleOnForceClose, data }) {
  // const [defaultData, setDefaultData] = useState({});

  const [controller] = useMaterialUIController();
  const [productController, productDispatch] = useProductController();
  const { isLoadingProducts } = productController;

  // context methods
  const { darkMode, sidenavColor } = controller;
  const active = true;

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });
  const onSubmit = (handleData) => {
    if (handleData) {
      if (handleData.id) {
        updateProductAC(productDispatch, handleData);
      } else {
        addProductAC(productDispatch, handleData);
      }
    }
  };

  useEffect(() => {
    if (data) {
      setValue("id", data.id);
      setValue("articulo", data.articulo);
      setValue("barras", data.barras);
      setValue("referencia", data.referencia);
      setValue("factor_venta", data.factor_venta);
      setValue("total", data.total);
      setValue("unidad", data.unidad);
      setValue("fraccion", data.fraccion);
      setValue("precio_referencia", data.reference_price_id);
      setValue("venta_uno", data.venta_uno);
      setValue("venta_dos", data.venta_dos);
      setValue("venta_tres", data.venta_tres);
      setValue("venta_detal_uno", data.venta_detal_uno);
      setValue("venta_detal_dos", data.venta_detal_dos);
      setValue("venta_detal_tres", data.venta_detal_tres);
      setValue("ubicacion", data.ubicacion);
      setValue("minimo", data.minimo);
      setValue("maximo", data.maximo);
      setValue("tipo_cantidad", data.tipo_cantidad);
      setValue("bonificacion", data.bonificacion);
      setValue("observaciones", data.observaciones);
      setValue("usuario", 2);
      setValue("iva", 1);
      setValue("precio_costo", data.venta_uno);
      setValue("type_item_identification_id", 1);
      setValue("unit_measures_unidad", 1);
      setValue("unit_measures_fraccion", 1);
      setValue("materia_prima", 1);
      setValue("reference_price_id", data.reference_price_id);
      setValue("activo", data.activo);
      // setValue("fecha", data.fecha);
      // setValue("hora", data.hora);
    }
  }, [data]);

  useEffect(() => {
    console.log(isLoadingProducts);
  }, [isLoadingProducts]);

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
          scrollY: "auto",
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
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={3} md={3}>
                <UploadImage onSelectImage={(e) => setValue("url_foto", e)} />
                {errors.url_foto && (
                  <FormHelperText sx={{ color: "red" }}>{errors.url_foto.message}</FormHelperText>
                )}
              </Grid>
              <Grid item xs={12} sm={9} md={9}>
                <Grid container spacing={1}>
                  <Grid item xs={12} sm={6} md={6} lg={4}>
                    <FormControl fullWidth sx={{ mb: 1, mt: 1 }}>
                      <Controller
                        name="articulo"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            label="Articulo*"
                            placeholder=""
                            error={Boolean(errors.articulo)}
                            onChange={(e) => field.onChange(onlyLetters(e.target.value))}
                          />
                        )}
                      />
                      {errors.articulo && (
                        <FormHelperText sx={{ color: "red" }}>
                          {errors.articulo.message}
                        </FormHelperText>
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
                            label="Codigo de Barras"
                            placeholder=""
                            error={Boolean(errors.barras)}
                            onChange={(e) => field.onChange(onlyNumbers(e.target.value))}
                          />
                        )}
                      />
                      {errors.barras && (
                        <FormHelperText sx={{ color: "red" }}>
                          {errors.barras.message}
                        </FormHelperText>
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
                            label="Referencia*"
                            placeholder=""
                            error={Boolean(errors.referencia)}
                            onChange={(e) => field.onChange(onlyLetters(e.target.value))}
                          />
                        )}
                      />
                      {errors.referencia && (
                        <FormHelperText sx={{ color: "red" }}>
                          {errors.referencia.message}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6} md={2} lg={2}>
                    <FormControl fullWidth sx={{ mb: 1, mt: 1 }}>
                      <Controller
                        name="factor_venta"
                        control={control}
                        rules={{ required: false }}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            label="Factor*"
                            placeholder=""
                            error={Boolean(errors.factor_venta)}
                            onChange={(e) => field.onChange(onlyNumbers(e.target.value))}
                          />
                        )}
                      />
                      {errors.factor_venta && (
                        <FormHelperText sx={{ color: "red" }}>
                          {errors.factor_venta.message}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6} md={2} lg={2}>
                    <FormControl fullWidth sx={{ mb: 1, mt: 1 }}>
                      <Controller
                        name="total"
                        control={control}
                        rules={{ required: false }}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            label="Cantidad Total*"
                            placeholder=""
                            error={Boolean(errors.total)}
                            onChange={(e) => field.onChange(onlyNumbers(e.target.value))}
                          />
                        )}
                      />
                      {errors.total && (
                        <FormHelperText sx={{ color: "red" }}>
                          {errors.total.message}
                        </FormHelperText>
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
                              <MenuItem value={642}>Cada</MenuItem>
                            </Select>
                          </>
                        )}
                      />
                      {errors.unidad && (
                        <FormHelperText sx={{ color: "red" }}>
                          {errors.unidad.message}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={4} md={4} lg={4}>
                    <FormControl fullWidth sx={{ mb: 1, mt: 1 }}>
                      <Controller
                        name="fraccion"
                        control={control}
                        rules={{ required: false }}
                        render={({ field }) => (
                          <>
                            <InputLabel id="fraccion_label">Fraccion de Medida*</InputLabel>
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
                              <MenuItem value={70}>Cada</MenuItem>
                            </Select>
                          </>
                        )}
                      />
                      {errors.fraccion && (
                        <FormHelperText sx={{ color: "red" }}>
                          {errors.fraccion.message}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={4} md={4} lg={4}>
                    <FormControl fullWidth sx={{ mb: 1, mt: 1 }}>
                      <Controller
                        name="precio_referencia"
                        control={control}
                        rules={{ required: false }}
                        render={({ field }) => (
                          <>
                            <InputLabel id="precio_referencia_label">
                              Precio de Referencia*
                            </InputLabel>
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
                              <MenuItem value={1}>Cada</MenuItem>
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
                  <Grid item xs={12} sm={4} md={4} lg={4}>
                    <FormControl fullWidth sx={{ mb: 1, mt: 1 }}>
                      <Controller
                        name="venta_uno"
                        control={control}
                        rules={{ required: false }}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            label="Precio Venta 1*"
                            placeholder=""
                            error={Boolean(errors.venta_uno)}
                            onChange={(e) => field.onChange(e.target.value)}
                          />
                        )}
                      />
                      {errors.venta_uno && (
                        <FormHelperText sx={{ color: "red" }}>
                          {errors.venta_uno.message}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={3} md={3} lg={3}>
            <FormControl fullWidth sx={{ mb: 1, mt: 1 }}>
              <Controller
                name="venta_dos"
                control={control}
                rules={{ required: false }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Precio Venta 2*"
                    placeholder=""
                    error={Boolean(errors.venta_dos)}
                    onChange={(e) => field.onChange(e.target.value)}
                  />
                )}
              />
              {errors.venta_dos && (
                <FormHelperText sx={{ color: "red" }}>{errors.venta_dos.message}</FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={3} md={3} lg={3}>
            <FormControl fullWidth sx={{ mb: 1, mt: 1 }}>
              <Controller
                name="venta_tres"
                control={control}
                rules={{ required: false }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Precio Venta 3*"
                    placeholder=""
                    error={Boolean(errors.venta_tres)}
                    onChange={(e) => field.onChange(e.target.value)}
                  />
                )}
              />
              {errors.venta_tres && (
                <FormHelperText sx={{ color: "red" }}>{errors.venta_tres.message}</FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={3} md={3} lg={3}>
            <FormControl fullWidth sx={{ mb: 1, mt: 1 }}>
              <Controller
                name="venta_detal_uno"
                control={control}
                rules={{ required: false }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Precio Venta 1 al Detal*"
                    placeholder=""
                    error={Boolean(errors.venta_detal_uno)}
                    onChange={(e) => field.onChange(e.target.value)}
                  />
                )}
              />
              {errors.venta_detal_uno && (
                <FormHelperText sx={{ color: "red" }}>
                  {errors.venta_detal_uno.message}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={3} md={3} lg={3}>
            <FormControl fullWidth sx={{ mb: 1, mt: 1 }}>
              <Controller
                name="venta_detal_dos"
                control={control}
                rules={{ required: false }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Precio Venta 2 al Detal*"
                    placeholder=""
                    error={Boolean(errors.venta_detal_dos)}
                    onChange={(e) => field.onChange(e.target.value)}
                  />
                )}
              />
              {errors.venta_detal_dos && (
                <FormHelperText sx={{ color: "red" }}>
                  {errors.venta_detal_dos.message}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={3} md={3} lg={3}>
            <FormControl fullWidth sx={{ mb: 1, mt: 1 }}>
              <Controller
                name="venta_detal_tres"
                control={control}
                rules={{ required: false }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Precio Venta 3 al Detal*"
                    placeholder=""
                    error={Boolean(errors.venta_detal_tres)}
                    onChange={(e) => field.onChange(e.target.value)}
                  />
                )}
              />
              {errors.venta_detal_tres && (
                <FormHelperText sx={{ color: "red" }}>
                  {errors.venta_detal_tres.message}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={3} md={3} lg={3}>
            <FormControl fullWidth sx={{ mb: 1, mt: 1 }}>
              <Controller
                name="ubicacion"
                control={control}
                rules={{ required: false }}
                render={({ field }) => (
                  <>
                    <InputLabel id="ubicacion_label">Ubicación*</InputLabel>
                    <Select
                      {...field}
                      label="Ubicación"
                      labelId="ubicacion_label"
                      id="ubicacion"
                      defaultValue=""
                      style={{
                        height: 43,
                      }}
                    >
                      <MenuItem value={4}>Cada</MenuItem>
                    </Select>
                  </>
                )}
              />
              {errors.ubicacion && (
                <FormHelperText sx={{ color: "red" }}>{errors.ubicacion.message}</FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={2} md={2} lg={2}>
            <FormControl fullWidth sx={{ mb: 1, mt: 1 }}>
              <Controller
                name="temperatura"
                control={control}
                rules={{ required: false }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Temperatura"
                    placeholder=""
                    error={Boolean(errors.temperatura)}
                    onChange={(e) => field.onChange(onlyNumbers(e.target.value))}
                  />
                )}
              />
              {errors.temperatura && (
                <FormHelperText sx={{ color: "red" }}>{errors.temperatura.message}</FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={2} md={2} lg={2}>
            <FormControl fullWidth sx={{ mb: 1, mt: 1 }}>
              <Controller
                name="minimo"
                control={control}
                rules={{ required: false }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Stock Minimo"
                    placeholder=""
                    error={Boolean(errors.minimo)}
                    onChange={(e) => field.onChange(onlyNumbers(e.target.value))}
                  />
                )}
              />
              {errors.minimo && (
                <FormHelperText sx={{ color: "red" }}>{errors.minimo.message}</FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={2} md={2} lg={2}>
            <FormControl fullWidth sx={{ mb: 1, mt: 1 }}>
              <Controller
                name="maximo"
                control={control}
                rules={{ required: false }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Stock Máximo"
                    placeholder=""
                    error={Boolean(errors.maximo)}
                    onChange={(e) => field.onChange(onlyNumbers(e.target.value))}
                  />
                )}
              />
              {errors.maximo && (
                <FormHelperText sx={{ color: "red" }}>{errors.maximo.message}</FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={3} md={3} lg={3}>
            <FormControl fullWidth sx={{ mb: 1, mt: 1 }}>
              <Controller
                name="tipo_cantidad"
                control={control}
                rules={{ required: false }}
                render={({ field }) => (
                  <>
                    <InputLabel id="tipo_cantidad_label">Cantidad por Defecto*</InputLabel>
                    <Select
                      {...field}
                      label="Cantidad por Defecto"
                      labelId="tipo_cantidad_label"
                      id="tipo_cantidad"
                      defaultValue=""
                      style={{
                        height: 43,
                      }}
                    >
                      <MenuItem value={1}>Por Defecto</MenuItem>
                      <MenuItem value={2}>Peso Báscula</MenuItem>
                    </Select>
                  </>
                )}
              />
              {errors.cantidad_defecto && (
                <FormHelperText sx={{ color: "red" }}>
                  {errors.cantidad_defecto.message}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={3} md={3} lg={3}>
            <FormControl fullWidth sx={{ mb: 1, mt: 1 }}>
              <Controller
                name="bonificacion"
                control={control}
                rules={{ required: false }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Porcentaje de Bonificación"
                    placeholder=""
                    error={Boolean(errors.bonificacion)}
                    onChange={(e) => field.onChange(onlyNumbers(e.target.value))}
                  />
                )}
              />
              {errors.bonificacion && (
                <FormHelperText sx={{ color: "red" }}>{errors.bonificacion.message}</FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4} md={4} lg={4}>
            <FormControl fullWidth sx={{ mb: 1, mt: 1 }}>
              <Controller
                name="activo"
                control={control}
                rules={{ required: false }}
                render={({ field }) => (
                  <>
                    <InputLabel id="activo_label">Estado*</InputLabel>
                    <Select
                      {...field}
                      label="Estado"
                      labelId="activo_label"
                      id="activo"
                      defaultValue=""
                      style={{
                        height: 43,
                      }}
                    >
                      <MenuItem value={1}>Activo</MenuItem>
                      <MenuItem value={0}>Inactivo</MenuItem>
                    </Select>
                  </>
                )}
              />
              {errors.activo && (
                <FormHelperText sx={{ color: "red" }}>{errors.activo.message}</FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={12} md={9} lg={9}>
            <FormControl fullWidth sx={{ mb: 1, mt: 1 }}>
              <Controller
                name="observaciones"
                control={control}
                rules={{ required: false }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Observaciones"
                    placeholder=""
                    error={Boolean(errors.observaciones)}
                    onChange={(e) => field.onChange(onlyLetters(e.target.value))}
                  />
                )}
              />
              {errors.observaciones && (
                <FormHelperText sx={{ color: "red" }}>
                  {errors.observaciones.message}
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
