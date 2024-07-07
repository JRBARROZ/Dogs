import { TOKEN_POST } from "../api";

const FETCH_TOKEN_SUCCESS = "FETCH_TOKEN_SUCCESS";
const FETCH_TOKEN_FAILURE = "FETCH_TOKEN_FAILURE";
const FETCH_TOKEN_STARTED = "FETCH_TOKEN_STARTED";
const RESET_STATE = "RESET_STATE";

const fetchTokenStated = () => {
  return {
    type: FETCH_TOKEN_STARTED,
  };
};
const fetchTokenSuccess = (data) => {
  return {
    type: FETCH_TOKEN_SUCCESS,
    payload: data,
  };
};
const fetchTokenFailure = (error) => {
  return {
    type: FETCH_TOKEN_FAILURE,
    payload: error,
  };
};

export const resetTokenState = () => {
  return {
    type: RESET_STATE,
  };
};

const initialState = {
  loading: false,
  error: null,
  data: window.localStorage.getItem("token") || null,
};

export const fetchTokenReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TOKEN_STARTED:
      return {
        ...state,
        loading: true,
        data: null,
        error: null,
      };
    case FETCH_TOKEN_SUCCESS:
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
    case FETCH_TOKEN_FAILURE:
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

export const fetchToken =
  ({ username, password }) =>
  async (dispatch) => {
    try {
      dispatch(fetchTokenStated());
      const { url, options } = TOKEN_POST({ username, password });
      const response = await fetch(url, options);
      const data = await response.json();
      if (response.ok === false) throw new Error(data.message);
      return dispatch(fetchTokenSuccess(data));
    } catch (err) {
      return dispatch(fetchTokenFailure(err.message));
    }
  };
