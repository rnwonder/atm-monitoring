import React from "react";
import CustomInput from "../CustomInput";
import CustomButton from "../CustomButton";
import "./styles.scss";

export interface IChangePassword {
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  newPassword: string;
  setNewPassword: React.Dispatch<React.SetStateAction<string>>;
  confirmPassword: string;
  setConfirmPassword: React.Dispatch<React.SetStateAction<string>>;
  loading: boolean
  handleChangePassword: () => void;
  showChangePassword: boolean
}

const ChangePassword: React.FunctionComponent<IChangePassword> = ({
  password,
  setPassword,
  newPassword,
  setNewPassword,
  confirmPassword,
  setConfirmPassword,
  loading,
  handleChangePassword,
  showChangePassword,
}) => {
  return (
    <div className={`change-password ${showChangePassword && 'show'} `}>
      <h1 className="text-black">Please change your password</h1>

      <div className="input-area">
        <CustomInput
          type="password"
          value={password}
          setValue={setPassword}
          label="Old password"
        />
      </div>

      <div className="input-area">
        <CustomInput
          type="password"
          value={newPassword}
          setValue={setNewPassword}
          label="New password"
        />
      </div>

      <div className="input-area">
        <CustomInput
          type="password"
          value={confirmPassword}
          setValue={setConfirmPassword}
          label="Confirm new password"
        />
      </div>

      <div className="btn-area">
        <CustomButton
          loading={loading}
          disabled={loading}
          label="Change Password"
          handleClick={handleChangePassword}
        />
      </div>
    </div>
  );
};

export default ChangePassword;
