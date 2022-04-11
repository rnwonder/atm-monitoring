import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IToggleSlice } from "../../interface/toggle";

const initialState: IToggleSlice = {
  filterBy: false,
  bg: false,
  addUser: false,
  addTicket: false,
  bgDark: false,
  addUserSuccess: false,
  sideMenu: false,
  profileMenu: false,
};

export const toggleSlice = createSlice({
  name: "toggle",
  initialState,
  reducers: {
    setFilterByAction: (state, { payload }: PayloadAction<boolean>) => {
      state.filterBy = payload;
    },
    setBgAction: (state, { payload }: PayloadAction<boolean>) => {
      state.bg = payload;
    },
    setAddUserAction: (state, { payload }: PayloadAction<boolean>) => {
      state.addUser = payload;
    },
    setAddTicketAction: (state, { payload }: PayloadAction<boolean>) => {
      state.addTicket = payload;
    },
    setBgDarkAction: (state, { payload }: PayloadAction<boolean>) => {
      state.bgDark = payload;
    },
    setAddUserSuccessAction: (state, { payload }: PayloadAction<boolean>) => {
      state.addUserSuccess = payload;
    },
    setSideMenuAction: (state, { payload }: PayloadAction<boolean>) => {
      state.sideMenu = payload;
    },
    setProfileMenuAction: (state, { payload }: PayloadAction<boolean>) => {
      state.profileMenu = payload;
    },
    clearAllTogglesAction: (state) => {
      state.profileMenu = false;
      state.filterBy = false;
      state.bg = false;
      state.addUser = false;
      state.bgDark = false;
      state.addUserSuccess = false;
      state.sideMenu = false;
    },
  },
});

export const {
  setBgAction,
  setFilterByAction,
  setAddUserAction,
  setBgDarkAction,
  setAddUserSuccessAction,
  setSideMenuAction,
  setProfileMenuAction,
  clearAllTogglesAction,
  setAddTicketAction,
} = toggleSlice.actions;
