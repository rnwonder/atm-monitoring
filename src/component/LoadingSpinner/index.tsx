import React from "react";
import "./styles.scss";

export interface ILoadingSpinner {
    color?: string
}

const LoadingSpinner: React.FunctionComponent<ILoadingSpinner> = ({ color }) => {
  return (
    <div className="loading-spinner">
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle stroke={color || "white"} cx="50" cy="50" r="46" />
      </svg>
    </div>
  );
};

export default LoadingSpinner;
