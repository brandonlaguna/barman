import { useState, useEffect } from "react";
import { Box, Grid } from "@mui/material";
import { BANK_ICONS } from "config/contants";
import MDInput from "components/MDInput";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import { cancelOrder } from "services/transactionServices";
import MenuItem from "@mui/material/MenuItem";
import MDButton from "components/MDButton";
import MDBox from "components/MDBox";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { useBarCartController, clean } from "context/barCartContext";
import { useForm, Controller } from "react-hook-form";
import { useMaterialUIController } from "context";
import MainModal from "components/MDModales";
import { ModalUserAuthorizationStyle } from "../../style";
import "../../style.css";

export default function ModalUserAuthorization({ isOpen, handleOnForceClose, dataUser }) {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      supervisor_anular: "",
      contrase_anular: "",
      mesa: 0,
    },
  });
  const [controller] = useMaterialUIController();
  const [controllerBar, dispatchBar] = useBarCartController();
  // context methods
  const { darkMode, sidenavColor } = controller;
  const { tableSelected } = controllerBar;
  const active = true;
  const [supervisorAnular, setSupervisorAnular] = useState("");
  const [listUsers, setListUsers] = useState([]);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const handleChange = (event) => {
    setSupervisorAnular(event.target.value);
  };

  const onSubmitAuth = (credentials) => {
    cancelOrder({ ...credentials, mesa: tableSelected }).then((response) => {
      const { data } = response;
      if (data.status) {
        toast.success(data.message);
        clean(dispatchBar, true);
        setIsOpenModal(false);
      } else {
        toast.error(data.message);
      }
    });
  };

  useEffect(() => {
    setListUsers(dataUser);
  }, [dataUser]);

  useEffect(() => {
    setIsOpenModal(isOpen);
  }, [isOpen]);
  // ${BANK_ICONS}/interface/secure-access.png 210
  return (
    <MainModal
      key={2}
      isOpen={isOpenModal}
      onForceClose={handleOnForceClose}
      modalStyle={(theme) =>
        ModalUserAuthorizationStyle(theme, {
          darkMode,
          sidenavColor,
          active,
          scrollY: "scroll",
        })
      }
    >
      <Grid container>
        <Grid item xs={12} sm={12} md={12}>
          <div className="image-container">
            <img
              src={`${BANK_ICONS}/interface/secure-access.png`}
              alt="secure access"
              width={210}
              style={{
                alignSelf: "center",
              }}
            />
          </div>
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <MDBox
            component="form"
            role="form"
            onSubmit={handleSubmit(onSubmitAuth)}
            style={{
              width: "100%",
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={12}>
                <Box sx={{ width: "100%" }}>
                  <Controller
                    name="supervisor_anular"
                    control={control}
                    rules={{ required: "El nombre de usuario es requerido" }}
                    render={({ field }) => (
                      <>
                        <InputLabel id="label-supervisor_anular">Administrador</InputLabel>
                        <Select
                          labelId="label-supervisor_anular"
                          id="supervisor_anular"
                          name="supervisor_anular"
                          value={supervisorAnular}
                          label="Administrador"
                          onChange={handleChange}
                          style={{
                            width: "100%",
                            height: "40px",
                            fontSize: "16px",
                          }}
                          {...field}
                        >
                          {listUsers.map((u) => (
                            <MenuItem value={u.id}>
                              {u.first_name} {u.surname}
                            </MenuItem>
                          ))}
                        </Select>
                      </>
                    )}
                  />
                  {errors.supervisor_anular && (
                    <p className="invalid-feedback">{errors.supervisor_anular.message}</p>
                  )}
                </Box>
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                <Box sx={{ width: "100%" }}>
                  <Controller
                    name="contrase_anular"
                    control={control}
                    rules={{ required: "La contraseña es requerida" }}
                    render={({ field }) => (
                      <MDInput
                        type="password"
                        label="Password"
                        fullWidth
                        invalid={
                          errors.contrase_anular != null ? errors.contrase_anular : undefined
                        }
                        {...field}
                      />
                    )}
                  />
                  {errors.contrase_anular && (
                    <p className="invalid-feedback">{errors.contrase_anular.message}</p>
                  )}
                </Box>
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                <MDButton type="submit" variant="gradient" color="info" fullWidth>
                  Anular
                </MDButton>
              </Grid>
            </Grid>
          </MDBox>
        </Grid>
      </Grid>
    </MainModal>
  );
}

ModalUserAuthorization.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  dataUser: PropTypes.number.isRequired,
  handleOnForceClose: PropTypes.func.isRequired,
};
