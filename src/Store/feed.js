import { createSlice } from "@reduxjs/toolkit";
import { PHOTOS_GET } from "../api";

const slice = createSlice({
  name: "feed",
  initialState: {
    list: [],
    pages: 1,
    infinite: true,
    data: null,
    loading: false,
    error: false,
  },
  reducers: {
    addPhotos(state, action) {
      state.list.push(...action.payload);
      if (action.payload.length === 0) state.infinite = false;
    },
    addPage(state) {
      state.pages++;
    },
    resetState(state) {
      state.list = [];
      state.pages = 1;
      state.infinite = true;
      state.data = null;
      state.loading = false;
      state.error = false;
    },
    fetchPhotosSuccess: (state, action) => {
      state.data = action.payload;
      state.loading = false;
      state.error = false;
    },
    fetchPhotosFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
      state.data = null;
    },
    fetchPhotoStarted: (state) => {
      state.loading = true;
    },
  },
});

const { fetchPhotoStarted, fetchPhotosSuccess, fetchPhotoFailure } =
  slice.actions;
export const fetchPhotos =
  ({ page, total, user }) =>
  async (dispatch) => {
    try {
      dispatch(fetchPhotoStarted());
      const { url, options } = PHOTOS_GET({ page, total, user });
      const response = await fetch(url, options);
      const data = await response.json();

      if (response.ok === false) throw new Error(data.message);

      dispatch(fetchPhotosSuccess(data));
      return data;
    } catch (err) {
      dispatch(fetchPhotoFailure(err.message));
      return err;
    }
  };

export const loadNewPhotos =
  ({ total = 6, user }) =>
  async (dispatch, getState) => {
    const { feed } = getState();
    dispatch(addPage());
    const data = await dispatch(fetchPhotos({ page: feed.pages, total, user }));
    if (data) dispatch(addPhotos(data));
  };

export const {
  addPhotos,
  addPage,
  resetState: resetPhotosState,
} = slice.actions;

export default slice.reducer;
