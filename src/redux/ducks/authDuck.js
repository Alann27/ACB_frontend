import axios from "axios";

//constants
const LOGIN_USER = "LOGIN_USER";
const LOGIN_USER_FAIL = "LOGIN_USER_FAIL";
const initialUser = {
  username: "",
  password: "",
  profileId: "",
  profile: {},
  loginFail: false,
  isLogged: false,
};

//reducers
export default function reducer(state = initialUser, action) {
  switch (action.type) {
    case LOGIN_USER: {
      return {
        ...state,
        username: action.payload.user.username,
        profileId: action.payload.user.profile._id,
        profile: action.payload.user.profile,
        loginFail: action.payload.loginFail,
        isLogged: action.payload.isLogged,
      };
    }
    case LOGIN_USER_FAIL: {
      return { ...state, loginFail: action.payload };
    }
    default: {
      return state;
    }
  }
}

//actions

export const loginUser =
  (username, password, changeMenuAndAppBarVisibility) => async (dispatch) => {
    try {
      const response = await axios.post("http://localhost:4000/Auth/Login", {
        username,
        password,
      });

      if (response.data.data.user) {
        changeMenuAndAppBarVisibility(true);
        dispatch({
          type: LOGIN_USER,
          payload: {
            user: response.data.data.user,
            loginFail: false,
            isLogged: true,
          },
        });
      } else {
        dispatch({
          type: LOGIN_USER_FAIL,
          payload: true,
        });
      }
    } catch (error) {
      console.error(error);
      dispatch({
        type: LOGIN_USER_FAIL,
        payload: true,
      });
    }
  };
