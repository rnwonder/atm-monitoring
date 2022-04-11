import React from "react";
import { ITerminalData } from "../../interface/terminalData";
import formatAmount from "../../functions/FormatAmount";
import "./styles.scss";

export interface IATMDetails {
  clickMe?: HTMLAnchorElement | null | undefined;
  ATMDetailsData: ITerminalData | undefined;
  setClickMe: React.Dispatch<React.SetStateAction<HTMLAnchorElement | null | undefined>>;
}

const ATMDetails: React.FunctionComponent<IATMDetails> = ({
  clickMe,
  setClickMe,
  ATMDetailsData,
}) => {
  return (
    <div className="atm-details">
      <h3>ATMID{ATMDetailsData?.TerminalID}</h3>
      <div className="info">
        <div className="details">
          <div className="atm-data">
            <p>ID</p>
            <p>ATMID{ATMDetailsData?.TerminalID}</p>
          </div>
          <div className="atm-data">
            <p>Short Name</p>
            <p>{ATMDetailsData?.ShortName}</p>
          </div>
          <div className="atm-data">
            <p>ATM Status</p>
            <p>
              {ATMDetailsData?.ATMStatus.includes("Offline")
                ? "Offline"
                : ATMDetailsData?.ATMStatus.includes("Unknown")
                ? "Unknown"
                : ATMDetailsData?.ATMStatus.includes("Supervisor")
                ? "Is Being Serviced"
                : ATMDetailsData?.ATMStatus.includes("Closed")
                ? "Closed"
                : ATMDetailsData?.ATMStatus.includes("In Service")
                ? "Online"
                : "Online"}
            </p>
          </div>
          <div className="atm-data">
            <p>Amount</p>
            <p>{ATMDetailsData && formatAmount(ATMDetailsData.Amount)}</p>
          </div>
          <div className="atm-data">
            <p>Cash Jam</p>
            <p>
              {ATMDetailsData?.CashJams.includes("clear cash")
                ? "Jammed"
                : ATMDetailsData?.CashJams.includes("Possible Cash jam")
                ? "Possibly Jammed"
                : ATMDetailsData?.CashJams.includes("Unknown")
                ? "Unknown"
                : "Okay"}
            </p>
          </div>
        </div>
        <div className="details">
          <div className="atm-data">
            <p>Cash Status</p>
            <p>
              {ATMDetailsData?.CashStatus === "OK"
                ? "Okay"
                : ATMDetailsData?.CashStatus === "Low Cash 1"
                ? "Low Cash - Warning"
                : ATMDetailsData?.CashStatus === "Low Cash 2"
                ? "Low Cash - Critical"
                : ATMDetailsData?.CashStatus === "Out of Cash"
                ? "Out of Cash"
                : "Unknown"}
            </p>
          </div>
          <div className="atm-data">
            <p>Cash Reader</p>
            <p>
              {ATMDetailsData?.CardReader.includes("Faulty")
                ? "Faulty"
                : ATMDetailsData?.CardReader.includes("Check Card Reader")
                ? "Cards Retained"
                : ATMDetailsData?.CardReader.includes("Card Reader OK")
                ? "Okay"
                : "Unknown"}
            </p>
          </div>
          <div className="atm-data">
            <p>Receipt Printer</p>
            <p>
              {ATMDetailsData?.ReceiptPrinter.includes("Faulty")
                ? "Faulty"
                : ATMDetailsData?.ReceiptPrinter.includes("Receipt Printer OK")
                ? "Okay"
                : ATMDetailsData?.ReceiptPrinter.includes("Check Receipt Printer")
                ? "Possibly Jammed"
                : "Unknown"}
            </p>
          </div>
          <div className="atm-data">
            <p>Receipt Paper</p>
            <p>
              {ATMDetailsData?.ReceiptPaper.includes("OK")
                ? "Okay"
                : ATMDetailsData?.ReceiptPaper.includes("No")
                ? "No Paper"
                : ATMDetailsData?.ReceiptPaper.includes("Low")
                ? "Paper Low"
                : "Unknown"}
            </p>
          </div>
          <div className="atm-data">
            <p>Escalated</p>
            <p>Yes</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ATMDetails;
