import { Alert, Button, Grid, Snackbar } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import { Box, style } from "@mui/system";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Table from "../components/Table.jsx";
import {
  activateEmployee,
  clearErrorDeactivatingEmployee,
  clearErrorUpdatingEmployee,
  deactivateEmployee,
  getEmployees,
  searchEmployees,
} from "../redux/ducks/employeeDuck.js";
import SearchBar from "material-ui-search-bar";
import AddEmployeeDialog from "../components/AddEmployeeDialog.jsx";
import { getEmployeeTypes } from "../redux/ducks/employeeTypeDuck.js";
import AddEmployeeTypeDialog from "../components/AddEmployeeTypeDialog.jsx";
import ActivateEmployeeDialog from "../components/ActivateEmployeeDialog.jsx";
import UpdateEmployeeDialog from "../components/EditEmployeeDialog.jsx";

const styleClasses = makeStyles((theme) => ({
  buttonsGrid: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    ["@media (min-width:830px)"]: {
      marginLeft: theme.spacing(2),
    },
  },
}));

export default function EmployeesPage(props) {
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState([]);
  const [openAddEmployee, setOpenAddEmployee] = useState(false);
  const [showUpdateEmployeeDialog, setShowUpdateEmployeeDialog] =
    useState(false);
  const [deactivateButtonDisable, setDeactivateButtonDisable] = useState(true);
  const [editButtonDisable, setEditButtonDisable] = useState(true);
  const [openAddEmployeeType, setOpenAddEmployeeType] = useState(false);
  const [showActivateEmployeeDialog, setShowActivateEmployeeDialog] =
    useState(false);
  const dispatch = useDispatch();
  const employees = useSelector((store) => store.employees.employees);
  const pages = useSelector((store) => store.employees.pages);
  const prevPage = useSelector((store) => store.employees.prevPage);
  const currentPage = useSelector((store) => store.employees.page);
  const employeeTypes = useSelector(
    (store) => store.employeeTypes.employeeTypes
  );

  const currencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const [employeeSelected, setEmployeeSelected] = useState({});

  const columns = [
    { field: "id", hide: true },
    {
      field: "name",
      headerName: "Nombre",
      align: "center",
      headerAlign: "center",
      type: "string",
      width: 150,
    },
    {
      field: "last_name",
      headerName: "Apellido(s)",
      align: "center",
      headerAlign: "center",
      type: "string",
      width: 150,
    },
    {
      field: "employee_type",
      headerName: "Tipo",
      align: "center",
      headerAlign: "center",
      type: "string",
      width: 150,
    },
    {
      field: "email",
      headerName: "Email",
      align: "center",
      headerAlign: "center",
      type: "string",
      hide: true,
      width: 150,
    },
    {
      field: "cedula",
      headerName: "Cédula",
      align: "center",
      headerAlign: "center",
      type: "string",
      valueFormatter: ({ value }) =>
        value && value.length === 11
          ? `${value.substring(0, 3)}-${value.substring(
              3,
              10
            )}-${value.substring(10, 11)}`
          : value,
      width: 150,
    },
    {
      field: "salary",
      headerName: "Salario",
      align: "center",
      headerAlign: "center",
      type: "number",
      valueFormatter: ({ value }) => currencyFormatter.format(Number(value)),
      width: 150,
    },
    {
      field: "enabled",
      headerName: "Estado",
      align: "center",
      headerAlign: "center",
      type: "string",
      valueFormatter: ({ value }) =>
        value === true ? "Activo" : "Desactivado",
      width: 150,
    },
    {
      field: "cellphone",
      headerName: "Teléfono",
      align: "center",
      headerAlign: "center",
      type: "string",
      valueFormatter: ({ value }) =>
        value && value.length === 10
          ? `${value.substring(0, 3)}-${value.substring(
              3,
              6
            )}-${value.substring(6, 10)}`
          : value,
      width: 150,
    },
    {
      field: "sales_difference",
      headerName: "Arqueo",
      align: "center",
      headerAlign: "center",
      type: "number",
      valueFormatter: ({ value }) => currencyFormatter.format(Number(value)),
      width: 150,
    },
    {
      field: "createdAt",
      headerName: "Creado en",
      align: "center",
      headerAlign: "center",
      type: "dateTime",
      width: 150,
    },
  ];

  useEffect(() => {
    const newRows = employees.map((employee) => {
      const {
        _id,
        name,
        last_name,
        cedula,
        email,
        salary,
        enabled,
        cellphone,
        employee_type,
        sales_difference,
        createdAt,
      } = employee;
      return {
        id: _id,
        name,
        last_name,
        cedula,
        email,
        salary,
        enabled,
        cellphone,
        employee_type,
        sales_difference,
        createdAt,
      };
    });
    setRows(newRows);
    setLoading(false);
  }, [employees]);

  useEffect(() => {
    dispatch(getEmployees(1));
    dispatch(getEmployeeTypes());
  }, []);

  function onPageChanged(page) {
    setEmployeeSelected({});
    setEditButtonDisable(true);
    setDeactivateButtonDisable(true);
    if (searchText === "") {
      dispatch(getEmployees(page));
    } else {
      dispatch(searchEmployees(page, searchText));
    }
  }

  function onEmployeeSelectedChange(rowSelected) {
    setEmployeeSelected(rowSelected);

    if (deactivateButtonDisable) {
      setDeactivateButtonDisable(false);
    }

    if (editButtonDisable) {
      setEditButtonDisable(false);
    }
  }

  async function onDeactivateEmployee() {
    await dispatch(deactivateEmployee(employeeSelected.cedula));
    if (!showDeactivateSnackbarFail) {
      setDeactivateShowSnackbarSuccess(true);
    }
    setDeactivateButtonDisable(true);
    if (searchText === "") {
      dispatch(getEmployees(currentPage));
    } else {
      dispatch(searchEmployees(currentPage, searchText));
    }
    setEmployeeSelected({});
  }

  function onOpenAddEmployee() {
    setOpenAddEmployee(true);
  }

  function onCloseAddEmployee() {
    setOpenAddEmployee(false);
  }

  function onOpenUpdateEmployeeDialog() {
    setShowUpdateEmployeeDialog(true);
  }

  function onCloseUpdateEmployeeDialog() {
    setShowUpdateEmployeeDialog(false);
  }

  function onOpenAddEmployeeType() {
    setOpenAddEmployeeType(true);
  }

  function onCloseAddEmployeeType() {
    setOpenAddEmployeeType(false);
  }

  function onOpenActivateEmployee() {
    setShowActivateEmployeeDialog(true);
  }

  function onCloseActivateEmployee() {
    setShowActivateEmployeeDialog(false);
  }

  const [showUpdateSnackbarSuccess, setUpdateShowSnackbarSuccess] =
    useState(false);

  const showUpdateSnackbarFail = useSelector(
    (store) => store.employees.errorUpdatingEmployee
  );

  function closeUpdateSnackbar(snackbar, reason) {
    if (reason === "clickaway") {
      return;
    }

    if (snackbar === "success") {
      setUpdateShowSnackbarSuccess(false);
    } else {
      dispatch(clearErrorUpdatingEmployee());
    }
  }

  const [showDeactivateSnackbarSuccess, setDeactivateShowSnackbarSuccess] =
    useState(false);

  const showDeactivateSnackbarFail = useSelector(
    (store) => store.employees.errorDeactivatingEmployee
  );

  const messageDeactivateSnackbarFail = useSelector(
    (store) => store.employees.errorDeactivatingEmployeeMessage
  );

  function closeDeactivateSnackbar(snackbar, reason) {
    if (reason === "clickaway") {
      return;
    }

    if (snackbar === "success") {
      setDeactivateShowSnackbarSuccess(false);
    } else {
      dispatch(clearErrorDeactivatingEmployee());
    }
  }

  const [searchText, setSearchText] = useState("");

  function onChangeSearchText(value) {
    setSearchText(value);
  }

  function onRequestSearch() {
    dispatch(searchEmployees(1, searchText));
  }

  function onCancelSearch() {
    setSearchText("");
    dispatch(getEmployees(1));
  }

  const classes = styleClasses();

  return (
    <>
      <Grid
        container
        flexDirection="row"
        justifyContent="center"
        alignItems="center"
        alignContent="center"
      >
        <Grid item flexGrow={1} md={4}>
          <SearchBar
            placeholder="Buscar"
            cancelOnEscape
            onChange={onChangeSearchText}
            value={searchText}
            onCancelSearch={onCancelSearch}
            onRequestSearch={onRequestSearch}
          />
        </Grid>
        <Grid item md={8}>
          <Grid
            className={classes.buttonsGrid}
            textAlign="center"
            container
            justifyContent="center"
            alignContent="center"
            alignItems="center"
          >
            <Button
              sx={{ marginRight: 1, marginY: 1 }}
              size="small"
              variant="contained"
              xs={12}
              onClick={onOpenAddEmployee}
            >
              Agregar
            </Button>
            <Button
              sx={{ marginRight: 1, marginY: 1 }}
              size="small"
              variant="contained"
              xs={12}
              disabled={editButtonDisable}
              onClick={onOpenUpdateEmployeeDialog}
            >
              Editar
            </Button>
            <Button
              sx={{ marginRight: 1, marginY: 1 }}
              size="small"
              variant="contained"
              xs={12}
              onClick={onOpenActivateEmployee}
            >
              Activar
            </Button>
            <Button
              sx={{ marginRight: 1, marginY: 1 }}
              size="small"
              variant="contained"
              xs={12}
              onClick={onDeactivateEmployee}
              disabled={deactivateButtonDisable}
            >
              Desactivar
            </Button>
            <Button
              sx={{ marginY: 1 }}
              size="small"
              variant="contained"
              xs={12}
              onClick={onOpenAddEmployeeType}
            >
              Agregar tipo
            </Button>
          </Grid>
          <Box></Box>
        </Grid>
      </Grid>

      <Table
        columns={columns}
        rows={rows}
        pages={pages}
        loading={loading}
        externalOnSelectionChange={onEmployeeSelectedChange}
        externalOnPageChange={onPageChanged}
        currentPage={currentPage}
        prevPage={prevPage}
      />
      <AddEmployeeDialog
        closeAddEmployeeDialog={onCloseAddEmployee}
        employeeTypes={employeeTypes}
        isOpenAddEmployeeDialog={openAddEmployee}
      />
      {showUpdateEmployeeDialog && (
        <UpdateEmployeeDialog
          closeUpdateEmployeeDialog={onCloseUpdateEmployeeDialog}
          showUpdateEmployeeDialog={showUpdateEmployeeDialog}
          employeeToUpdate={employeeSelected}
          employeeTypes={employeeTypes}
          setEmployeeToUpdate={setEmployeeSelected}
          setShowSnackbarSuccess={setUpdateShowSnackbarSuccess}
          showSnackbarFail={showUpdateSnackbarFail}
        />
      )}
      <AddEmployeeTypeDialog
        closeAddEmployeeTypeDialog={onCloseAddEmployeeType}
        isOpenAddEmployeeTypeDialog={openAddEmployeeType}
      />
      <ActivateEmployeeDialog
        showActivateEmployeeDialog={showActivateEmployeeDialog}
        closeActivateEmployeeDialog={onCloseActivateEmployee}
      />
      <Snackbar
        open={showDeactivateSnackbarSuccess}
        autoHideDuration={3000}
        onClose={(event, reason) => closeDeactivateSnackbar("success", reason)}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          Empleado desactivado!
        </Alert>
      </Snackbar>
      <Snackbar
        open={showDeactivateSnackbarFail}
        autoHideDuration={3000}
        onClose={(event, reason) => closeDeactivateSnackbar("fail", reason)}
      >
        <Alert severity="error" sx={{ width: "100%" }}>
          {showDeactivateSnackbarFail && messageDeactivateSnackbarFail}
        </Alert>
      </Snackbar>
      <Snackbar
        open={showUpdateSnackbarSuccess}
        autoHideDuration={3000}
        onClose={(event, reason) => closeUpdateSnackbar("success", reason)}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          Empleado actualizado!
        </Alert>
      </Snackbar>
      <Snackbar
        open={showUpdateSnackbarFail}
        autoHideDuration={3000}
        onClose={(event, reason) => closeUpdateSnackbar("fail", reason)}
      >
        <Alert severity="error" sx={{ width: "100%" }}>
          Hubo un error al tratar de realizar su petición.
        </Alert>
      </Snackbar>
    </>
  );
}
