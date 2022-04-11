import React from "react";
import { useSelector } from "react-redux";
import { IReduxState } from "../../interface/reduxState";
import IssuesTable from "../IssuesTable";
import TopMenuArea from "../TopMenuArea";
import { useState } from "react";
import "./styles.scss";

export interface IIssues {
  sideMenuWidth: number;
  dashboardWidth: number;
}

const Issues: React.FunctionComponent<IIssues> = ({ sideMenuWidth, dashboardWidth }) => {
  const { currentPage } = useSelector((state: IReduxState) => state.sideMenu);
  const [search, setSearch] = useState("");
  return (
    <div className={`issues ${currentPage !== "Issues" && "hide"}`}>
      <TopMenuArea issues setSearch={setSearch} search={search} />
      <IssuesTable dashboardWidth={dashboardWidth} sideMenuWidth={sideMenuWidth} />
    </div>
  );
};

export default Issues;
