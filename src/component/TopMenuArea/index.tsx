import React, { ReactNode, useState } from "react";
import { useDispatch } from "react-redux";
import exportDataFunction from "../../functions/Export";
import { ITerminalData } from "../../interface/terminalData";
import {
  setAddTicketAction,
  setAddUserAction,
  setBgAction,
  setBgDarkAction,
  setFilterByAction,
} from "../../redux/slice/toggleSlice";
import CustomButton from "../CustomButton";
import CustomInput from "../CustomInput";
import {IUsersData} from '../../interface/usersData';
import "./styles.scss";

export interface ITopMenuArea {
  back?: boolean;
  user?: boolean;
  issues?: boolean;
  handleBack?: () => void;
  clickMe?: HTMLAnchorElement | null | undefined;
  exportDataName?: string
  exportData?: ITerminalData[] | IUsersData[]
  setSearch: React.Dispatch<React.SetStateAction<string>>
  search: string
}

const filterOnHoverIcon = (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M21 4V6H20L14 15V22H10V15L4 6H3V4H21Z" fill="#09121F" />
  </svg>
);

const filterNotHoverIcon = (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M21 4V6H20L15 13.5V22H9V13.5L4 6H3V4H21ZM6.404 6L11 12.894V20H13V12.894L17.596 6H6.404Z"
      fill="#09121F"
    />
  </svg>
);

const TopMenuArea: React.FunctionComponent<ITopMenuArea> = ({
  back,
  user,
  handleBack,
  clickMe,
  issues,
  exportData,
  exportDataName,
  setSearch,
  search
}) => {
  const [loading, setLoading] = useState(false)
  const [filterIcon, setfilterIcon] = useState<ReactNode>(filterNotHoverIcon);
  const dispatch = useDispatch();

  const handleFilter = () => {
    dispatch(setFilterByAction(true));
    dispatch(setBgAction(true));
  };

  const handleAddUser = () => {
    dispatch(setAddUserAction(true));
    dispatch(setBgDarkAction(true));
  };

  const handleExport = () => {
    setLoading(true)
    // clickMe?.click();
    if(!exportData || !exportDataName) return setLoading(false)
    const file = exportDataFunction(exportData, exportDataName, exportDataName)
    if(file) {
      setLoading(false)
    }
  };

  const handleAddTicket = () => {
    dispatch(setAddUserAction(true));
    dispatch(setAddTicketAction(true));
    dispatch(setBgDarkAction(true));
  }
  return (
    <div className="top-menu-area d-flex justify-content-between align-items-center">
      <div className="left-area d-flex align-items-center">
        {back && handleBack ? (
          <div className="back-btn">
            <CustomButton
              light
              icon={
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3.828 6.99998H16V8.99998H3.828L9.192 14.364L7.778 15.778L0 7.99998L7.778 0.221985L9.192 1.63598L3.828 6.99998Z"
                    fill="#09121F"
                  />
                </svg>
              }
              label="Back"
              handleClick={handleBack}
            />
          </div>
        ) : (
          <>
            <div
              className="filter d-flex"
              onClick={handleFilter}
              onMouseOver={() => setfilterIcon(filterOnHoverIcon)}
              onMouseLeave={() => setfilterIcon(filterNotHoverIcon)}
            >
              {filterNotHoverIcon}
              <span>Filter</span>
            </div>

            <div className="search-area">
              <CustomInput
                type="search"
                value={search}
                setValue={setSearch}
                placeholder={"Search"}
              />
            </div>
          </>
        )}
      </div>

      <div className="right-area d-flex">
        {user && (
          <div className="button add-user">
            <CustomButton
              icon={
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5.16699 5.16675V0.166748H6.83366V5.16675H11.8337V6.83342H6.83366V11.8334H5.16699V6.83342H0.166992V5.16675H5.16699Z"
                    fill="white"
                  />
                </svg>
              }
              label="Add User"
              handleClick={handleAddUser}
            />
          </div>
        )}

        {issues && (
          <div className="button add-ticket">
            <CustomButton
              icon={
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5.16699 5.16675V0.166748H6.83366V5.16675H11.8337V6.83342H6.83366V11.8334H5.16699V6.83342H0.166992V5.16675H5.16699Z"
                    fill="white"
                  />
                </svg>
              }
              label="Create Ticket"
              handleClick={handleAddTicket}
            />
          </div>
        )}

        <div className="button">
          <CustomButton
            icon={
              <svg
                width="12"
                height="11"
                viewBox="0 0 12 11"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.33618 2.845L2.16368 10.0175L0.985352 8.83917L8.15702 1.66667H1.83619V0H11.0029V9.16667H9.33618V2.845Z"
                  fill="white"
                />
              </svg>
            }
            label="Export"
            grey
            handleClick={handleExport}
          />
        </div>
      </div>
    </div>
  );
};

export default TopMenuArea;
