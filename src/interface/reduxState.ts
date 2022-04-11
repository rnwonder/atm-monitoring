import { IFilterSlice } from "../redux/slice/filterSlice";
import { ITerminalSlice } from "../redux/slice/terminalSlice";
import { IUser } from "../redux/slice/userSlice";
import { IUsersTableSlice } from "../redux/slice/usersTableSlice";
import { ISideMenuSlice } from "./sideMenu";
import { IToggleSlice } from "./toggle";

export interface IReduxState {
  sideMenu: ISideMenuSlice;
  toggle: IToggleSlice;
  user: IUser;
  filter: IFilterSlice;
  terminal: ITerminalSlice;
  usersTable: IUsersTableSlice
}
