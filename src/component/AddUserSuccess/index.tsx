import React from "react";
import successIcon from "../../assets/graphics/Group.png";
import CustomButton from "../CustomButton";
import "../AddUserForm/styles.scss";
import "./styles.scss";
import { useDispatch, useSelector } from "react-redux";
import { IReduxState } from "../../interface/reduxState";
import {setAddUserSuccessAction, setBgDarkAction, setAddTicketAction} from '../../redux/slice/toggleSlice';

export interface IAddUserSuccess {}

const AddUserSuccess: React.FunctionComponent<IAddUserSuccess> = ({}) => {
  const { addUserSuccess: show, addTicket: ticket } = useSelector((state: IReduxState) => state.toggle);
  const dispatch = useDispatch()

  // let ticket = true

  const handleContinue = () => {
    dispatch(setAddUserSuccessAction(false))
    dispatch(setBgDarkAction(false))
    dispatch(setAddTicketAction(false));
  }
  return (
    <div
      className={`add-user-success ${!show && "hide"} add-user-form d-flex justify-content-center align-items-center flex-column`}
    >
      <h3>Success</h3>
      <div className="subtitle">{ticket? "Ticket": "User"} Added Successfully</div>

      <div className="graphic">
        <img src={successIcon} alt="" />
      </div>

      <div className="button ">
        <CustomButton  label="Continue" handleClick={handleContinue} />
      </div>
    </div>
  );
};

export default AddUserSuccess;
