import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IUser {
  fullName: string;
  email: string;
  role: string;
  branch: string;
  designation: string;
  changePassword: boolean;
  isActive: boolean;
  lastLogin: number;
  id: string;
}

const initialState: IUser = {
  id: "",
  fullName: "",
  email: "",
  role: "",
  branch: "",
  designation: "",
  changePassword: false,
  isActive: false,
  lastLogin: 0,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserAction: (state, { payload }: PayloadAction<Omit<IUser, "lastLogin">>) => {
      state.id = payload.id;
      state.email = payload.email;
      state.fullName = payload.fullName;
      state.role = payload.role;
      state.branch = payload.branch;
      state.designation = payload.designation;
      state.changePassword = payload.changePassword;
      state.isActive = payload.isActive;
    },
    clearUserAction: {
      reducer: (state) => {
        state.email = "";
        state.fullName = "";
        state.role = "";
        state.branch = "";
        state.designation = "";
        state.changePassword = false;
        state.isActive = false;
        state.lastLogin = 0;
      },
      //@ts-ignore
      prepare: () => {
        localStorage.removeItem("lastloginTime");
        return {};
      },
    },
    setLastLoginAction: {
      reducer: (state, { payload }: PayloadAction<number>) => {
        state.lastLogin = payload;
      },
      prepare: (data: number) => {
        localStorage.setItem("lastloginTime", JSON.stringify(data));
        return { payload: data };
      },
    },
  },
});

export const { setUserAction, clearUserAction, setLastLoginAction } = userSlice.actions;
