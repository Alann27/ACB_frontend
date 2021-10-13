import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  MenuItem,
  TextField,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useDispatch, } from "react-redux";
import {
  updateEmployee,
} from "../redux/ducks/employeeDuck";

export default function UpdateEmployeeDialog(props) {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const {
    closeUpdateEmployeeDialog,
    showUpdateEmployeeDialog,
    employeeToUpdate,
    setEmployeeToUpdate,
    setShowSnackbarSuccess,
    showSnackbarFail
  } = props;

  const dispatch = useDispatch();
 
  const onSubmit = async (data) => {
    if (data.cellphone?.length === 0) {
      data.cellphone = undefined;
    }

    await dispatch(updateEmployee(data));

    if (!showSnackbarFail) {
      setShowSnackbarSuccess(true);
      closeUpdateEmployeeDialog();
      setEmployeeToUpdate({
        ...employeeToUpdate,
        name: data.name,
        last_name: data.lastName,
        cellphone: data.cellphone,
        salary: data.salary,
        employee_type: data.type,
      });
    }
  };

  return (
    <>
      <Grid container justifyContent="space-between">
        <Dialog
          open={showUpdateEmployeeDialog}
          onClose={() => {
            closeUpdateEmployeeDialog();
          }}
        >
          <DialogTitle sx={{ textAlign: "center" }}>
            Editar empleado
          </DialogTitle>
          <DialogContent>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid item xs={12} sx={{ marginY: 3 }}>
                <TextField
                  autoFocus
                  defaultValue={employeeToUpdate.name}
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
                  defaultValue={employeeToUpdate.last_name}
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
                  defaultValue={employeeToUpdate.employee_type}
                  label="Tipo de empleado"
                  size="small"
                  required
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
                  value={employeeToUpdate.cedula}
                  label="Cédula"
                  size="small"
                  required
                  name="cedula"
                  {...register("cedula", {
                    required: true,
                  })}
                />
              </Grid>
              <Grid item xs={12} sx={{ marginY: 3 }}>
                <TextField
                  defaultValue={employeeToUpdate.salary}
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
                  defaultValue={employeeToUpdate.cellphone}
                  label="Teléfono"
                  size="small"
                  {...register("cellphone", {
                    minLength: {
                      value: 10,
                      message: "10 o más caracteres o vacío",
                    },
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
                  <Button type="submit">Editar</Button>
                </Grid>
                <Grid item xs={5}>
                  <Button
                    onClick={() => {
                      closeUpdateEmployeeDialog();
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
    </>
  );
}
