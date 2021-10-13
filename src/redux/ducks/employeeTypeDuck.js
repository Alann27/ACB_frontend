import axios from "axios";

//constants
const GET_EMPLOYEES_TYPES_SUCCESSFULLY = "GET_EMPLOYEES_TYPES_SUCCESSFULLY";
const GET_EMPLOYEES_TYPES_FAIL = "GET_EMPLOYEES_TYPES_FAIL";
const ADD_EMPLOYEE_TYPE_SUCCESSFULLY = "ADD_EMPLOYEE_TYPE_SUCCESSFULLY";
const ADD_EMPLOYEE_TYPE_FAIL = "ADD_EMPLOYEE_TYPE_FAIL";
const CLEAR_ERROR_ADDING_NEW_EMPLOYEE_TYPE =
  "CLEAR_ERROR_ADDING_NEW_EMPLOYEE_TYPE";

const initialData = {
  employeeTypes: [],
  errorAddingNewEmployeeType: false,
};
//reducer
export default function employeeTypesReducer(state = initialData, action) {
  switch (action.type) {
    case GET_EMPLOYEES_TYPES_SUCCESSFULLY: {
      return { ...state, employeeTypes: action.payload.employeeTypes };
    }
    case GET_EMPLOYEES_TYPES_FAIL: {
      return { ...state, employeeTypes: action.payload.employeeTypes };
    }
    case ADD_EMPLOYEE_TYPE_SUCCESSFULLY: {
      return { ...state, employeeTypes: action.payload.employeeTypes };
    }
    case ADD_EMPLOYEE_TYPE_FAIL: {
      return {
        ...state,
        employeeTypes: action.payload.employeeTypes,
        errorAddingNewEmployeeType: action.payload.errorAddingNewEmployeeType,
      };
    }
    case CLEAR_ERROR_ADDING_NEW_EMPLOYEE_TYPE: {
      return {
        ...state,
        employeeTypes: action.payload.employeeTypes,
        errorAddingNewEmployeeType: action.payload.errorAddingNewEmployeeType,
      };
    }
    default: {
      return state;
    }
  }
}
//actions
export const getEmployeeTypes = () => async (dispatch, getState) => {
  try {
    const response = await axios.get(
      "http://localhost:4000/EmployeeType/GetAll"
    );

    if (response.data) {
      dispatch({
        type: GET_EMPLOYEES_TYPES_SUCCESSFULLY,
        payload: {
          employeeTypes: response.data.data.items,
        },
      });
    } else {
      dispatch({
        type: GET_EMPLOYEES_TYPES_FAIL,
        employeeTypes: getState().employeeTypes.employeeTypes,
      });
    }
  } catch (error) {
    console.error(error);
    dispatch({
      type: GET_EMPLOYEES_TYPES_FAIL,
      employeeTypes: getState().employeeTypes.employeeTypes,
    });
  }
};

export const addEmployeeType =
  (newEmployeeType) => async (dispatch, getState) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/EmployeeType/CreateEmployeeType",
        {
          name: newEmployeeType.name,
          description: newEmployeeType.description,
        }
      );

      if (response.data.data.employee_type) {
        const employeeTypeResponse = response.data.data.employee_type;
        const employeeTypesArray = [
          ...getState().employeeTypes.employeeTypes,
          employeeTypeResponse,
        ];

        dispatch({
          type: ADD_EMPLOYEE_TYPE_SUCCESSFULLY,
          payload: {
            employeeTypes: employeeTypesArray,
          },
        });
      } else {
        dispatch({
          type: ADD_EMPLOYEE_TYPE_FAIL,
          payload: {
            employeeTypes: getState().employeeTypes.employeeTypes,
            errorAddingNewEmployeeType: true,
          },
        });
      }
    } catch (error) {
      console.error(error);
      dispatch({
        type: ADD_EMPLOYEE_TYPE_FAIL,
        payload: {
          employeeTypes: getState().employeeTypes.employeeTypes,
          errorAddingNewEmployeeType: true,
        },
      });
      throw error;
    }
  };

export const clearErrorAddingNewEmployeeType = () => (dispatch, getState) => {
  dispatch({
    type: CLEAR_ERROR_ADDING_NEW_EMPLOYEE_TYPE,
    payload: {
      employeeTypes: getState().employeeTypes.employeeTypes,
      errorAddingNewEmployeeType: false,
    },
  });
};
