import React, { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DashboardHeader from "../../component/DashboardHeader";
import Overview from "../../component/Overview";
import SideMenu from "../../component/SideMenu";
import Terminals from "../../component/Terminals";
import { IReduxState } from "../../interface/reduxState";
import {
  setBgAction,
  setFilterByAction,
  setProfileMenuAction,
  setSideMenuAction,
} from "../../redux/slice/toggleSlice";
import "../../component/scrollBarScss/styles.scss";
import "./styles.scss";
import Users from "../../component/Users";
import AddUserForm from "../../component/AddUserForm";
import AddUserSuccess from "../../component/AddUserSuccess";
import SuspenseLoader from "../../component/SuspenseLoader";
import { useNavigate } from "react-router-dom";
import {
  setLastLoginAction,
  setUserAction,
  clearUserAction,
} from "../../redux/slice/userSlice";
import Issues from "../../component/Issues";
import axiosInstance from "../../helper/axiosInstance";
import {ToastContainer} from 'react-toastify';

export interface IDashboard {}

const Dashboard: React.FunctionComponent<IDashboard> = () => {
  const { fullName } = useSelector((state: IReduxState) => state.user);
  const { bg: showBg, bgDark: showBgDark } = useSelector(
    (state: IReduxState) => state.toggle
  );
  const [dashboardWidth, setDashboardWidth] = useState(0);
  const [sideMenuWidth, setSideMenuWidth] = useState(0);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useLayoutEffect(() => {
    function updateSize() {
      setDashboardWidth(window.innerWidth);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  useEffect(() => {
    const id = localStorage.getItem("userId");
    const token = localStorage.getItem("token");
    const lastLoginTime = JSON.parse(
      localStorage.getItem("lastloginTime") || "{}"
    );
    if (lastLoginTime) {
      dispatch(setLastLoginAction(lastLoginTime));
    }
    if (!fullName) {
      if (!id || !token) {
        return navigate("/");
      } else {
        axiosInstance
          .get(`/api/user/${id}`)
          .then((res) => {
            dispatch(
              setUserAction({
                id: res.data.data.message.id,
                fullName: res.data.data.message.fullname,
                email: res.data.data.message.email,
                designation: res.data.data.message.designation,
                role: res.data.data.message.role,
                branch: res.data.data.message.branch,
                isActive: res.data.data.message.is_active,
                changePassword: res.data.data.message.change_password,
              })
            );
            setLoading(false)
          })
          .catch((err) => {
            if (
              err.response.data.message &&
              err.response.data.message.name === "TokenExpiredError"
            ) {
              //@ts-ignore
              dispatch(clearUserAction());
              localStorage.removeItem("userId");
              localStorage.removeItem("token");
              localStorage.removeItem("lastloginTime");
              navigate("/");
              setLoading(false)
            }
          });
      }
    } else {
      return setLoading(false);
    }
  }, [dispatch, fullName, navigate]);

  const handleBgClick = () => {
    dispatch(setFilterByAction(false));
    dispatch(setBgAction(false));
    dispatch(setSideMenuAction(false));
    dispatch(setProfileMenuAction(false));
  };
  return (
    <>
      {loading && <SuspenseLoader />}
      {!loading && (
        <div className="dashboard d-flex">
          <SideMenu
            dashboardWidth={dashboardWidth}
            setSideMenuWidth={setSideMenuWidth}
          />
          <div className="wrapper">
            <DashboardHeader />

            <div className="content-area scrollbar">
              <Overview />
              <Terminals
                sideMenuWidth={sideMenuWidth}
                dashboardWidth={dashboardWidth}
              />
              <Users
                sideMenuWidth={sideMenuWidth}
                dashboardWidth={dashboardWidth}
              />
              <Issues
                sideMenuWidth={sideMenuWidth}
                dashboardWidth={dashboardWidth}
              />
            </div>
          </div>
          <div
            className={`bg ${!showBg && "hide"} `}
            onClick={handleBgClick}
          ></div>
          <div className={`bg-dark ${!showBgDark && "hide"} `}></div>
          <AddUserForm />
          <AddUserSuccess />
          <ToastContainer hideProgressBar theme="colored" />
        </div>
      )}
    </>
  );
};

export default Dashboard;
