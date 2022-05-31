import { useState, useEffect } from "react";
import { Grid, TextField, InputAdornment, Typography } from "@mui/material";
import PropTypes from "prop-types";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import BadgeIcon from "@mui/icons-material/Badge";
import DomainAddIcon from "@mui/icons-material/DomainAdd";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import SaveButton from "./SaveButton";

const schema = yup
  .object({
    nombres: yup.string().required(),
    apellidos: yup.string().required(),
    razon_social: yup.string().notRequired(),
    documento: yup.number().positive().integer().required(),
    telefonos: yup.number().positive().integer().required(),
    direccion: yup.string().notRequired(),
    observaciones: yup.string().notRequired(),
  })
  .required();

export default function ClientForm({ dataClient, isSend, clearForm }) {
  const [isLoadingForm, setIsLoadingForm] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data) => {
    dataClient(data);
    setIsLoadingForm(true);
  };

  useEffect(() => {
    if (isSend) {
      setIsLoadingForm(false);
    }
    console.log(`es enviado? ${isSend} carga? ${isSend}`);
  }, [isSend]);

  useEffect(() => {
    console.log("limpiar");
  }, [clearForm]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2} style={{ padding: "7px" }}>
        <Grid item xs={12} sm={6} md={6} lg={6}>
          <TextField
            id="inputNombres"
            label="Nombres"
            fullWidth
            InputProps={{
              ...register("nombres"),
              startAdornment: (
                <InputAdornment position="start">
                  <AssignmentIndIcon />
                </InputAdornment>
              ),
            }}
            variant="standard"
          />
          <Typography variant="caption" display="block" gutterBottom style={{ color: "red" }}>
            {errors.nombres?.message}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={6}>
          <TextField
            id="inputApellidos"
            label="Apellidos"
            fullWidth
            InputProps={{
              ...register("apellidos"),
              startAdornment: (
                <InputAdornment position="start">
                  <AssignmentIndIcon />
                </InputAdornment>
              ),
            }}
            variant="standard"
          />
          <Typography variant="caption" display="block" gutterBottom style={{ color: "red" }}>
            {errors.apellidos?.message}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={6}>
          <TextField
            id="inputDocumento"
            label="Documento"
            fullWidth
            InputProps={{
              ...register("documento"),
              startAdornment: (
                <InputAdornment position="start">
                  <BadgeIcon />
                </InputAdornment>
              ),
            }}
            variant="standard"
          />
          <Typography variant="caption" display="block" gutterBottom style={{ color: "red" }}>
            {errors.documento?.message}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={6}>
          <TextField
            id="inputRazonSocial"
            label="Razon Social"
            fullWidth
            InputProps={{
              ...register("razon_social"),
              startAdornment: (
                <InputAdornment position="start">
                  <DomainAddIcon />
                </InputAdornment>
              ),
            }}
            variant="standard"
          />
          <Typography variant="caption" display="block" gutterBottom style={{ color: "red" }}>
            {errors.razon_social?.message}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={6}>
          <TextField
            id="inputTelefono"
            label="Telefono"
            fullWidth
            InputProps={{
              ...register("telefonos"),
              startAdornment: (
                <InputAdornment position="start">
                  <ContactPhoneIcon />
                </InputAdornment>
              ),
            }}
            variant="standard"
          />
          <Typography variant="caption" display="block" gutterBottom style={{ color: "red" }}>
            {errors.telefonos?.message}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={6}>
          <TextField
            id="inputDireccion"
            label="Direccion"
            fullWidth
            InputProps={{
              ...register("direccion"),
              startAdornment: (
                <InputAdornment position="start">
                  <LocationOnIcon />
                </InputAdornment>
              ),
            }}
            variant="standard"
          />
          <Typography variant="caption" display="block" gutterBottom style={{ color: "red" }}>
            {errors.direccion?.message}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="inputObservacion"
            label="Observacion"
            fullWidth
            InputProps={{
              ...register("observaciones"),
              startAdornment: (
                <InputAdornment position="start">
                  <BookmarkAddIcon />
                </InputAdornment>
              ),
            }}
            variant="standard"
          />
          <Typography variant="caption" display="block" gutterBottom style={{ color: "red" }}>
            {errors.observaciones?.message}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <div style={{ width: "100%", textAlign: "center" }}>
            <SaveButton type="submit" isLoading={isLoadingForm} />
          </div>
        </Grid>
      </Grid>
    </form>
  );
}

ClientForm.defaultProps = {
  isSend: false,
  clearForm: false,
};

ClientForm.propTypes = {
  dataClient: PropTypes.func.isRequired,
  isSend: PropTypes.bool,
  clearForm: PropTypes.bool,
};
