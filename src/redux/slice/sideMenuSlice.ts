import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ISideMenuSlice } from "../../interface/sideMenu";

const initialState: ISideMenuSlice = {
  currentPage: "Overview",
};

export const sideMenuSlice = createSlice({
  name: "sideMenu",
  initialState,
  reducers: {
    setCurrentPageAction: (state, { payload }: PayloadAction<ISideMenuSlice>) => {
      state.currentPage = payload.currentPage;
    },
  },
});

export const { setCurrentPageAction } = sideMenuSlice.actions;
