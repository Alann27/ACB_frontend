import axios from "axios";

// constants
const GET_EMPLOYEES_SUCCESSFULLY = "GET_EMPLOYEES_SUCCESSFULLY";
const GET_EMPLOYEES_FAIL = "GET_EMPLOYEES_FAIL";
const GET_EMPLOYEES_SEARCH_SUCCESSFULLY = "GET_EMPLOYEES_SUCCESSFULLY";
const GET_EMPLOYEES_SEARCH_FAIL = "GET_EMPLOYEES_FAIL";
const CLEAR_ERROR_SEARCHING_EMPLOYEES = "CLEAR_ERROR_SEARCHING_EMPLOYEES";
const ADD_EMPLOYEE_SUCCESSFULLY = "ADD_EMPLOYEE_SUCCESSFULLY";
const ADD_EMPLOYEE_FAIL = "ADD_EMPLOYEE_FAIL";
const CLEAR_ERROR_ADDING_NEW_EMPLOYEE = "CLEAR_ERROR_ADDING_NEW_EMPLOYEE";
const ACTIVATE_EMPLOYEE_SUCCESS = "ACTIVATE_EMPLOYEE_SUCCESS";
const ACTIVATE_EMPLOYEE_FAIL = "ACTIVATE_EMPLOYEE_FAIL";
const CLEAR_ERRORS_ACTIVATING_EMPLOYEE = "CLEAR_ERRORS_ACTIVATING_EMPLOYEE";
const DEACTIVATE_EMPLOYEE_SUCCESS = "DEACTIVATE_EMPLOYEE_SUCCESS";
const DEACTIVATE_EMPLOYEE_FAIL = "DEACTIVATE_EMPLOYEE_FAIL";
const CLEAR_ERRORS_DEACTIVATING_EMPLOYEE = "CLEAR_ERRORS_DEACTIVATING_EMPLOYEE";
const UPDATE_EMPLOYEE_SUCCESS = "UPDATE_EMPLOYEE_SUCCESS";
const UPDATE_EMPLOYEE_FAIL = "UPDATE_EMPLOYEE_FAIL";
const CLEAR_ERROR_UDATING_EMPLOYEE = "CLEAR_ERROR_UDATING_EMPLOYEE";

const initialData = {
  employees: [],
  page: 1,
  pages: "",
  totalEmployees: "",
  searchQuery: "",
  noEmployees: false,
  employeeActivated: false,
  employeeDeactivated: false,
  errorAddingNewEmployee: false,
  errorDeactivatingEmployee: false,
  errorActivatingEmployee: false,
  errorActivatingEmployeeMessage: undefined,
  errorDeactivatingEmployeeMessage: undefined,
  errorUpdatingEmployee: false,
  employeeUpdated: false,
  errorSearchingEmployees: false
};

// reducer
export default function reducer(state = initialData, action) {
  switch (action.type) {
    case GET_EMPLOYEES_SUCCESSFULLY: {
      const {
        employees,
        page,
        pages,
        totalEmployees,
        noEmployees,
        employeeActivated,
        employeeDeactivated,
      } = action.payload;
      return {
        ...state,
        employees,
        page,
        pages,
        totalEmployees,
        noEmployees,
        employeeActivated,
        employeeDeactivated,
      };
    }
    case GET_EMPLOYEES_FAIL: {
      return { ...state, noEmployees: action.payload.noEmployees };
    }
    case GET_EMPLOYEES_SEARCH_SUCCESSFULLY: {
      const {
        employees,
        page,
        pages,
        totalEmployees,
        noEmployees,
        employeeActivated,
        employeeDeactivated,
      } = action.payload;
      return {
        ...state,
        employees,
        page,
        pages,
        totalEmployees,
        noEmployees,
        employeeActivated,
        employeeDeactivated,
      };
    }
    case GET_EMPLOYEES_SEARCH_FAIL: {
      const {errorSearchingEmployees} = action.payload;
      return {...state, errorSearchingEmployees}
    }
    case CLEAR_ERROR_SEARCHING_EMPLOYEES: {
      const {errorSearchingEmployees} = action.payload;
      return {...state, errorSearchingEmployees}
    }
    case ADD_EMPLOYEE_SUCCESSFULLY: {
      const { totalEmployees, pages } = action.payload;
      return { ...state, totalEmployees, pages };
    }
    case ADD_EMPLOYEE_FAIL: {
      const { errorAddingNewEmployee } = action.payload;
      return {
        ...state,
        errorAddingNewEmployee,
      };
    }
    case CLEAR_ERROR_ADDING_NEW_EMPLOYEE: {
      const { errorAddingNewEmployee } = action.payload;
      return {
        ...state,
        errorAddingNewEmployee,
      };
    }
    case UPDATE_EMPLOYEE_SUCCESS: {
      const { employees, employeeUpdated } = action.payload;
      return { ...state, employees, employeeUpdated };
    }
    case UPDATE_EMPLOYEE_FAIL: {
      const { errorUpdatingEmployee } = action.payload;
      return { ...state, errorUpdatingEmployee };
    }
    case CLEAR_ERROR_UDATING_EMPLOYEE: {
      const { errorUpdatingEmployee } = action.payload;
      return { ...state, errorUpdatingEmployee };
    }
    case ACTIVATE_EMPLOYEE_SUCCESS: {
      const { employeeActivated } = action.payload;
      return { ...state, employeeActivated };
    }
    case ACTIVATE_EMPLOYEE_FAIL: {
      const { errorActivatingEmployee, errorActivatingEmployeeMessage } =
        action.payload;
      return {
        ...state,
        errorActivatingEmployee,
        errorActivatingEmployeeMessage,
      };
    }
    case DEACTIVATE_EMPLOYEE_SUCCESS: {
      const { employeeDeactivated } = action.payload;
      return { ...state, employeeDeactivated };
    }
    case DEACTIVATE_EMPLOYEE_FAIL: {
      const { errorDeactivatingEmployeeMessage, errorDeactivatingEmployee } =
        action.payload;
      return {
        ...state,
        errorDeactivatingEmployee,
        errorDeactivatingEmployeeMessage,
      };
    }
    case CLEAR_ERRORS_ACTIVATING_EMPLOYEE: {
      const { errorActivatingEmployee, errorActivatingEmployeeMessage } =
        action.payload;
      return {
        ...state,
        errorActivatingEmployee,
        errorActivatingEmployeeMessage,
      };
    }
    case CLEAR_ERRORS_DEACTIVATING_EMPLOYEE: {
      const { errorDeactivatingEmployee, errorDeactivatingEmployeeMessage } =
        action.payload;
      return {
        ...state,
        errorDeactivatingEmployee,
        errorDeactivatingEmployeeMessage,
      };
    }
    default: {
      return state;
    }
  }
}
// actions
export const searchEmployees =
  (page, searchQuery, perPage = 10) =>
  async (dispatch) => {
    try {
      const response = await axios.get(
        "http://localhost:4000/Employee/GetEmployeesBySearch",
        {
          params: {
            page,
            per_page: perPage,
            searchQuery
          },
        }
      );
      if (response.data.data.items) {
        const { items, count, pages } = response.data.data;
        console.log(response.data.data.items);
        dispatch({
          type: GET_EMPLOYEES_SEARCH_SUCCESSFULLY,
          payload: {
            employees: items,
            totalEmployees: count,
            page: page,
            pages: pages,
            noEmployees: false,
            employeeActivated: false,
            employeeDeactivated: false,
          },
        });
      }
    } catch (error) {
      console.error(error);
      dispatch({
        type: GET_EMPLOYEES_FAIL,
        payload: {
          noEmployees: true,
          errorSearchingEmployees: true,
        },
      });
    }
  };

export const clearSearchEmployeesError = () => (dispatch) => {
  dispatch({
    type: CLEAR_ERROR_SEARCHING_EMPLOYEES,
    payload: {
      errorSearchingEmployees: false,
    }
  })
}

  export const getEmployees =
  (page, perPage = 10) =>
  async (dispatch) => {
    try {
      const response = await axios.get(
        "http://localhost:4000/Employee/GetEmployees",
        {
          params: {
            page,
            per_page: perPage,
          },
        }
      );
      if (response.data.data.items) {
        const { items, count, pages } = response.data.data;
        console.log(response.data.data.items);
        dispatch({
          type: GET_EMPLOYEES_SUCCESSFULLY,
          payload: {
            employees: items,
            totalEmployees: count,
            page: page,
            pages: pages,
            noEmployees: false,
            employeeActivated: false,
            employeeDeactivated: false,
          },
        });
      }
    } catch (error) {
      console.error(error);
      dispatch({
        type: GET_EMPLOYEES_FAIL,
        payload: {
          noEmployees: true,
        },
      });
    }
  };

export const addEmployee = (newEmployee) => async (dispatch, getState) => {
  let { pages, totalEmployees, searchQuery } = getState().employees;
  try {
    const { name, lastName, cedula, type, cellphone, salary } = newEmployee;
    const response = await axios.post(
      "http://localhost:4000/Employee/CreateEmployee",
      {
        name,
        last_name: lastName,
        cedula,
        employee_type: type,
        salary,
        cellphone,
      }
    );

    if (response.data.data.employee) {
      if (searchQuery === "") {
        totalEmployees++;
        pages = Math.ceil(totalEmployees / 10);
      }

      dispatch({
        type: ADD_EMPLOYEE_SUCCESSFULLY,
        payload: {
          totalEmployees,
          pages,
        },
      });
    } else {
      dispatch({
        type: ADD_EMPLOYEE_FAIL,
        payload: {
          errorAddingNewEmployee: true,
        },
      });
    }
  } catch (error) {
    console.error(error);
    dispatch({
      type: ADD_EMPLOYEE_FAIL,
      payload: {
        errorAddingNewEmployee: true,
      },
    });
  }
};

export const updateEmployee = (employee) => async (dispatch, getState) => {
  try {
    const { name, lastName, cedula, type, cellphone, salary } = employee;
    const response = await axios.put(
      "http://localhost:4000/Employee/UpdateEmployee",
      {
        name,
        last_name: lastName,
        cedula,
        employee_type: type,
        salary,
        cellphone,
      }
    );

    if (response.data.data.employee) {
      const employeesArray = getState().employees.employees;
      
      const newEmployeesArray = employeesArray.map((employee) => {
        if (employee.cedula === response.data.data.employee.cedula) {
          employee = response.data.data.employee;
        }
        return employee;
      });

      dispatch({
        type: UPDATE_EMPLOYEE_SUCCESS,
        payload: {
          employees: newEmployeesArray,
          employeeUpdated: true,
        },
      });
    } else {
      dispatch({
        type: UPDATE_EMPLOYEE_FAIL,
        payload: {
          errorUpdatingEmployee: true,
        },
      });
    }
  } catch (error) {
    console.error(error);
    dispatch({
      type: UPDATE_EMPLOYEE_FAIL,
      payload: {
        errorUpdatingEmployee: true,
      },
    });
  }
};

export const clearErrorUpdatingEmployee = () => (dispatch) => {
  dispatch({
    type: CLEAR_ERROR_UDATING_EMPLOYEE,
    payload: {
      errorUpdatingEmployee: false,
    },
  });
};

export const activateEmployee = (cedula) => async (dispatch) => {
  try {
    const response = await axios.put(
      "http://localhost:4000/Employee/ActivateEmployee",
      {
        cedula,
      }
    );

    if (response.data.success === true) {
      dispatch({
        type: ACTIVATE_EMPLOYEE_SUCCESS,
        payload: {
          employeeActivated: true,
        },
      });
    } else {
      dispatch({
        type: ACTIVATE_EMPLOYEE_FAIL,
        payload: {
          errorActivatingEmployee: true,
          errorActivatingEmployeeMessage:
            "Hubo un error al momento de procesar su solicitud.",
        },
      });
    }
  } catch (error) {
    console.error(error);
    if (error.response && error.response.data) {
      if (error.response.status === 404 && error.response?.data?.success === false) {
        dispatch({
          type: ACTIVATE_EMPLOYEE_FAIL,
          payload: {
            errorActivatingEmployee: true,
            errorActivatingEmployeeMessage: "Empleado no encontrado.",
          },
        });
      } else if (error.response.data.isUserAlreadyActivated) {
        dispatch({
          type: ACTIVATE_EMPLOYEE_FAIL,
          payload: {
            errorActivatingEmployee: true,
            errorActivatingEmployeeMessage: "Empleado ya se encuentra activo.",
          },
        });
      } else {
        dispatch({
          type: ACTIVATE_EMPLOYEE_FAIL,
          payload: {
            errorActivatingEmployee: true,
            errorActivatingEmployeeMessage:
              "Hubo un error al momento de procesar su solicitud.",
          },
        });
      }
    } else {
      dispatch({
        type: ACTIVATE_EMPLOYEE_FAIL,
        payload: {
          errorActivatingEmployee: true,
          errorActivatingEmployeeMessage:
            "Hubo un error al momento de procesar su solicitud.",
        },
      });
    }
  }
};

export const deactivateEmployee = (cedula) => async (dispatch) => {
  try {
    const response = await axios.put(
      "http://localhost:4000/Employee/DeactivateEmployee",
      {
        cedula,
      }
    );

    if (response.data.success === true) {
      dispatch({
        type: DEACTIVATE_EMPLOYEE_SUCCESS,
        payload: {
          employeeDeactivated: true,
        },
      });
    } else {
      dispatch({
        type: DEACTIVATE_EMPLOYEE_FAIL,
        payload: {
          errorDeactivatingEmployee: true,
          errorDeactivatingEmployeeMessage:
            "Hubo un error al momento de procesar su solicitud.",
        },
      });
    }
  } catch (error) {
    console.error(error);
    if (error.response && error.response.data) {
      if (error.response.status === 404 && error.response?.data?.success === false) {
        dispatch({
          type: DEACTIVATE_EMPLOYEE_FAIL,
          payload: {
            errorDeactivatingEmployee: true,
            errorDeactivatingEmployeeMessage: "Empleado no encontrado.",
          },
        });
      } else if (error.response.data.isUserAlreadyDeactivated) {
        dispatch({
          type: DEACTIVATE_EMPLOYEE_FAIL,
          payload: {
            errorDeactivatingEmployee: true,
            errorDeactivatingEmployeeMessage:
              "Empleado ya se encuentra desactivado.",
          },
        });
      } else {
        dispatch({
          type: DEACTIVATE_EMPLOYEE_FAIL,
          payload: {
            errorDeactivatingEmployee: true,
            errorDeactivatingEmployeeMessage:
              "Hubo un error al momento de procesar su solicitud.",
          },
        });
      }
    } else {
      dispatch({
        type: DEACTIVATE_EMPLOYEE_FAIL,
        payload: {
          errorDeactivatingEmployee: true,
          errorDeactivatingEmployeeMessage:
            "Hubo un error al momento de procesar su solicitud.",
        },
      });
    }
  }
};

export const clearErrorAddingNewEmployee = () => (dispatch) => {
  dispatch({
    type: CLEAR_ERROR_ADDING_NEW_EMPLOYEE,
    payload: {
      errorAddingNewEmployee: false,
    },
  });
};

export const clearErrorActivatingEmployee = () => (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS_ACTIVATING_EMPLOYEE,
    payload: {
      errorActivatingEmployee: false,
      errorActivatingEmployeeMessage: undefined,
    },
  });
};

export const clearErrorDeactivatingEmployee = () => (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS_DEACTIVATING_EMPLOYEE,
    payload: {
      errorDeactivatingEmployee: false,
      errorDeactivatingEmployeeMessage: undefined,
    },
  });
};
