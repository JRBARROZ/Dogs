import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import photo from "./photo";
import { fetchTokenReducer } from "./token";
import { fetchUserReducer } from "./user";
import feed from "./feed";
import ui from "./ui";

const rootReducer = combineReducers({
  photo,
  token: fetchTokenReducer,
  user: fetchUserReducer,
  feed,
  ui,
});

const middleware = [];

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(middleware);
  },
});

export default store;
