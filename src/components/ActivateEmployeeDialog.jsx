import {
  Alert,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  Snackbar,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { activateEmployee, clearErrorActivatingEmployee } from "../redux/ducks/employeeDuck";


export default function ActivateEmployeeDialog(props) {
  const {
    handleSubmit,
    reset,
    clearErrors,
    register,
    formState: { errors },
  } = useForm();

  const { showActivateEmployeeDialog, closeActivateEmployeeDialog } = props;

  const dispatch = useDispatch();
  const [showSnackbarSuccess, setShowSnackbarSuccess] = useState(false);

  const showSnackbarFail = useSelector(
    (store) => store.employees.errorActivatingEmployee
  );

  const messageSnackbarFail = useSelector(
    (store) => store.employees.errorActivatingEmployeeMessage
  );

  const onSubmit = async (data) => {
    await dispatch(activateEmployee(data.cedula));

    if (!showSnackbarFail) {
      setShowSnackbarSuccess(true);
    }

    closeActivateEmployeeDialog();
    reset();
    clearErrors();
  };

  function closeSnackbar(snackbar, reason) {
    if (reason === "clickaway") {
      return;
    }

    if (snackbar === "success") {
      setShowSnackbarSuccess(false);
    } else {
      dispatch(clearErrorActivatingEmployee());
    }
  }

  return (
    <>
      <Grid container>
        <Dialog
          open={showActivateEmployeeDialog}
          onClose={() => {
            closeActivateEmployeeDialog();
            reset();
            clearErrors();
          }}
        >
          <DialogTitle>Activar empleado</DialogTitle>
          <DialogContent>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <Grid item xs={12} sx={{ marginY: 3 }}>
                <TextField
                  type="number"
                  autoFocus
                  required
                  label="Cédula"
                  name="cedula"
                  size="small"
                  {...register("cedula", {
                    required: {
                      value: true,
                      message: "Requerido",
                    },
                    minLength: {
                      value: 11,
                      message: "Debe introducir 11 caracteres",
                    },
                    maxLength: {
                      value: 11,
                      message: "Debe introducir 11 caracteres",
                    },
                  })}
                  error={errors.cedula}
                  helperText={errors.cedula && errors.cedula.message}
                />
              </Grid>
              <Grid item xs={12} sx={{ marginY: 3 }}>
                <Grid
                  container
                  direction="row"
                  justifyContent="space-around"
                  alignItems="center"
                >
                  <Grid item xs={5}>
                    <Button type="submit">Activar</Button>
                  </Grid>
                  <Grid item xs={5}>
                    <Button
                      onClick={() => {
                        closeActivateEmployeeDialog();
                        reset();
                        clearErrors();
                      }}
                    >
                      Cerrar
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </form>
          </DialogContent>
        </Dialog>
      </Grid>
      <Snackbar
        open={showSnackbarSuccess}
        autoHideDuration={3000}
        onClose={(event, reason) => closeSnackbar("success", reason)}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          Empleado activado!
        </Alert>
      </Snackbar>
      <Snackbar
        open={showSnackbarFail }
        autoHideDuration={3000}
        onClose={(event, reason) => closeSnackbar("fail", reason)}
      >
        <Alert severity="error" sx={{ width: "100%" }}>
          {showSnackbarFail && messageSnackbarFail}
        </Alert>
      </Snackbar>
    </>
  );
}
