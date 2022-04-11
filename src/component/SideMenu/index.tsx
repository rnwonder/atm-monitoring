import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IReduxState } from "../../interface/reduxState";
import { setCurrentPageAction } from "../../redux/slice/sideMenuSlice";
import CustomButton from "../CustomButton";
import "./styles.scss";

export interface ISideMenu {
  dashboardWidth: number;
  setSideMenuWidth: React.Dispatch<React.SetStateAction<number>>;
}

const SideMenu: React.FunctionComponent<ISideMenu> = ({ dashboardWidth, setSideMenuWidth }) => {
  const { currentPage } = useSelector((state: IReduxState) => state.sideMenu);
  const { sideMenu: show } = useSelector((state: IReduxState) => state.toggle);
  const { role, fullName } = useSelector((state: IReduxState) => state.user);
  const [collapseView, setCollapseView] = useState(false);
  const dispatch = useDispatch();
  const ref = useRef<any>();

  useEffect(() => {
    if (!ref.current) return;
    setSideMenuWidth(ref.current.offsetWidth);

    if (dashboardWidth <= 800) {
      setSideMenuWidth(0);
      setCollapseView(false);
    }

    if ((collapseView || !collapseView) && dashboardWidth >= 800) {
      setTimeout(() => {
        setSideMenuWidth(ref.current.offsetWidth);
      }, 250);
    }
  }, [dashboardWidth, collapseView]);

  const handleCollapse = () => {
    setCollapseView((prev) => !prev);
  };
  return (
    <nav
      className={`side-menu bg-light d-flex flex-column justify-content-between ${show && "show"} ${
        collapseView && "mini"
      }`}
      ref={ref}
    >
      <div className="side-menu-container">
        <div className="top d-flex justify-content-between align-items-center ">
          <div className="title d-flex align-items-center ">
            <div className="logo-area"></div>
            <h2>ATM Monitor</h2>
          </div>

          <div className="collapse-area" onClick={handleCollapse}>
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.5 10H17.5"
                stroke="#373838"
                stroke-width="1.66667"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M2.5 5H17.5"
                stroke="#373838"
                stroke-width="1.66667"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M2.5 15H17.5"
                stroke="#373838"
                stroke-width="1.66667"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
        </div>

        <div className="list-title">REPORTS</div>
        <ul className="nav-area">
          <li
            className={`option ${currentPage === "Overview" && "active"} `}
            onClick={() => dispatch(setCurrentPageAction({ currentPage: "Overview" }))}
          >
            <div className="icon">
              {currentPage === "Overview" && (
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0 10H8V0H0V10ZM0 18H8V12H0V18ZM10 18H18V8H10V18ZM10 0V6H18V0H10Z"
                    fill="#0F0700"
                  />
                </svg>
              )}

              {currentPage !== "Overview" && (
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10 18V8H18V18H10ZM0 10V0H8V10H0ZM6 8V2H2V8H6ZM0 18V12H8V18H0ZM2 16H6V14H2V16ZM12 16H16V10H12V16ZM10 0H18V6H10V0ZM12 2V4H16V2H12Z"
                    fill="#A4A6B3"
                  />
                </svg>
              )}
            </div>

            <div className="optn-name">Overview</div>
          </li>

          <li
            className={`option ${currentPage === "Terminals" && "active"} `}
            onClick={() => dispatch(setCurrentPageAction({ currentPage: "Terminals" }))}
          >
            <div className="icon">
              {currentPage !== "Terminals" && (
                <svg
                  width="20"
                  height="18"
                  viewBox="0 0 20 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 16V6H2V16H9ZM9 4V1C9 0.734784 9.10536 0.48043 9.29289 0.292893C9.48043 0.105357 9.73478 0 10 0H19C19.2652 0 19.5196 0.105357 19.7071 0.292893C19.8946 0.48043 20 0.734784 20 1V17C20 17.2652 19.8946 17.5196 19.7071 17.7071C19.5196 17.8946 19.2652 18 19 18H1C0.734784 18 0.48043 17.8946 0.292893 17.7071C0.105357 17.5196 0 17.2652 0 17V5C0 4.73478 0.105357 4.48043 0.292893 4.29289C0.48043 4.10536 0.734784 4 1 4H9ZM11 2V16H18V2H11ZM3 13H8V15H3V13ZM12 13H17V15H12V13ZM12 10H17V12H12V10ZM12 7H17V9H12V7ZM3 10H8V12H3V10Z"
                    fill="#A4A6B3"
                  />
                </svg>
              )}

              {currentPage === "Terminals" && (
                <svg
                  width="20"
                  height="18"
                  viewBox="0 0 20 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 4V1C9 0.734784 9.10536 0.48043 9.29289 0.292893C9.48043 0.105357 9.73478 0 10 0H19C19.2652 0 19.5196 0.105357 19.7071 0.292893C19.8946 0.48043 20 0.734784 20 1V17C20 17.2652 19.8946 17.5196 19.7071 17.7071C19.5196 17.8946 19.2652 18 19 18H1C0.734784 18 0.48043 17.8946 0.292893 17.7071C0.105357 17.5196 0 17.2652 0 17V5C0 4.73478 0.105357 4.48043 0.292893 4.29289C0.48043 4.10536 0.734784 4 1 4H9ZM3 13V15H8V13H3ZM12 13V15H17V13H12ZM12 10V12H17V10H12ZM12 7V9H17V7H12ZM3 10V12H8V10H3Z"
                    fill="#09121F"
                  />
                </svg>
              )}
            </div>

            <div className="optn-name">Terminals</div>
          </li>
        </ul>

        {/* {role === "User" && (
          <>
            <div className="list-title lt2">ESCALATIONS</div>

            <ul className="nav-area">
              <li
                className={`option ${currentPage === "Issues" && "active"} `}
                onClick={() => dispatch(setCurrentPageAction({ currentPage: "Issues" }))}
              >
                <div className="icon">
                  {currentPage !== "Issues" && (
                    <svg
                      width="20"
                      height="18"
                      viewBox="0 0 20 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10.414 2H19C19.2652 2 19.5196 2.10536 19.7071 2.29289C19.8946 2.48043 20 2.73478 20 3V17C20 17.2652 19.8946 17.5196 19.7071 17.7071C19.5196 17.8946 19.2652 18 19 18H1C0.734784 18 0.48043 17.8946 0.292893 17.7071C0.105357 17.5196 0 17.2652 0 17V1C0 0.734784 0.105357 0.48043 0.292893 0.292893C0.48043 0.105357 0.734784 0 1 0H8.414L10.414 2ZM2 2V16H18V4H9.586L7.586 2H2ZM9 9H11V14H9V9ZM9 6H11V8H9V6Z"
                        fill="#A4A6B3"
                      />
                    </svg>
                  )}

                  {currentPage === "Issues" && (
                    <svg
                      width="20"
                      height="18"
                      viewBox="0 0 20 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10.414 2H19C19.2652 2 19.5196 2.10536 19.7071 2.29289C19.8946 2.48043 20 2.73478 20 3V17C20 17.2652 19.8946 17.5196 19.7071 17.7071C19.5196 17.8946 19.2652 18 19 18H1C0.734784 18 0.48043 17.8946 0.292893 17.7071C0.105357 17.5196 0 17.2652 0 17V1C0 0.734784 0.105357 0.48043 0.292893 0.292893C0.48043 0.105357 0.734784 0 1 0H8.414L10.414 2ZM9 6V11H11V6H9ZM9 12V14H11V12H9Z"
                        fill="#09121F"
                      />
                    </svg>
                  )}
                </div>

                <div className="optn-name">Issues</div>
              </li>
            </ul>
          </>
        )} */}

        {role === "Admin" && (
          <>
            <div className="list-title lt2">ADMIN</div>

            <ul className="nav-area">
              <li
                className={`option ${currentPage === "Users" && "active"} `}
                onClick={() => dispatch(setCurrentPageAction({ currentPage: "Users" }))}
              >
                <div className="icon">
                  {currentPage !== "Users" && (
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10 9C11.3261 9 12.5979 9.52678 13.5355 10.4645C14.4732 11.4021 15 12.6739 15 14V20H13V14C13 13.2348 12.7077 12.4985 12.1827 11.9417C11.6578 11.385 10.9399 11.0499 10.176 11.005L10 11C9.23479 11 8.49849 11.2923 7.94174 11.8173C7.38499 12.3422 7.04989 13.0601 7.005 13.824L7 14V20H5V14C5 12.6739 5.52678 11.4021 6.46447 10.4645C7.40215 9.52678 8.67392 9 10 9ZM3.5 12C3.779 12 4.05 12.033 4.31 12.094C4.13902 12.603 4.03777 13.1328 4.009 13.669L4 14V14.086C3.88505 14.0449 3.76549 14.018 3.644 14.006L3.5 14C3.12712 14 2.76761 14.1389 2.49158 14.3896C2.21555 14.6403 2.0428 14.9848 2.007 15.356L2 15.5V20H0V15.5C0 14.5717 0.368749 13.6815 1.02513 13.0251C1.6815 12.3687 2.57174 12 3.5 12ZM16.5 12C17.4283 12 18.3185 12.3687 18.9749 13.0251C19.6313 13.6815 20 14.5717 20 15.5V20H18V15.5C18 15.1271 17.8611 14.7676 17.6104 14.4916C17.3597 14.2156 17.0152 14.0428 16.644 14.007L16.5 14C16.325 14 16.157 14.03 16 14.085V14C16 13.334 15.892 12.694 15.691 12.096C15.95 12.033 16.221 12 16.5 12ZM3.5 6C4.16304 6 4.79893 6.26339 5.26777 6.73223C5.73661 7.20107 6 7.83696 6 8.5C6 9.16304 5.73661 9.79893 5.26777 10.2678C4.79893 10.7366 4.16304 11 3.5 11C2.83696 11 2.20107 10.7366 1.73223 10.2678C1.26339 9.79893 1 9.16304 1 8.5C1 7.83696 1.26339 7.20107 1.73223 6.73223C2.20107 6.26339 2.83696 6 3.5 6ZM16.5 6C17.163 6 17.7989 6.26339 18.2678 6.73223C18.7366 7.20107 19 7.83696 19 8.5C19 9.16304 18.7366 9.79893 18.2678 10.2678C17.7989 10.7366 17.163 11 16.5 11C15.837 11 15.2011 10.7366 14.7322 10.2678C14.2634 9.79893 14 9.16304 14 8.5C14 7.83696 14.2634 7.20107 14.7322 6.73223C15.2011 6.26339 15.837 6 16.5 6ZM3.5 8C3.36739 8 3.24021 8.05268 3.14645 8.14645C3.05268 8.24021 3 8.36739 3 8.5C3 8.63261 3.05268 8.75979 3.14645 8.85355C3.24021 8.94732 3.36739 9 3.5 9C3.63261 9 3.75979 8.94732 3.85355 8.85355C3.94732 8.75979 4 8.63261 4 8.5C4 8.36739 3.94732 8.24021 3.85355 8.14645C3.75979 8.05268 3.63261 8 3.5 8ZM16.5 8C16.3674 8 16.2402 8.05268 16.1464 8.14645C16.0527 8.24021 16 8.36739 16 8.5C16 8.63261 16.0527 8.75979 16.1464 8.85355C16.2402 8.94732 16.3674 9 16.5 9C16.6326 9 16.7598 8.94732 16.8536 8.85355C16.9473 8.75979 17 8.63261 17 8.5C17 8.36739 16.9473 8.24021 16.8536 8.14645C16.7598 8.05268 16.6326 8 16.5 8ZM10 0C11.0609 0 12.0783 0.421427 12.8284 1.17157C13.5786 1.92172 14 2.93913 14 4C14 5.06087 13.5786 6.07828 12.8284 6.82843C12.0783 7.57857 11.0609 8 10 8C8.93913 8 7.92172 7.57857 7.17157 6.82843C6.42143 6.07828 6 5.06087 6 4C6 2.93913 6.42143 1.92172 7.17157 1.17157C7.92172 0.421427 8.93913 0 10 0ZM10 2C9.46957 2 8.96086 2.21071 8.58579 2.58579C8.21071 2.96086 8 3.46957 8 4C8 4.53043 8.21071 5.03914 8.58579 5.41421C8.96086 5.78929 9.46957 6 10 6C10.5304 6 11.0391 5.78929 11.4142 5.41421C11.7893 5.03914 12 4.53043 12 4C12 3.46957 11.7893 2.96086 11.4142 2.58579C11.0391 2.21071 10.5304 2 10 2Z"
                        fill="#A4A6B3"
                      />
                    </svg>
                  )}

                  {currentPage === "Users" && (
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10 9C11.3261 9 12.5979 9.52678 13.5355 10.4645C14.4732 11.4021 15 12.6739 15 14V20H5V14C5 12.6739 5.52678 11.4021 6.46447 10.4645C7.40215 9.52678 8.67392 9 10 9ZM3.288 12.006C3.12886 12.5428 3.03485 13.0968 3.008 13.656L3 14V20H9.13169e-08V15.5C-0.000196807 14.6376 0.318028 13.8054 0.893635 13.1632C1.46924 12.521 2.2617 12.1139 3.119 12.02L3.289 12.006H3.288ZM16.712 12.006C17.6019 12.0602 18.4376 12.452 19.0486 13.1012C19.6596 13.7505 19.9999 14.6084 20 15.5V20H17V14C17 13.307 16.9 12.638 16.712 12.006ZM3.5 6C4.16304 6 4.79893 6.26339 5.26777 6.73223C5.73661 7.20107 6 7.83696 6 8.5C6 9.16304 5.73661 9.79893 5.26777 10.2678C4.79893 10.7366 4.16304 11 3.5 11C2.83696 11 2.20107 10.7366 1.73223 10.2678C1.26339 9.79893 1 9.16304 1 8.5C1 7.83696 1.26339 7.20107 1.73223 6.73223C2.20107 6.26339 2.83696 6 3.5 6ZM16.5 6C17.163 6 17.7989 6.26339 18.2678 6.73223C18.7366 7.20107 19 7.83696 19 8.5C19 9.16304 18.7366 9.79893 18.2678 10.2678C17.7989 10.7366 17.163 11 16.5 11C15.837 11 15.2011 10.7366 14.7322 10.2678C14.2634 9.79893 14 9.16304 14 8.5C14 7.83696 14.2634 7.20107 14.7322 6.73223C15.2011 6.26339 15.837 6 16.5 6ZM10 0C11.0609 0 12.0783 0.421427 12.8284 1.17157C13.5786 1.92172 14 2.93913 14 4C14 5.06087 13.5786 6.07828 12.8284 6.82843C12.0783 7.57857 11.0609 8 10 8C8.93913 8 7.92172 7.57857 7.17157 6.82843C6.42143 6.07828 6 5.06087 6 4C6 2.93913 6.42143 1.92172 7.17157 1.17157C7.92172 0.421427 8.93913 0 10 0Z"
                        fill="#09121F"
                      />
                    </svg>
                  )}
                </div>

                <div className="optn-name">Users</div>
              </li>

              {/* <li
                className={`option ${currentPage === "Issues" && "active"} `}
                onClick={() => dispatch(setCurrentPageAction({ currentPage: "Issues" }))}
              >
                <div className="icon">
                  {currentPage !== "Issues" && (
                    <svg
                      width="20"
                      height="18"
                      viewBox="0 0 20 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10.414 2H19C19.2652 2 19.5196 2.10536 19.7071 2.29289C19.8946 2.48043 20 2.73478 20 3V17C20 17.2652 19.8946 17.5196 19.7071 17.7071C19.5196 17.8946 19.2652 18 19 18H1C0.734784 18 0.48043 17.8946 0.292893 17.7071C0.105357 17.5196 0 17.2652 0 17V1C0 0.734784 0.105357 0.48043 0.292893 0.292893C0.48043 0.105357 0.734784 0 1 0H8.414L10.414 2ZM2 2V16H18V4H9.586L7.586 2H2ZM9 9H11V14H9V9ZM9 6H11V8H9V6Z"
                        fill="#A4A6B3"
                      />
                    </svg>
                  )}

                  {currentPage === "Issues" && (
                    <svg
                      width="20"
                      height="18"
                      viewBox="0 0 20 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10.414 2H19C19.2652 2 19.5196 2.10536 19.7071 2.29289C19.8946 2.48043 20 2.73478 20 3V17C20 17.2652 19.8946 17.5196 19.7071 17.7071C19.5196 17.8946 19.2652 18 19 18H1C0.734784 18 0.48043 17.8946 0.292893 17.7071C0.105357 17.5196 0 17.2652 0 17V1C0 0.734784 0.105357 0.48043 0.292893 0.292893C0.48043 0.105357 0.734784 0 1 0H8.414L10.414 2ZM9 6V11H11V6H9ZM9 12V14H11V12H9Z"
                        fill="#09121F"
                      />
                    </svg>
                  )}
                </div>

                <div className="optn-name">Issues</div>
              </li> */}
            </ul>
          </>
        )}
      </div>

      <div className="btn-area side-menu-container">
        {/* <ul className="nav-area">
          <li
            className={`option ${currentPage === "Settings" && "active"} `}
            onClick={() => dispatch(setCurrentPageAction({ currentPage: "Settings" }))}
          >
            <div className="icon">
              {currentPage !== "Settings" && (
                <svg
                  width="22"
                  height="20"
                  viewBox="0 0 22 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16.5 0.473999L22 10L16.5 19.526H5.5L0 10L5.5 0.473999H16.5ZM15.345 2.474H6.655L2.309 10L6.655 17.526H15.345L19.691 10L15.345 2.474ZM7.634 6.17L9.366 5.17L14.366 13.83L12.634 14.83L7.634 6.17Z"
                    fill="#09121F"
                  />
                </svg>
              )}

              {currentPage === "Settings" && (
                <svg
                  width="22"
                  height="20"
                  viewBox="0 0 22 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16.5 0.473999L22 10L16.5 19.526H5.5L0 10L5.5 0.473999H16.5ZM7.634 6.17L12.634 14.83L14.366 13.83L9.366 5.17L7.634 6.17Z"
                    fill="#09121F"
                  />
                </svg>
              )}
            </div>

            <div className="optn-name">Settings</div>
          </li>
        </ul> */}

        <div className="add-btns d-flex">
          <div className="button privacy">
            <CustomButton side label="PRIVACY" handleClick={() => {}} />
          </div>
          <div className="button terms">
            <CustomButton side label="TERMS" handleClick={() => {}} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default SideMenu;
