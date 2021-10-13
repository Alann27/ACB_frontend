import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  Snackbar,
  Alert,
} from "@mui/material";
import { useForm } from "react-hook-form";
import {
  addEmployeeType,
  clearErrorAddingNewEmployeeType,
} from "../redux/ducks/employeeTypeDuck.js";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

export default function AddEmployeeTypeDialog(props) {
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
    clearErrors,
  } = useForm();

  const dispatch = useDispatch();
  const [showSnackbarSuccess, setShowSnackbarSuccess] = useState(false);

  const showSnackbarFail = useSelector(
    (store) => store.employeeTypes.errorAddingNewEmployeeType
  );

  const onSubmit = async (data) => {
      await dispatch(addEmployeeType(data));

      if (!showSnackbarFail){
        setShowSnackbarSuccess(true);
      }
      
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
      dispatch(clearErrorAddingNewEmployeeType());
    }
  }

  const { closeAddEmployeeTypeDialog, isOpenAddEmployeeTypeDialog } = props;

  return (
    <>
      <Grid container>
        <Dialog
          open={isOpenAddEmployeeTypeDialog}
          onClose={() => {
            closeAddEmployeeTypeDialog();
            reset();
            clearErrors();
          }}
        >
          <DialogTitle> Agregar tipo de empleado</DialogTitle>
          <DialogContent>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <Grid item xs={12} sx={{ marginY: 3 }}>
                <TextField
                  label="Nombre"
                  name="name"
                  size="small"
                  autoFocus
                  fullWidth
                  required
                  {...register("name", {
                    required: true,
                  })}
                  error={errors.name}
                />
              </Grid>
              <Grid item xs={12} sx={{ marginY: 3 }}>
                <TextField
                  label="Descripción"
                  multiline
                  maxRows={4}
                  fullWidth
                  name="description"
                  size="small"
                  required
                  {...register("description", {
                    required: true,
                  })}
                  error={errors.description}
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
                    <Button type="submit">Agregar</Button>
                  </Grid>
                  <Grid item xs={5}>
                    <Button
                      onClick={() => {
                        closeAddEmployeeTypeDialog();
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
          Nuevo tipo de empleado agregado!
        </Alert>
      </Snackbar>
      <Snackbar
        open={showSnackbarFail}
        autoHideDuration={3000}
        onClose={(event, reason) => closeSnackbar("fail", reason)}
      >
        <Alert severity="error" sx={{ width: "100%" }}>
          Hubo un error al tratar de realizar su petición.
        </Alert>
      </Snackbar>
    </>
  );
}
