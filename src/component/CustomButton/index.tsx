import React, { ReactNode } from "react";
import LoadingSpinner from "../LoadingSpinner";
import "./styles.scss";

export interface ICustomButton {
  label: string;
  handleClick: () => void;
  icon?: ReactNode;
  grey?: boolean;
  light?: boolean;
  side?: boolean;
  loading?: boolean;
  disabled?: boolean
}

const CustomButton: React.FunctionComponent<ICustomButton> = ({
  label,
  handleClick,
  icon,
  grey,
  light,
  side,
  loading,
  disabled,
}) => {
  return (
    <button
      className={`custom-button  ${light ? "light" : " bg-black text-light"} ${
        grey && "grey"
      } ${side && "side"}`}
      onClick={handleClick} disabled={disabled}
    >
      {!loading && <>
        {icon} <span>{label}</span>
      </>}
      
      {loading && (
        <LoadingSpinner />
      )}
    </button>
  );
};

export default CustomButton;
