import {
  Alert,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  MenuItem,
  TextField,
  Snackbar
} from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrorAddingNewEmployee,
  addEmployee,
} from "../redux/ducks/employeeDuck";

export default function AddEmployeeDialog(props) {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    clearErrors,
  } = useForm();

  const [showSnackbarSuccess, setShowSnackbarSuccess] = useState(false);

  const showSnackbarFail = useSelector(
    (store) => store.employees.errorAddingNewEmployee
  );

  const dispatch = useDispatch();

  const { closeAddEmployeeDialog, isOpenAddEmployeeDialog } = props;

  const onSubmit = async (data, e) => {
    if (data.cellphone.length === 0){
      data.cellphone = undefined;
    }
    
    await dispatch(addEmployee(data));

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
      dispatch(clearErrorAddingNewEmployee());
    }
  }

  return (
    <>
      <Grid container justifyContent="space-between">
        <Dialog
          open={isOpenAddEmployeeDialog}
          onClose={() => {
            closeAddEmployeeDialog();
            reset();
            clearErrors();
          }}
        >
          <DialogTitle sx={{ textAlign: "center" }}>
            Agregar empleado
          </DialogTitle>
          <DialogContent>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <Grid item xs={12} sx={{ marginY: 3 }}>
                <TextField
                  autoFocus
                  label="Nombre"
                  size="small"
                  required
                  name="name"
                  {...register("name", {
                    required: true,
                  })}
                  error={errors.name}
                />
              </Grid>
              <Grid item xs={12} sx={{ marginY: 3 }}>
                <TextField
                  label="Apellidos"
                  size="small"
                  required
                  name="lastName"
                  {...register("lastName", {
                    required: true,
                  })}
                  error={errors.lastName}
                />
              </Grid>
              <Grid item xs={12} sx={{ marginY: 3 }}>
                <TextField
                  label="Tipo de empleado"
                  size="small"
                  required
                  defaultValue=""
                  select
                  name="type"
                  {...register("type", {
                    required: true,
                  })}
                  fullWidth
                  error={errors.type}
                >
                  {props.employeeTypes.map((employeeType) => {
                    return (
                      <MenuItem
                        key={employeeType.name}
                        value={employeeType.name}
                      >
                        {employeeType.name}
                      </MenuItem>
                    );
                  })}
                </TextField>
              </Grid>
              <Grid item xs={12} sx={{ marginY: 3 }}>
                <TextField
                  label="Cédula"
                  size="small"
                  required
                  name="cedula"
                  {...register("cedula", {
                    required: true,
                    maxLength:{
                      value: 11,
                      message: "Cédula debe tener 11 caracteres"
                    },
                    minLength:{
                      value: 11,
                      message: "Cédula debe tener 11 caracteres"
                    }
                  })}
                  error={errors.cedula}
                  helperText={errors.cedula && errors.cedula.message}
                />
              </Grid>
              <Grid item xs={12} sx={{ marginY: 3 }}>
                <TextField
                  error={errors.salary}
                  type="number"
                  label="Salario"
                  size="small"
                  required
                  name="salary"
                  {...register("salary", {
                    required: true,
                  })}
                />
              </Grid>
              <Grid item xs={12} sx={{ marginY: 3 }}>
                <TextField
                  label="Teléfono"
                  size="small"
                  {...register("cellphone",{
                    minLength: {
                      value:10,
                      message: "10 o más caracteres o vacío"
                    }
                  })}
                  error={errors.cellphone}
                  helperText={errors.cellphone && errors.cellphone.message}
                />
              </Grid>
              <Grid
                container
                direction="row"
                justifyContent="space-evenly"
                alignItems="center"
              >
                <Grid item xs={5}>
                  <Button type="submit">Agregar</Button>
                </Grid>
                <Grid item xs={5}>
                  <Button
                    onClick={() => {
                      closeAddEmployeeDialog();
                      reset();
                      clearErrors();
                    }}
                  >
                    Cerrar
                  </Button>
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
          Nuevo empleado agregado!
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
