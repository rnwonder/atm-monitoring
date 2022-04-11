import React, { useEffect, useLayoutEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "./styles.scss";
import { useDispatch, useSelector } from "react-redux";
import { setLastLoginAction, setUserAction, clearUserAction } from "../../redux/slice/userSlice";
import { useNavigate } from "react-router-dom";
import {
  clearAllTogglesAction,
} from "../../redux/slice/toggleSlice";
import { setCurrentPageAction } from "../../redux/slice/sideMenuSlice";
import axiosInstance from "../../helper/axiosInstance";
import LoginComponent from "../../component/LoginComponent";
import ChangePassword from "../../component/ChangePassword";
import { IReduxState } from "../../interface/reduxState";
import SuspenseLoader from "../../component/SuspenseLoader";

export interface IAuth {}

const Auth: React.FunctionComponent<IAuth> = ({}) => {
  const { changePassword, fullName, id: userId } = useSelector((state: IReduxState) => state.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [auth, setAuth] = useState(true);
  const [loadingPage, setLoadingPage] = useState(true);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth) return;
    dispatch(clearAllTogglesAction());
    dispatch(setCurrentPageAction({ currentPage: "Overview" }));
  }, [auth, dispatch]);

  useEffect(() => {
    const lastLogin = localStorage.getItem("lastloginTime");
    if (changePassword && fullName) {
      setShowChangePassword(true);
      setLoadingPage(false);
    }

    if (!changePassword && fullName && !lastLogin) {
      dispatch(setLastLoginAction(Date.now()));
      navigate("/dashboard");
    }

    if (!changePassword && fullName && lastLogin) {
      navigate("/dashboard");
    }
  }, [changePassword, dispatch, fullName, navigate]);

  useLayoutEffect(() => {
    const id = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    if (id && token) {
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
        })
        .catch((err) => {
          if (err.response.data.message && err.response.data.message.name === "TokenExpiredError") {
            //@ts-ignore
            dispatch(clearUserAction());
            localStorage.removeItem("userId");
            localStorage.removeItem("token");
            localStorage.removeItem("lastloginTime");
            navigate("/");
          }
          setAuth(false);
          setLoadingPage(false);
        });
    } else {
      setAuth(false);
      setLoadingPage(false);
    }
  }, []);

  const handleChangePassword = () => {
    setLoading(true);

    axiosInstance
      .put(`/api/change-password/${userId}`, {
        password,
        new_password: newPassword,
        confirm_password: confirmPassword,
      })
      .then((res) => {
        setLoading(false);
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
      })
      .catch((err) => {
        setLoading(false);
        if (err.response.data.data.message.confirm_password) {
          toast.error(err.response.data.data.message.confirm_password.message);
        }

        if (err.response.data.data.message && !err.response.data.data.message.confirm_password) {
          toast.error(err.response.data.data.message);
        }
      });
  };

  const handleLogin = () => {
    setLoading(true);

    axiosInstance
      .post("/api/login", { email, password })
      .then((res) => {
        setLoading(false);
        if (!res.data.data.message.is_active) {
          toast.error("This account is inactive please contact admin");
          return;
        }
        localStorage.setItem("token", res.data.data.message.token);
        localStorage.setItem("userId", res.data.data.message.id);
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
        return res.data;
      })
      .catch((err) => {
        if (err.response.data.data.message.email) {
          toast.error(err.response.data.data.message.email.message);
        }
        if (err.response.data.data.message.password) {
          toast.error(err.response.data.data.message.password.message);
        }

        if (
          err.response.data.data.message &&
          !err.response.data.data.message.email &&
          !err.response.data.data.message.password
        ) {
          toast.error(err.response.data.data.message);
        }
        setLoading(false);
        return { message: "Fail", error: err.response.data };
      });
  };
  return (
    <>
      {loadingPage && <SuspenseLoader />}

      {!loadingPage && (
        <div className="auth d-flex  align-items-center flex-column">
          <div className="logo-area"></div>

          <div className="auth-stuffs">
            <LoginComponent
              email={email}
              handleLogin={handleLogin}
              loading={loading}
              password={password}
              setEmail={setEmail}
              setPassword={setPassword}
              showChangePassword={showChangePassword}
            />
            <ChangePassword
              confirmPassword={confirmPassword}
              handleChangePassword={handleChangePassword}
              loading={loading}
              newPassword={newPassword}
              password={password}
              setConfirmPassword={setConfirmPassword}
              setNewPassword={setNewPassword}
              setPassword={setPassword}
              showChangePassword={showChangePassword}
            />
          </div>

          <ToastContainer hideProgressBar theme="colored" />
        </div>
      )}
    </>
  );
};

export default Auth;
