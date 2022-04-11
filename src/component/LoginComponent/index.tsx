import React from "react";
import CustomButton from "../CustomButton";
import CustomInput from "../CustomInput";
import "./styles.scss";

export interface ILoginComponent {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  loading: boolean;
  handleLogin: () => void;
  showChangePassword: boolean
}

const LoginComponent: React.FunctionComponent<ILoginComponent> = ({
  email,
  setEmail,
  password,
  setPassword,
  loading,
  handleLogin,
  showChangePassword,
}) => {
  return (
    <div className={`auth-area ${!showChangePassword && 'show'} `}>
      <h1 className="text-black">Log in to your account</h1>

      <div className="input-area">
        <CustomInput
          type="email"
          value={email}
          setValue={setEmail}
          label="Email Address"
        />
      </div>

      <div className="input-area">
        <CustomInput
          type="password"
          value={password}
          setValue={setPassword}
          label="Password"
        />
      </div>

      <a href="#" className="forget-pass text-black">
        Forget Password?
      </a>

      <div className="btn-area">
        <CustomButton
          loading={loading}
          disabled={loading}
          label="Log in"
          handleClick={handleLogin}
        />
      </div>
    </div>
  );
};

export default LoginComponent;
