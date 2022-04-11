import { configureStore } from "@reduxjs/toolkit";
import { filterSlice } from "./slice/filterSlice";
import { sideMenuSlice } from "./slice/sideMenuSlice";
import { terminalSlice } from "./slice/terminalSlice";
import { toggleSlice } from "./slice/toggleSlice";
import { userSlice } from "./slice/userSlice";
import { usersTableSlice } from "./slice/usersTableSlice";

const reducer = {
    sideMenu: sideMenuSlice.reducer,
    toggle: toggleSlice.reducer,
    user: userSlice.reducer,
    filter: filterSlice.reducer,
    terminal: terminalSlice.reducer,
    usersTable: usersTableSlice.reducer,
}

export default configureStore({
    reducer
})