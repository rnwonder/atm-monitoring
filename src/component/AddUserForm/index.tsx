import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {toast, ToastContainer} from 'react-toastify';
import { branchData, designationData, roleData, statusData } from "../../constants/selectDatas";
import axiosInstance from "../../helper/axiosInstance";
import { IReduxState } from "../../interface/reduxState";
import {
  setAddTicketAction,
  setAddUserAction,
  setAddUserSuccessAction,
  setBgDarkAction,
} from "../../redux/slice/toggleSlice";
import CustomButton from "../CustomButton";
import CustomInput from "../CustomInput";
import "./styles.scss";

export interface IAddUserForm {}


const typeOfIssueData = ["Card Reader"];

const AddUserForm: React.FunctionComponent<IAddUserForm> = ({}) => {
  const { addUser: show, addTicket: ticket } = useSelector((state: IReduxState) => state.toggle);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [designation, setDesignation] = useState("");
  const [branch, setBranch] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("Active");
  const [userChangePass, setUserChangePass] = useState(true);
  const [typeOfIssue, setTypeOfIssue] = useState("Card Reader");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch();

  // let ticket = true;
  const handleCancel = () => {
    dispatch(setAddUserAction(false));
    dispatch(setBgDarkAction(false));
    setTimeout(() => {
      dispatch(setAddTicketAction(false));
    }, 300);
  };

  const handleAddUser = () => {
    setLoading(true)
    axiosInstance.post("/api/create-user", {
      fullname: fullName,
      email,
      designation,
      role,
      branch,
      change_password: userChangePass,
    })
    .then(res => {
      console.log(res.data)
      setLoading(false)
      setFullName('')
      setEmail('')
      setDesignation('')
      setRole('')
      setBranch('')
      setUserChangePass(true)
      dispatch(setAddUserAction(false));
      dispatch(setAddUserSuccessAction(true));
    })
    .catch(err => {
      if(err.response.data.data.message.fullname) {
        toast.error(err.response.data.data.message.fullname.message)
      }
      if(err.response.data.data.message.email) {
        toast.error(err.response.data.data.message.email.message)
      }
      if(err.response.data.data.message.designation) {
        toast.error(err.response.data.data.message.designation.message)
      }
      if(err.response.data.data.message.role) {
        toast.error(err.response.data.data.message.role.message)
      }
      if(err.response.data.data.message.branch) {
        toast.error(err.response.data.data.message.branch.message)
      }
      setLoading(false)
    })
    
  };

  const handleCreateTicket = () => {
    dispatch(setAddUserAction(false));
    dispatch(setAddUserSuccessAction(true));
  };

  useEffect(() => {
    if (ticket) {
      console.log("ticket", ticket);
    }
  }, [ticket]);
  return (
    <div className={`add-user-form ${!show && "hide"} `}>
      <div className="title-area d-flex justify-content-between">
        <div className="title">{ticket ? "Create Ticket" : "Add User"} </div>
        <div className="close" onClick={handleCancel}>
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.99974 5.58599L11.9497 0.635986L13.3637 2.04999L8.41374 6.99999L13.3637 11.95L11.9497 13.364L6.99974 8.41399L2.04974 13.364L0.635742 11.95L5.58574 6.99999L0.635742 2.04999L2.04974 0.635986L6.99974 5.58599Z"
              fill="#09121F"
            />
          </svg>
        </div>
      </div>

      <div className="form-area scrollbar">
        {ticket && (
          <div className="form d-flex flex-column">
            <div className="input-area">
              <CustomInput
                type="select"
                label="Type Of Issue"
                value={typeOfIssue}
                setValue={setTypeOfIssue}
                selectData={typeOfIssueData}
                grey
              />
            </div>

            <div className="input-area">
              <CustomInput
                type="textarea"
                label="Description"
                placeholder="Describe the issue"
                value={description}
                setValue={setDescription}
              />
            </div>
          </div>
        )}
        {!ticket && (
          <div className="form d-flex">
            <div className="input-area">
              <CustomInput
                type="text"
                label="Full Name"
                placeholder="Enter full name"
                value={fullName}
                setValue={setFullName}
              />
            </div>

            <div className="input-area">
              <CustomInput
                type="email"
                label="Email Address"
                placeholder="example@guru.com"
                value={email}
                setValue={setEmail}
              />
            </div>
          </div>
        )}

        <div className="form d-flex">
          <div className="input-area">
            <CustomInput
              type="select"
              label="Designation"
              placeholder="Select a designation"
              value={designation}
              setValue={setDesignation}
              selectData={designationData}
              grey
            />
          </div>

          <div className="input-area">
            <CustomInput
              type="select"
              label="Role"
              placeholder="Select a role"
              value={role}
              setValue={setRole}
              selectData={roleData}
              grey
            />
          </div>
        </div>

        <div className="form d-flex">
          <div className="input-area">
            <CustomInput
              type="select"
              label="Branch"
              placeholder="Select a branch"
              value={branch}
              setValue={setBranch}
              selectData={branchData}
              grey
            />
          </div>

          <div className="input-area">
            <CustomInput
              type="select"
              label="Status"
              placeholder="Select status"
              value={status}
              setValue={setStatus}
              selectData={statusData}
              grey
            />
          </div>
        </div>

        {!ticket && (
          <div className="checkbox-area">
            <CustomInput
              type="checkbox"
              label="Force user to change password on first log in"
              checkedValue={userChangePass}
              setCheckedValue={setUserChangePass}
            />
          </div>
        )}
      </div>

      <div className="button-area d-flex justify-content-end">
        <div className="button">
          <CustomButton label="Cancel" grey handleClick={handleCancel} />
        </div>

        {ticket ? (
          <div className="button crt-tick">
            <CustomButton label="Create Ticket" handleClick={handleCreateTicket} />
          </div>
        ) : (
          <div className="button">
            <CustomButton loading={loading} disabled={loading} label="Add User" handleClick={handleAddUser} />
          </div>
        )}
      </div>

      
    </div>
  );
};

export default AddUserForm;
