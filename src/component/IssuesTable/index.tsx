import React from "react";
import { rowsData } from "../../constants/rowOptions";
import Paginate from "../Paginate";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import atmData from "../../constants/atmData";
import numArr from "../../functions/numberArr";
import { IReduxState } from "../../interface/reduxState";
import "./styles.scss";
import "../TerminalsTable/styles.scss";

export interface IIssuesTable {
  sideMenuWidth: number;
  dashboardWidth: number;
}

const IssuesTable: React.FunctionComponent<IIssuesTable> = ({
  dashboardWidth,
  sideMenuWidth,
}) => {
  const [margin, setMargin] = useState(4);
  const [noOfRows, setNoOfRows] = useState("12");
  const [offset, setOffset] = useState(Number(noOfRows));
  const [noOfPages, setNoOfPages] = useState<number>();
  const [pageArray, setPageArray] = useState<number[]>([]);
  const [noOfData, setNoOfData] = useState(0);
  const [loadedData, setLoadedData] = useState<any>([]);
  const [activePage, setActivePage] = useState(3);
  const [filteredData, setFilteredData] = useState<any>([]);
  const { overview: overViewFilter } = useSelector(
    (state: IReduxState) => state.filter
  );

  useEffect(() => {
    setNoOfPages(Math.ceil(filteredData.length / Number(noOfRows)));
    setNoOfData(filteredData.length);
    setOffset(Number(noOfRows) * (activePage + 1));
    setLoadedData(filteredData.slice(offset - Number(noOfRows), offset));
    setPageArray(numArr(noOfPages));
  }, [activePage, filteredData, noOfData, noOfPages, noOfRows, offset]);

  useEffect(() => {
    if (overViewFilter === "none") {
      setFilteredData(atmData);
    }
    // if(overViewFilter === "Offline") {
    //   const data = atmData.filter(el => el.atmStatus === "Offline")
    //   setFilteredData(data)
    // }
    // if(overViewFilter === "Online") {
    //   const data = atmData.filter(el => el.atmStatus === "1")
    //   setFilteredData(data)
    // }
    // if(overViewFilter === "Out of Cash") {
    //   const data = atmData.filter(el => el.cashStatus === "Out of Cash")
    //   setFilteredData(data)
    // }
    // if(overViewFilter === "Cash Jam") {
    //   const data = atmData.filter(el => el.cashJam === "Jammed")
    //   setFilteredData(data)
    // }
    // if(overViewFilter === "Family Card Reader") {
    //   const data = atmData.filter(el => el.cardReader === "Jammed")
    //   setFilteredData(data)
    // }
  }, [overViewFilter]);

  useEffect(() => {
    console.log("loadedData", loadedData);
  }, [loadedData]);
  useEffect(() => {
    if (dashboardWidth <= 800) {
      setMargin(2);
    }
  }, [dashboardWidth]);
  const description = 'Card Reader showing error with valid concerns'
  return (
    <div
      className={`terminals-table d-flex justify-content-between flex-column issues-table`}
      style={{
        maxWidth: `calc(100vw - ${margin}rem - ${sideMenuWidth}px )`,
      }}
    >
      <div className="terminal-table-area issues-table-area scrollbar">
        <div className="title-area d-flex">
          <div className="title no">S/N</div>
          <div className="title create-on">CREATED ON</div>
          <div className="title type">TYPE</div>
          <div className="title desc">DESCRIPTION</div>
          <div className="title assign">ASSIGNEE</div>
          <div className="title prior">PRIORITY</div>
          <div className="title branch">BRANCH</div>
          <div className="title stat">STATUS</div>
        </div>

        <div className="scroll-area ">
          {loadedData.map((el: any, i: number) => {
            return (
              <div
                className="info-area d-flex"
                // onClick={handleAtmTerminalClick}
                key={el.id}
              >
                <div className="title content no">{i + 1}</div>
                <div className="title content create-on">Mar 19, 2021</div>
                <div className="title content type">Card Reader</div>
                <div className="title content desc">{description.length > 27 ? description.substring(0, 27) : description}</div>
                <div className="title content assign">Jide Sanwolu</div>
                <div className="title content prior danger">High</div>
                <div className="title content branch">Ikoyi 4</div>
                <div className="title content stat success">Open</div>
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

export default IssuesTable;
