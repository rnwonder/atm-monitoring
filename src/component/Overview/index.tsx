import React, { useEffect, useLayoutEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import defaultDashboardData from "../../constants/defaultDashboardData";
import { getPercentage, getPercentageIncrease } from "../../functions/GetPercentage";
import axiosInstance from "../../helper/axiosInstance";
import { IReduxState } from "../../interface/reduxState";
import CustomInput from "../CustomInput";
import OverviewCard from "../OverviewCard";
import "./styles.scss";

export interface IOverview {}

const filterData = [
  {
    name: "Last 7 Days",
    value: "last_7_days",
  },
  {
    name: "Last 30 Days",
    value: "last_30_days",
  },
  {
    name: "Last 90 Days",
    value: "last_90_days",
  },
  {
    name: "All Time",
    value: "all",
  },
  {
    name: "This Month",
    value: "this_month",
  },
  {
    name: "Today",
    value: "today",
  },
  {
    name: "Custom",
    value: "custom",
  },
];

const Overview: React.FunctionComponent<IOverview> = () => {
  const { currentPage } = useSelector((state: IReduxState) => state.sideMenu);
  const [filter, setFilter] = useState("all");
  const [dashboardData, setDashboardData] = useState({
    noOfAtms: "",
    noOfAtmPrev: "",
    cashJams: "",
    cashJamsPrev: "",
    outOfCash: "",
    outOfCashPrev: "",
    faultyCardReader: "",
    faultyCardReaderPrev: "",
    offline: "",
    offlinePrev: "",
    online: "",
    onlinePrev: "",
    dispensing: "",
    dispensingPrev: "",
    notDispensing: "",
    notDispensingPrev: "",
  });

  const getDashboardData = () => {
    axiosInstance
      .get(`/api/get-dashboard-data?filter=${filter}`)
      .then((res) => {
        if (res.data.data.code === 206) {
          toast.error(res.data.data.message);
          return console.log(res.data.data.message);
        }
        setDashboardData((prev) => {
          return {
            ...defaultDashboardData,
            ...res.data.data.message,
          };
        });
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  useEffect(() => {
    console.log("dashboardData :>> ", dashboardData);
  }, [dashboardData]);

  useLayoutEffect(() => {
    getDashboardData();
  }, [filter]);
  return (
    <div className={`overview ${currentPage !== "Overview" && "hide"} `}>
      <div className="filter-area">
        <CustomInput type="select" value={filter} setValue={setFilter} selectData={filterData} />
      </div>

      <div className="atm-data">
        <OverviewCard
          label="No of ATMs"
          value={dashboardData.noOfAtms}
          percentage={getPercentage(
            parseInt(dashboardData.noOfAtmPrev),
            parseInt(dashboardData.noOfAtms)
          )}
          graph={getPercentageIncrease(
            parseInt(dashboardData.noOfAtmPrev),
            parseInt(dashboardData.noOfAtms)
          )}
        />
        <OverviewCard
          label="Dispensing"
          value={dashboardData.dispensing}
          percentage={getPercentage(
            parseInt(dashboardData.dispensingPrev),
            parseInt(dashboardData.dispensing)
          )}
          graph={getPercentageIncrease(
            parseInt(dashboardData.dispensingPrev),
            parseInt(dashboardData.dispensing)
          )}
        />
        <OverviewCard
          label="Not Dispensing"
          value={dashboardData.notDispensing}
          percentage={getPercentage(
            parseInt(dashboardData.notDispensingPrev),
            parseInt(dashboardData.notDispensing)
          )}
          graph={getPercentageIncrease(
            parseInt(dashboardData.notDispensingPrev),
            parseInt(dashboardData.notDispensing)
          )}
        />
        <OverviewCard
          label="Cash Jam"
          value={dashboardData.cashJams}
          percentage={getPercentage(
            parseInt(dashboardData.cashJamsPrev),
            parseInt(dashboardData.cashJams)
          )}
          graph={getPercentageIncrease(
            parseInt(dashboardData.cashJamsPrev),
            parseInt(dashboardData.cashJams)
          )}
        />
        <OverviewCard
          label="Offline"
          value={dashboardData.offline}
          percentage={getPercentage(
            parseInt(dashboardData.offlinePrev),
            parseInt(dashboardData.offline)
          )}
          graph={getPercentageIncrease(
            parseInt(dashboardData.offlinePrev),
            parseInt(dashboardData.offline)
          )}
        />
        <OverviewCard
          label="Online"
          value={dashboardData.online}
          percentage={getPercentage(
            parseInt(dashboardData.onlinePrev),
            parseInt(dashboardData.online)
          )}
          graph={getPercentageIncrease(
            parseInt(dashboardData.onlinePrev),
            parseInt(dashboardData.online)
          )}
        />
        <OverviewCard
          label="Faulty Card Reader"
          value={dashboardData.faultyCardReader}
          percentage={getPercentage(
            parseInt(dashboardData.faultyCardReaderPrev),
            parseInt(dashboardData.faultyCardReader)
          )}
          graph={getPercentageIncrease(
            parseInt(dashboardData.faultyCardReaderPrev),
            parseInt(dashboardData.faultyCardReader)
          )}
        />
        <OverviewCard
          label="Out of Cash"
          value={dashboardData.outOfCash}
          percentage={getPercentage(
            parseInt(dashboardData.outOfCashPrev),
            parseInt(dashboardData.outOfCash)
          )}
          graph={getPercentageIncrease(
            parseInt(dashboardData.outOfCashPrev),
            parseInt(dashboardData.outOfCash)
          )}
        />
      </div>

    </div>
  );
};

export default Overview;
