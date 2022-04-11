export interface ITerminalData {
  id: number;
  Timestamp: string;
  TerminalID: string;
  ShortName: string;
  ATMStatus: string;
  Amount: string;
  CashStatus: string;
  CardReader: string;
  ReceiptPrinter: string;
  ReceiptPaper: string;
  CashJams: string;
  DepositJams: string;
  Last_Tranx_Time: string;
  StatusStart: string;
  StatusPeriod: string;
  Idle: string;
  RetCards: boolean;
  DebitNoPay: string;
  ColorCode: string;
  IdleStamp: string;
  Exempt_Bit: boolean;
  created_at: string;
  updated_at: string;
}

export type ICashStatus =
  | ""
  | "Low Cash 1"
  | "OK"
  | "ASAP"
  | "Out of Cash"
  | "Low Cash 2"
  | "N/A";

export type IOperationalStatus =
  | ""
  | "Dispensing"
  | "Not Dispensing"
  | "Cash Jam"
  | "Offline"
  | "Online"
  | "Closed"
  | "Is Being Serviced"
  | "Faulty Card Reader";
