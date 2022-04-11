import React, { useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import "./styles.scss";

export interface ICustomInput {
  type: "text" | "password" | "select" | "search" | "email" | "checkbox" | "textarea";
  label?: string;
  placeholder?: string;
  setValue?: React.Dispatch<React.SetStateAction<string>>;
  checkedValue?: boolean;
  setCheckedValue?: React.Dispatch<React.SetStateAction<boolean>>;
  value?: string;
  selectData?: string[] | { name: string; value: string }[];
  grey?: boolean;
  page?: boolean;
  status?: string;
  handleSelectChange?: (event: any) => void;
}

const CustomInput: React.FunctionComponent<ICustomInput> = ({
  type,
  label,
  placeholder,
  value,
  setValue,
  selectData,
  grey,
  page,
  setCheckedValue,
  checkedValue,
  status,
  handleSelectChange,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (event: any) => {
    if (!setValue) return;
    setValue(event.target.value);
  };

  return (
    <div className="custom-input d-flex flex-column">
      {label && type !== "checkbox" && <label htmlFor="">{label}</label>}

      {(type === "text" || type === "search" || type === "email") && setValue && (
        <div className={`input ${grey && "grey"}`}>
          <input
            type={type === "text" || type === "search" ? "text" : "email"}
            className={`${type === "search" && "search"}`}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={placeholder}
          />

          {type === "search" && (
            <svg
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="search-icon"
            >
              <path
                d="M6.5 12.5C7.8845 12.5 9.15725 12.0238 10.1728 11.234L13.4697 14.531L14.5303 13.4705L11.2333 10.1735C12.0238 9.15725 12.5 7.8845 12.5 6.5C12.5 3.19175 9.80825 0.5 6.5 0.5C3.19175 0.5 0.5 3.19175 0.5 6.5C0.5 9.80825 3.19175 12.5 6.5 12.5ZM6.5 2C8.98175 2 11 4.01825 11 6.5C11 8.98175 8.98175 11 6.5 11C4.01825 11 2 8.98175 2 6.5C2 4.01825 4.01825 2 6.5 2Z"
                fill="#667E93"
              />
            </svg>
          )}
        </div>
      )}
      {type === "password" && setValue && (
        <div className={`input ${grey && "grey"}`}>
          <input
            type={showPassword ? "text" : "password"}
            className=""
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={placeholder}
          />
          {showPassword ? (
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="password-icon"
              onClick={() => setShowPassword(false)}
            >
              <path
                d="M12 3C17.392 3 21.878 6.88 22.819 12C21.879 17.12 17.392 21 12 21C6.60803 21 2.12203 17.12 1.18103 12C2.12103 6.88 6.60803 3 12 3ZM12 19C14.0395 18.9996 16.0184 18.3068 17.6129 17.0352C19.2074 15.7635 20.3229 13.9883 20.777 12C20.3213 10.0133 19.205 8.24 17.6107 6.97003C16.0163 5.70005 14.0383 5.00853 12 5.00853C9.96173 5.00853 7.98372 5.70005 6.38941 6.97003C4.79509 8.24 3.6788 10.0133 3.22303 12C3.67713 13.9883 4.7927 15.7635 6.38717 17.0352C7.98164 18.3068 9.96056 18.9996 12 19V19ZM12 16.5C10.8066 16.5 9.66196 16.0259 8.81805 15.182C7.97414 14.3381 7.50003 13.1935 7.50003 12C7.50003 10.8065 7.97414 9.66193 8.81805 8.81802C9.66196 7.97411 10.8066 7.5 12 7.5C13.1935 7.5 14.3381 7.97411 15.182 8.81802C16.0259 9.66193 16.5 10.8065 16.5 12C16.5 13.1935 16.0259 14.3381 15.182 15.182C14.3381 16.0259 13.1935 16.5 12 16.5ZM12 14.5C12.6631 14.5 13.299 14.2366 13.7678 13.7678C14.2366 13.2989 14.5 12.663 14.5 12C14.5 11.337 14.2366 10.7011 13.7678 10.2322C13.299 9.76339 12.6631 9.5 12 9.5C11.337 9.5 10.7011 9.76339 10.2323 10.2322C9.76342 10.7011 9.50003 11.337 9.50003 12C9.50003 12.663 9.76342 13.2989 10.2323 13.7678C10.7011 14.2366 11.337 14.5 12 14.5Z"
                fill="#09121F"
              />
            </svg>
          ) : (
            <svg
              width="20"
              height="18"
              viewBox="0 0 20 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="password-icon"
              onClick={() => setShowPassword(true)}
            >
              <path
                d="M14.9019 15.0809C13.4362 16.0105 11.7358 16.5028 10.0002 16.5001C5.50688 16.5001 1.76854 13.2667 0.984375 9.00006C1.34273 7.05899 2.31907 5.2858 3.76771 3.94506L1.16021 1.34006L2.33938 0.160889L18.8385 16.6609L17.6594 17.8392L14.901 15.0809H14.9019ZM4.94604 5.12505C3.81355 6.15471 3.02464 7.50737 2.68604 9.00006C2.94629 10.1388 3.46876 11.201 4.21188 12.1022C4.95499 13.0034 5.89823 13.7187 6.9665 14.1911C8.03477 14.6636 9.19858 14.8801 10.3653 14.8235C11.532 14.7669 12.6694 14.4387 13.6869 13.8651L11.9969 12.1751C11.2775 12.6282 10.4254 12.8235 9.58041 12.7288C8.73544 12.634 7.94774 12.255 7.34652 11.6537C6.74529 11.0525 6.36623 10.2648 6.27151 9.41986C6.17679 8.57489 6.37203 7.72281 6.82521 7.00339L4.94604 5.12505ZM10.7619 10.9401L8.06021 8.23839C7.91193 8.61584 7.87703 9.02835 7.9598 9.42534C8.04256 9.82233 8.23939 10.1865 8.52614 10.4733C8.81289 10.76 9.1771 10.9569 9.57409 11.0396C9.97108 11.1224 10.3836 11.0875 10.761 10.9392L10.7619 10.9401ZM17.3394 12.8267L16.1469 11.6351C16.7039 10.8411 17.1005 9.94604 17.3144 9.00006C17.0879 8.00816 16.6621 7.07268 16.0628 6.25047C15.4636 5.42826 14.7034 4.73649 13.8284 4.21723C12.9535 3.69796 11.9821 3.36203 10.9733 3.22986C9.96452 3.09769 8.93938 3.17204 7.96021 3.44839L6.64521 2.13339C7.68438 1.72506 8.81688 1.50006 10.0002 1.50006C14.4935 1.50006 18.2319 4.73339 19.016 9.00006C18.7607 10.3881 18.1868 11.698 17.3394 12.8267ZM9.76937 5.25672C10.2998 5.22394 10.8311 5.30428 11.3282 5.4924C11.8252 5.68053 12.2766 5.97215 12.6523 6.34793C13.0281 6.72371 13.3197 7.17508 13.5079 7.6721C13.696 8.16913 13.7763 8.70046 13.7435 9.23089L9.76854 5.25672H9.76937Z"
                fill="#09121F"
              />
            </svg>
          )}
        </div>
      )}

      {type === "select" && selectData && (
        <div className={`input ${grey && "grey"} ${page && "page"}`}>
          <FormControl fullWidth>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={value}
              displayEmpty
              onChange={(e) => {
                handleSelectChange ? handleSelectChange(e) : handleChange(e);
              }}
            >
              {status && (
                <MenuItem value="">
                  <em>{status}</em>
                </MenuItem>
              )}
              {placeholder && !status && <MenuItem value="">{placeholder}</MenuItem>}
              {!status &&
                selectData.map((el, i) => {
                  if (el instanceof Object && !(el instanceof Array)) {
                    return (
                      <MenuItem key={i} value={el.value}>
                        {el.name}
                      </MenuItem>
                    );
                  }
                  return (
                    <MenuItem key={i} value={el}>
                      {el}
                    </MenuItem>
                  );
                })}
            </Select>
          </FormControl>
        </div>
      )}

      {type === "checkbox" && label && setCheckedValue && (
        <div className="input">
          <FormGroup aria-label="position" row>
            <FormControlLabel
              value="end"
              control={
                <Checkbox
                  checked={checkedValue}
                  onChange={(e) => setCheckedValue(e.target.checked)}
                />
              }
              label={label}
              labelPlacement="end"
            />
          </FormGroup>
        </div>
      )}

      {type === "textarea" && (
        <div className="input">
          <textarea placeholder={placeholder} name="" id=""></textarea>
        </div>
      )}
    </div>
  );
};

export default CustomInput;
