import { useState, useLayoutEffect, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IReduxState } from "../../interface/reduxState";
import ATMDetails from "../ATMDetails";
import FilterBy from "../FilterBy";
import TerminalsTable from "../TerminalsTable";
import TopMenuArea from "../TopMenuArea";
import axiosInstance from "../../helper/axiosInstance";
import "./styles.scss";
import { ITerminalData } from "../../interface/terminalData";
import { setFilteredDataAction, setMainTerminalDataAction } from "../../redux/slice/terminalSlice";

export interface ITerminals {
  sideMenuWidth: number;
  dashboardWidth: number;
}

const Terminals: React.FunctionComponent<ITerminals> = ({ sideMenuWidth, dashboardWidth }) => {
  const { currentPage } = useSelector((state: IReduxState) => state.sideMenu);
  const {
    main,
    filtered,
    filterParameters: { cashStatus, operationalStatus },
  } = useSelector((state: IReduxState) => state.terminal);
  const [showAtmDetails, setShowAtmDetails] = useState(false);
  const [terminalData, setTerminalData] = useState<ITerminalData[]>([]);
  const [exportData, setExportData] = useState<ITerminalData[]>([]);
  const [exportDataName, setExportDataName] = useState("");
  const [search, setSearch] = useState("");
  const [ATMDetailsData, setATMDetailsData] = useState<ITerminalData | undefined>();
  const [clickMe, setClickMe] = useState<HTMLAnchorElement | null | undefined>();
  const dispatch = useDispatch();

  const handleBack = () => {
    setShowAtmDetails(false);
    setATMDetailsData(undefined);
    setExportDataName("Terminals");
  };

  const handleAtmTerminalClick = (data: ITerminalData) => {
    setATMDetailsData(data);
    setExportData([data]);
    setShowAtmDetails(true);
    setExportDataName(data.ShortName);
  };

  useLayoutEffect(() => {
    axiosInstance
      .get("/api/terminals")
      .then((res) => {
        dispatch(setMainTerminalDataAction(res.data.data.message));
        dispatch(setFilteredDataAction(res.data.data.message));
      })
      .catch((err) => {
        console.error(err.response);
      });
    setExportDataName("Terminals");
  }, []);

  useEffect(() => {
    let filterData = main;

    if (operationalStatus === "Cash Jam") {
      const filteredData = filterData.filter((el) => el.CashJams.includes("clear cash"));
      filterData = filteredData;
      
    }

    if (operationalStatus === "Dispensing") {
      const filteredData = filterData.filter(
        (el) => !el.CashStatus.includes("Unknown") && !el.CashStatus.includes("Out")
      );
      filterData = filteredData;
    }

    if (operationalStatus === "Faulty Card Reader") {
      const filteredData = filterData.filter((el) => el.CardReader.includes("Faulty"));
      filterData = filteredData;
    }

    if (operationalStatus === "Not Dispensing") {
      const filteredData = filterData.filter((el) => el.CashStatus === "Out of Cash");
      filterData = filteredData;
    }

    if (operationalStatus === "Offline") {
      const filteredData = filterData.filter((el) => el.ATMStatus.includes("Offline"));
      filterData = filteredData;
    }

    if (operationalStatus === "Online") {
      const filteredData = filterData.filter((el) => el.ATMStatus.includes("In Service"));
      filterData = filteredData;
    }

    if (operationalStatus === "Closed") {
      const filteredData = filterData.filter((el) => el.ATMStatus.includes("Closed"));
      filterData = filteredData;
    }

    if (operationalStatus === "Is Being Serviced") {
      const filteredData = filterData.filter((el) => el.ATMStatus.includes("Supervisor"));
      filterData = filteredData;
    }

    if (cashStatus === "ASAP") {
      const filteredData = filterData.filter((el) => el.CashJams.includes(cashStatus));
      filterData = filteredData;
    } 
    else if (cashStatus) {
      const filteredData = filterData.filter((el) => el.CashStatus === cashStatus);
      filterData = filteredData;
    }
    
    if (!operationalStatus && !cashStatus) {
      dispatch(setFilteredDataAction(main));
      return;
    }
    
    dispatch(setFilteredDataAction(filterData));
  }, [cashStatus, dispatch, main, operationalStatus]);

  useEffect(() => {
    if(search) {
      const data = filtered.filter(el => el.ShortName.toLowerCase().includes(search.toLowerCase()))
      setTerminalData(data)
    } else {
      setTerminalData(filtered);
    }
  }, [filtered, search])
  useEffect(() => {
    console.log("terminalData", terminalData);
  }, [terminalData]);

  return (
    <div className={`terminals ${currentPage !== "Terminals" && "hide"}`}>
      <TopMenuArea
        exportDataName={exportDataName}
        exportData={exportData}
        back={showAtmDetails}
        handleBack={handleBack}
        clickMe={clickMe}
        setSearch={setSearch}
        search={search}
      />
      <TerminalsTable
        terminalData={terminalData}
        setExportData={setExportData}
        dashboardWidth={dashboardWidth}
        sideMenuWidth={sideMenuWidth}
        handleAtmTerminalClick={handleAtmTerminalClick}
        showAtmDetails={showAtmDetails}
      />
      {showAtmDetails && (
        <ATMDetails ATMDetailsData={ATMDetailsData} clickMe={clickMe} setClickMe={setClickMe} />
      )}
      <FilterBy />
    </div>
  );
};

export default Terminals;
