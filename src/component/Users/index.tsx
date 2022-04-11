import React, { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../../helper/axiosInstance";
import { IReduxState } from "../../interface/reduxState";
import { IUsersData } from "../../interface/usersData";
import {
  setFilteredUsersTableDataAction,
  setMainUsersTableDataAction,
} from "../../redux/slice/usersTableSlice";
import FilterBy from "../FilterBy";
import TopMenuArea from "../TopMenuArea";
import UsersTable from "../UsersTable";
import "./styles.scss";

export interface IUsers {
  sideMenuWidth: number;
  dashboardWidth: number;
}

const Users: React.FunctionComponent<IUsers> = ({ sideMenuWidth, dashboardWidth }) => {
  const { currentPage } = useSelector((state: IReduxState) => state.sideMenu);
  const {
    main,
    filtered,
    filterParameters: { role, designation, status, branch },
  } = useSelector((state: IReduxState) => state.usersTable);
  const { addUserSuccess } = useSelector((state: IReduxState) => state.toggle);
  const [usersData, setUsersData] = useState<IUsersData[]>([]);
  const [exportData, setExportData] = useState<IUsersData[]>([]);
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  useLayoutEffect(() => {
    axiosInstance
      .get("/api/users")
      .then((res) => {
        dispatch(setMainUsersTableDataAction(res.data.data.message));
      })
      .catch((err) => {
        console.error(err.response);
      });
  }, [addUserSuccess, dispatch]);

  useEffect(() => {
    let filterData = main;

    if (role) {
      const data = filterData.filter((el) => el.role === role);
      filterData = data;
    }

    if (designation) {
      const data = filterData.filter((el) => el.designation === designation);
      filterData = data;
    }

    if (status === "Active") {
      const data = filterData.filter((el) => el.is_active);
      filterData = data;
    }

    if (status === "Inactive") {
      const data = filterData.filter((el) => !el.is_active);
      filterData = data;
    }

    if (branch) {
      const data = filterData.filter((el) => el.branch === branch);
      filterData = data;
    }

    if (!status && !branch && !designation && !role) {
      dispatch(setFilteredUsersTableDataAction(main));
      return;
    }

    dispatch(setFilteredUsersTableDataAction(filterData));
  }, [branch, designation, dispatch, main, role, status]);

  useEffect(() => {
    if (search) {
      const data = filtered.filter((el) =>
        el.fullname.toLowerCase().includes(search.toLowerCase())
      );
      setUsersData(data);
      const eData: IUsersData[] = [];
      data.forEach((el) => eData.push({ ...el, password: "" }));
      setExportData(eData);
    } else {
      const eData: IUsersData[] = [];
      filtered.forEach((el) => eData.push({ ...el, password: "" }));
      setUsersData(filtered);
      setExportData(eData);
    }
  }, [filtered, search]);

  return (
    <div className={`users ${currentPage !== "Users" && "hide"}`}>
      <TopMenuArea
        exportDataName="Users"
        exportData={exportData}
        user
        setSearch={setSearch}
        search={search}
      />
      <UsersTable
        usersData={usersData}
        dashboardWidth={dashboardWidth}
        sideMenuWidth={sideMenuWidth}
      />
      <FilterBy users />
    </div>
  );
};

export default Users;
