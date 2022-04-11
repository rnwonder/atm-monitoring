import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  branchData,
  cashStatusData,
  designationData,
  operationalStatusData,
  roleData,
  statusData2,
} from "../../constants/selectDatas";
import { IReduxState } from "../../interface/reduxState";
import {
  setTerminalFilterBranchAction,
  setTerminalFilterCashStatusAction,
  setTerminalFilterOperationalStatusAction,
  setTerminalFilterZoneAction,
} from "../../redux/slice/terminalSlice";
import { setUsersTableFilterBranchAction, setUsersTableFilterDesignationAction, setUsersTableFilterRoleAction, setUsersTableFilterStatusAction } from "../../redux/slice/usersTableSlice";
import CustomInput from "../CustomInput";
import "./styles.scss";

export interface IFilterBy {
  users?: boolean;
}

const zoneData = ["All"];

const FilterBy: React.FunctionComponent<IFilterBy> = ({ users }) => {
  const { filterBy: show } = useSelector((state: IReduxState) => state.toggle);
  const {
    filterParameters: { designation, role, branch: usersBranch, status },
  } = useSelector((state: IReduxState) => state.usersTable);
  const {
    filterParameters: { zone, branch, cashStatus, operationalStatus },
  } = useSelector((state: IReduxState) => state.terminal);
  const dispatch = useDispatch();

  useEffect(() => {}, []);

  const handleSelectChange = (e: any, action: any) => {
    dispatch(action(e.target.value));
  };

  return (
    <div className={`filter-by ${show && "show"} `}>
      {users && (
        <>
          <div className="select-optn">
            <CustomInput
              type="select"
              grey
              label="Designation"
              placeholder="All"
              selectData={designationData}
              value={designation}
              handleSelectChange={(e) =>
                handleSelectChange(e, setUsersTableFilterDesignationAction)
              }
            />
          </div>

          <div className="select-optn">
            <CustomInput
              type="select"
              grey
              label="Role"
              placeholder="All"
              selectData={roleData}
              value={role}
              handleSelectChange={(e) =>
                handleSelectChange(e, setUsersTableFilterRoleAction)
              }
            />
          </div>

          <div className="select-optn">
            <CustomInput
              type="select"
              grey
              label="Branch"
              placeholder="All"
              selectData={branchData}
              value={usersBranch}
              handleSelectChange={(e) =>
                handleSelectChange(e, setUsersTableFilterBranchAction)
              }
            />
          </div>

          <div className="select-optn">
            <CustomInput
              type="select"
              grey
              label="Status"
              placeholder="All"
              selectData={statusData2}
              value={status}
              handleSelectChange={(e) =>
                handleSelectChange(e, setUsersTableFilterStatusAction)
              }
            />
          </div>
        </>
      )}
      {!users && (
        <>
          <div className="select-optn">
            <CustomInput
              type="select"
              grey
              label="Zone"
              status="Coming Soon"
              selectData={zoneData}
              value={zone}
              handleSelectChange={(e) => handleSelectChange(e, setTerminalFilterZoneAction)}
            />
          </div>

          <div className="select-optn">
            <CustomInput
              type="select"
              grey
              label="Branch"
              status="Coming Soon"
              placeholder="Filter by branch"
              selectData={branchData}
              value={branch}
              handleSelectChange={(e) => handleSelectChange(e, setTerminalFilterBranchAction)}
            />
          </div>

          <div className="select-optn">
            <CustomInput
              type="select"
              grey
              label="Cash Status"
              placeholder="All"
              selectData={cashStatusData}
              value={cashStatus}
              handleSelectChange={(e) => handleSelectChange(e, setTerminalFilterCashStatusAction)}
            />
          </div>

          <div className="select-optn">
            <CustomInput
              type="select"
              grey
              label="Operational Status"
              placeholder="All"
              selectData={operationalStatusData}
              value={operationalStatus}
              handleSelectChange={(e) =>
                handleSelectChange(e, setTerminalFilterOperationalStatusAction)
              }
            />
          </div>
        </>
      )}
    </div>
  );
};

export default FilterBy;
