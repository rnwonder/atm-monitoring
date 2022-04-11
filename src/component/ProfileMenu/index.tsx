import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IReduxState } from "../../interface/reduxState";
import { setBgAction, setProfileMenuAction } from "../../redux/slice/toggleSlice";
import { clearUserAction } from "../../redux/slice/userSlice";
import "./styles.scss";

export interface IProfileMenu {}

const ProfileMenu: React.FunctionComponent<IProfileMenu> = ({}) => {
  const { profileMenu: show } = useSelector(
    (state: IReduxState) => state.toggle
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    dispatch(setBgAction(false))
    dispatch(setProfileMenuAction(false))
    //@ts-ignore
    dispatch(clearUserAction());
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    localStorage.removeItem("lastloginTime");
    navigate('/')
    
  };
  return (
    <div className={`profile-menu ${!show && "hide"}`}>
      <div className="optn" onClick={handleLogout}>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11 7L9.6 8.4L12.2 11H2V13H12.2L9.6 15.6L11 17L16 12L11 7ZM20 19H12V21H20C21.1 21 22 20.1 22 19V5C22 3.9 21.1 3 20 3H12V5H20V19Z"
            fill="#323232"
          />
        </svg>

        <span>Logout</span>
      </div>
    </div>
  );
};

export default ProfileMenu;
