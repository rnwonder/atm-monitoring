import React, { useEffect, useState } from "react";
import "../TerminalsTable/styles.scss";
import "../scrollBarScss/styles.scss";
import "./styles.scss";
import Paginate from "../Paginate";
import { rowsData } from "../../constants/rowOptions";
import numArr from "../../functions/numberArr";
import { IUsersData } from "../../interface/usersData";
import { getTime } from "../../functions/GetTime";
import {useSelector} from 'react-redux';
import {IReduxState} from '../../interface/reduxState';

export interface IUsersTable {
  sideMenuWidth: number;
  dashboardWidth: number;
  usersData: IUsersData[];
}
const UsersTable: React.FunctionComponent<IUsersTable> = ({ sideMenuWidth, dashboardWidth, usersData }) => {
  const { addUserSuccess } = useSelector((state: IReduxState) => state.toggle);
  const [margin, setMargin] = useState(4);
  const [noOfRows, setNoOfRows] = useState("12");
  const [offset, setOffset] = useState(Number(noOfRows));
  const [noOfPages, setNoOfPages] = useState<number>();
  const [pageArray, setPageArray] = useState<number[]>([]);
  const [noOfData, setNoOfData] = useState(0);
  const [loadedData, setLoadedData] = useState<IUsersData[]>([]);
  const [activePage, setActivePage] = useState(0);

  useEffect(() => {
    setNoOfPages(Math.ceil(usersData.length / Number(noOfRows)));
    setNoOfData(usersData.length);
    setOffset(Number(noOfRows) * (activePage + 1));
    setLoadedData(usersData.slice(offset - Number(noOfRows), offset));
    setPageArray(numArr(noOfPages));
  }, [activePage, noOfData, noOfPages, noOfRows, offset, usersData, addUserSuccess]);

  useEffect(() => {
    if (dashboardWidth <= 800) {
      setMargin(2);
    } else {
      setMargin(4);
    }
  }, [dashboardWidth]);
  return (
    <div
      className={`terminals-table d-flex justify-content-between flex-column users-table`}
      style={{ maxWidth: `calc(100vw - ${margin}rem - ${sideMenuWidth}px )` }}
    >
      <div className="terminal-table-area user-table-area scrollbar">
        <div className="title-area d-flex">
          <div className="title no">S/N</div>
          <div className="title create-on">CREATED ON</div>
          <div className="title fname">FULL NAME</div>
          <div className="title email">EMAIL</div>
          <div className="title des">DESIGNATION</div>
          <div className="title role">ROLE</div>
          <div className="title branch">BRANCH</div>
          <div className="title stat">STATUS</div>
        </div>
        <div className="scroll-area ">
          {loadedData.map((el: any, i: number) => {
            return (
              <div className="info-area d-flex" key={i}>
                <div className="title content no">{i + 1 + (offset - Number(noOfRows))}</div>
                <div className="title content create-on">{getTime(el.created_at, true) }</div>
                <div className="title content fname">{el.fullname}</div>
                <div className="title content email">{el.email}</div>
                <div className="title content des">{el.designation}</div>
                <div className="title content role">{el.role}</div>
                <div className="title content branch">{el.branch}</div>
                <div className={`title content stat ${el.is_active? "success" : "danger"} `}>{el.is_active? "Active" : "Inactive"}</div>
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

export default UsersTable;
