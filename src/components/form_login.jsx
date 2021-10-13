import React from "react";
import { Button, Grid, TextField, Typography, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/ducks/authDuck.js";
import { Alert } from "@mui/material";
import { Redirect } from "react-router";

export function FormLogin(props) {
  
  const {changeMenuAndAppBarVisibility} = props;
  const classes = useStyles();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const dispatch = useDispatch();
  const onSubmit = (data) => {
    dispatch(loginUser(data.username, data.password, changeMenuAndAppBarVisibility));
  };

  const loginFail = useSelector((store) => store.auth.loginFail);
  const isLogged = useSelector((store) => store.auth.isLogged);
  return (
    <div className={classes.container}>
      <Box
        component="form"
        noValidate
        className={classes.center_container}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Grid container alignItems="center" justifyContent="center" spacing={2}>
          <Grid item xs={12}>
            <AccountCircleIcon style={{ fontSize: 100 }} />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h1" className={classes.top_title}>
              Iniciar sesión
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              autoFocus
              helperText={errors.username && "Nombre de usuario requerido"}
              error={errors.username}
              className={classes.entry}
              variant="outlined"
              name="username"
              label="Nombre de usuario"
              fullWidth
              {...register("username", {
                required: true,
              })}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              className={classes.entry}
              variant="outlined"
              label="Contraseña"
              name="password"
              required
              fullWidth
              type="password"
              {...register("password", {
                required: true,
              })}
              helperText={errors.password && "Contraseña requerida"}
              error={errors.password}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Login
            </Button>
          </Grid>
          {loginFail && (
            <Grid item xs={12}>
              <Alert severity="error"
                fullWidth sx={{textAlign: "center"}}
              >
                Nombre de usuario y/o contraseña incorrecta
              </Alert>
            </Grid>
          )}
          {isLogged && <Redirect to='/Employees'/>}
        </Grid>
      </Box>
    </div>
  );
}

const useStyles = makeStyles({
  container: {
    display: "flex",
    height: 500,
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
  },
  center_container: {width: 300 },
  top_title: {
    fontSize: "2rem",
    marginBottom: 10
  }
});
