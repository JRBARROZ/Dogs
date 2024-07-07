import { USER_GET } from "../api";
import { fetchToken, resetTokenState } from "./token";

const FETCH_USER_STARTED = "user/fetchStarted";
const FETCH_USER_SUCCESS = "user/fetchSuccess";
const FETCH_USER_FAILURE = "user/fetchFailure";
const RESET_STATE = "user/resetState";

const initialState = {
  data: null,
  error: null,
  loading: false,
};

const fetchUserStated = () => {
  return {
    type: FETCH_USER_STARTED,
  };
};
const fetchUserSuccess = (data) => {
  return {
    type: FETCH_USER_SUCCESS,
    payload: data,
  };
};
const fetchUserFailure = (error) => {
  return {
    type: FETCH_USER_FAILURE,
    payload: error,
  };
};
const resetUserState = () => {
  return {
    type: RESET_STATE,
  };
};
export const fetchUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER_STARTED:
      return {
        ...state,
        loading: true,
        data: null,
        error: null,
      };
    case FETCH_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };
    case RESET_STATE:
      return {
        ...initialState,
      };
    case FETCH_USER_FAILURE:
      return {
        ...state,
        loading: false,
        data: null,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const fetchUser = (token) => async (dispatch) => {
  dispatch(fetchUserStated());
  try {
    const { url, options } = USER_GET(token);
    const response = await fetch(url, options);
    const data = await response.json();
    if (response.ok === false) throw new Error(data.message);
    dispatch(fetchUserSuccess(data));
  } catch (error) {
    console.log(error, "IM THE FUCKING ERROR");
    dispatch(fetchUserFailure(error.message));
    return FETCH_USER_FAILURE;
  }
};

export const userLogin = (user) => async (dispatch) => {
  try {
    const { payload } = await dispatch(fetchToken(user));
    if (payload instanceof Object && payload.token) {
      window.localStorage.setItem("token", payload.token);
      await dispatch(fetchUser(payload.token));
    }
  } catch (err) {}
};

export const userLogout = () => async (dispatch) => {
  dispatch(resetUserState());
  dispatch(resetTokenState());
  window.localStorage.removeItem("token");
};

export const autoLogin = () => async (dispatch, getState) => {
  const { token } = getState();

  if (token?.data) {
    const action = await dispatch(fetchUser(token.data));
    if (action === FETCH_USER_FAILURE) {
      dispatch(userLogout());
    }
  }
};
