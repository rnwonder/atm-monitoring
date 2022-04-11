import React from "react";
import { useDispatch } from "react-redux";
import { IOperationalStatus } from "../../interface/terminalData";
import { setCurrentPageAction } from "../../redux/slice/sideMenuSlice";
import {
  setTerminalFilterBranchAction,
  setTerminalFilterCashStatusAction,
  setTerminalFilterOperationalStatusAction,
  setTerminalFilterZoneAction,
} from "../../redux/slice/terminalSlice";
import "./styles.scss";

export interface IOverviewCard {
  graph: "up" | "down";
  label: IOperationalStatus | "No of ATMs" | "Out of Cash";
  value: string;
  percentage: string;
}

const OverviewCard: React.FunctionComponent<IOverviewCard> = ({
  graph,
  label,
  value,
  percentage,
}) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(setTerminalFilterBranchAction(""));
    dispatch(setTerminalFilterCashStatusAction(""));
    dispatch(setTerminalFilterZoneAction(""));
    dispatch(setTerminalFilterOperationalStatusAction(""));
    if (label === "No of ATMs") {
      dispatch(setTerminalFilterOperationalStatusAction(""));
    } else if ((label === "Out of Cash")) {
      dispatch(setTerminalFilterCashStatusAction("Out of Cash"));
    } else {
      dispatch(setTerminalFilterOperationalStatusAction(label));
    }

    dispatch(setCurrentPageAction({currentPage: "Terminals"}))
  };
  return (
    <div className="overview-card" onClick={handleClick}>
      <div className="card-label">{label}</div>

      <div className="value">{value}</div>

      <div className="card-end d-flex align-items-center">
        <div className="card-graph">
          {graph === "up" && (
            <svg
              width="18"
              height="10"
              viewBox="0 0 18 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.3337 0L14.242 1.90833L10.1753 5.975L6.84199 2.64167L0.666992 8.825L1.84199 10L6.84199 5L10.1753 8.33333L15.4253 3.09167L17.3337 5V0H12.3337Z"
                fill="#43A047"
              />
            </svg>
          )}
          {graph === "down" && (
            <svg
              width="18"
              height="10"
              viewBox="0 0 18 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.3337 10L14.242 8.09167L10.1753 4.025L6.84199 7.35833L0.666992 1.175L1.84199 0L6.84199 5L10.1753 1.66667L15.4253 6.90833L17.3337 5V10H12.3337Z"
                fill="#B00020"
              />
            </svg>
          )}
        </div>
        <div className="card-percentage">{percentage}%</div>
      </div>
    </div>
  );
};

export default OverviewCard;
