import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import atmData from "../../constants/atmData";
import { rowsData } from "../../constants/rowOptions";
import formatAmount from "../../functions/FormatAmount";
import numArr from "../../functions/numberArr";
import { IOverviewFilter } from "../../interface/overviewFilter";
import { IReduxState } from "../../interface/reduxState";
import { ITerminalData } from "../../interface/terminalData";
import CustomInput from "../CustomInput";
import Paginate from "../Paginate";
import "../scrollBarScss/styles.scss";
import "./styles.scss";

export interface ITerminalsTable {
  sideMenuWidth: number;
  handleAtmTerminalClick: (data: ITerminalData) => void;
  showAtmDetails: boolean;
  dashboardWidth: number;
  terminalData: ITerminalData[];
  setExportData: React.Dispatch<React.SetStateAction<ITerminalData[]>>;
}

const TerminalsTable: React.FunctionComponent<ITerminalsTable> = ({
  sideMenuWidth,
  handleAtmTerminalClick,
  showAtmDetails,
  dashboardWidth,
  terminalData,
  setExportData,
}) => {
  const [margin, setMargin] = useState(4);
  const [noOfRows, setNoOfRows] = useState("12");
  const [offset, setOffset] = useState(Number(noOfRows));
  const [noOfPages, setNoOfPages] = useState<number>();
  const [pageArray, setPageArray] = useState<number[]>([]);
  const [noOfData, setNoOfData] = useState(0);
  const [loadedData, setLoadedData] = useState<ITerminalData[]>([]);
  const [activePage, setActivePage] = useState(3);
  const { overview: overViewFilter } = useSelector((state: IReduxState) => state.filter);

  useEffect(() => {
    setNoOfPages(Math.ceil(terminalData.length / Number(noOfRows)));
    setNoOfData(terminalData.length);
    setOffset(Number(noOfRows) * (activePage + 1));
    setLoadedData(terminalData.slice(offset - Number(noOfRows), offset));
    setPageArray(numArr(noOfPages));
  }, [activePage, noOfPages, noOfRows, offset, terminalData]);

  useEffect(() => {
    if (showAtmDetails) return;
    setExportData(terminalData);
  }, [setExportData, showAtmDetails, terminalData]);


  useEffect(() => {
    console.log("loadedData", loadedData);
  }, [loadedData]);
  useEffect(() => {
    if (dashboardWidth <= 800) {
      setMargin(2);
    }
  }, [dashboardWidth]);
  return (
    <div
      className={`terminals-table d-flex justify-content-between flex-column ${
        showAtmDetails && "hide"
      }`}
      style={{
        maxWidth: `calc(100vw - ${margin}rem - ${sideMenuWidth}px )`,
      }}
    >
      <div className="terminal-table-area scrollbar">
        <div className="title-area d-flex">
          <div className="title no">S/N</div>
          <div className="title id">ID</div>
          <div className="title sname">SHORT NAME</div>
          <div className="title atmstat">ATM STATUS</div>
          <div className="title amt">AMOUNT</div>
          <div className="title cjam">CASH JAM</div>
          <div className="title cstatus">CASH STATUS</div>
          <div className="title cread">CARD READER</div>
          <div className="title rprint">RECEIPT PRINTER</div>
          <div className="title escal">ESCALATED</div>
        </div>

        <div className="scroll-area ">
          {loadedData.map((el: any, i: number) => {
            return (
              <div
                className="info-area d-flex"
                onClick={() => handleAtmTerminalClick(el)}
                key={el.id}
              >
                <div className="title content no">{i + 1 + (offset - Number(noOfRows))}</div>
                <div className={`title content id`}>{el.TerminalID}</div>
                <div className={`title content sname`}>{el.ShortName}</div>
                <div
                  className={`title content atmstat ${
                    el.ATMStatus.includes("Offline")
                      ? "danger"
                      : el.ATMStatus.includes("Closed")
                      ? "caution"
                      : el.ATMStatus.includes("In Service")
                      ? "success"
                      : ""
                  }`}
                >
                  {el.ATMStatus.includes("Offline")
                    ? "Offline"
                    : el.ATMStatus.includes("Unknown")
                    ? "Unknown"
                    : el.ATMStatus.includes("Supervisor")
                    ? "Is Being Serviced"
                    : el.ATMStatus.includes("Closed")
                    ? "Closed"
                    : el.ATMStatus.includes("In Service")
                    ? "Online"
                    : "Online"}
                </div>
                <div className={`title content amt`}>
                  {el.Amount.includes("Unknown") ? "Unknown" : formatAmount(el.Amount)}
                </div>
                <div
                  className={`title content cjam ${
                    el.CashJams.includes("clear cash")
                      ? "danger"
                      : el.CashJams.includes("Possible Cash jam")
                      ? "caution"
                      : ""
                  }`}
                >
                  {el.CashJams.includes("clear cash")
                    ? "Jammed"
                    : el.CashJams.includes("Possible Cash jam")
                    ? "Possibly Jammed"
                    : el.CashJams.includes("Unknown")
                    ? "Unknown"
                    : "Ok"}
                </div>
                <div
                  className={`title content cstatus ${
                    el.CashStatus.includes("Low Cash") && "caution"
                  } ${el.CashStatus === "Out of Cash" && "danger"}`}
                >
                  {el.CashStatus === "OK"
                    ? "Ok"
                    : el.CashStatus === "Low Cash 1"
                    ? "Low Cash - Warning"
                    : el.CashStatus === "Low Cash 2"
                    ? "Low Cash - Critical"
                    : el.CashStatus === "Out of Cash"
                    ? "Out of Cash"
                    : "Unknown"}
                </div>
                <div
                  className={`title content cread ${
                    el.CardReader.includes("Faulty")
                      ? "danger"
                      : el.CardReader.includes("Check Card Reader")
                      ? "caution"
                      : ""
                  } `}
                >
                  {el.CardReader.includes("Faulty")
                    ? "Faulty"
                    : el.CardReader.includes("Check Card Reader")
                    ? "Cards Retained"
                    : el.CardReader.includes("Card Reader OK")
                    ? "Ok"
                    : "Unknown"}
                </div>
                <div
                  className={`title content rprint ${
                    el.ReceiptPrinter.includes("Faulty")
                      ? "danger"
                      : el.ReceiptPrinter.includes("Check Receipt Printer")
                      ? "caution"
                      : ""
                  }`}
                >
                  {el.ReceiptPrinter.includes("Faulty")
                    ? "Faulty"
                    : el.ReceiptPrinter.includes("Receipt Printer OK")
                    ? "Ok"
                    : el.ReceiptPrinter.includes("Check Receipt Printer")
                    ? "Possibly Jammed"
                    : "Unknown"}
                </div>
                <div className={`title content escal`}>Yes</div>
              </div>
            );
          })}
        </div>
      </div>

      <Paginate
        rowsData={rowsData}
        setNoOfRows={setNoOfRows}
        noOfRows={noOfRows}
        noOfData={noOfData}
        activePage={activePage + 1}
        setActivePage={setActivePage}
        pageArray={pageArray}
        offset={offset}
      />
    </div>
  );
};

export default TerminalsTable;
