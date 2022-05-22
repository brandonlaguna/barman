import { useState } from "react";
import useUser from "hooks/useUser";
// react-router-dom components
import { Link, useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";
import MuiLink from "@mui/material/Link";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";

// Silpos Barman React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";

function Basic() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      user: "",
      password: "",
    },
  });

  const navigate = useNavigate();
  const { login } = useUser();
  const [rememberMe, setRememberMe] = useState(false);

  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  const notify = (message) => {
    toast(message, {
      type: "error",
      position: "bottom-right",
    });
  };

  const onSubmitLogin = (credentials) => {
    login(credentials)
      .then(() => navigate("/sync_server"))
      .catch(notify);
  };

  return (
    <BasicLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Iniciar sesion
          </MDTypography>
          <Grid container spacing={3} justifyContent="center" sx={{ mt: 1, mb: 2 }}>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <FacebookIcon color="inherit" />
              </MDTypography>
            </Grid>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <GitHubIcon color="inherit" />
              </MDTypography>
            </Grid>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <GoogleIcon color="inherit" />
              </MDTypography>
            </Grid>
          </Grid>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form" onSubmit={handleSubmit(onSubmitLogin)}>
            <MDBox mb={2}>
              <Controller
                name="user"
                control={control}
                rules={{ required: "El campo Email es requerido" }}
                render={({ field }) => (
                  <MDInput
                    type="email"
                    label="Email"
                    fullWidth
                    invalid={errors.user != null ? errors.user : undefined}
                    {...field}
                  />
                )}
              />
              {errors.email && <span className="invalid-feedback">{errors.email.message}</span>}
            </MDBox>
            <MDBox mb={2}>
              <Controller
                name="password"
                control={control}
                rules={{ required: "El campo password es requerido" }}
                render={({ field }) => (
                  <MDInput
                    type="password"
                    label="Password"
                    fullWidth
                    invalid={errors.password != null ? errors.password : undefined}
                    {...field}
                  />
                )}
              />
              {errors.password && (
                <span className="invalid-feedback">{errors.password.message}</span>
              )}
            </MDBox>
            <MDBox display="flex" alignItems="center" ml={-1}>
              <Switch checked={rememberMe} onChange={handleSetRememberMe} />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                onClick={handleSetRememberMe}
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;Remember me
              </MDTypography>
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton type="submit" variant="gradient" color="info" fullWidth>
                Iniciar
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                No tienes una cuenta?{" "}
                <MDTypography
                  component={Link}
                  to="/authentication/sign-up"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Crear
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default Basic;
