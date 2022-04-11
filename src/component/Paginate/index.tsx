import React, { useEffect, useRef, useState } from "react";
import CustomInput from "../CustomInput";
import "./styles.scss";

export interface IPaginate {
  rowsData: string[];
  noOfRows: string;
  setNoOfRows: React.Dispatch<React.SetStateAction<string>>;
  noOfData: number
  activePage: number
  setActivePage: React.Dispatch<React.SetStateAction<number>>
  pageArray: number[]
  offset: number
}

const Paginate: React.FunctionComponent<IPaginate> = ({
  rowsData,
  noOfRows,
  setNoOfRows,
  noOfData,
  activePage,
  setActivePage,
  pageArray,
  offset,
}) => {
    const ref = useRef<any>()
    const [startingNo, setStartingNo] = useState(0)
    const [endingNo, setEndingNo] = useState(0)

    useEffect(() => {
        setStartingNo(1 + (offset - Number(noOfRows)))
        if(activePage === pageArray.length) {
            setEndingNo(noOfData)
        } else {
            setEndingNo(Number(noOfRows) * activePage)
        }
        
    }, [activePage, noOfData, noOfRows, offset, pageArray.length])

    useEffect(() => {
        setActivePage(0)
    }, [noOfRows])

    useEffect(() => {
        console.log('ref.c :>> ', ref.current.offsetHeight);
    }, [])

    const handleNext = () => {
        setActivePage(prev => prev + 1)
    }

    const handlePrevious = () => {
        setActivePage(prev => prev - 1)
    }
  return (
    <div className="paginate-area d-flex justify-content-end align-items-center" ref={ref}>
      <div className="set-rows d-flex align-items-center">
        <div className="set-rows-label">Rows per page:</div>
        <div className="set-rows-select">
          <CustomInput
            type="select"
            selectData={rowsData}
            value={noOfRows}
            setValue={setNoOfRows}
            page
          />
        </div>
      </div>

      <div className="paginate d-flex align-items-center">
        <div className="paginate-info">{startingNo}-{endingNo} of {noOfData}</div>

        <div className="paginate-btns">
          <button disabled={activePage === 1} className="back" onClick={handlePrevious}>
            <svg
              width="9"
              height="14"
              viewBox="0 0 9 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.78452 13L1.10868 7.07479C1.06385 7.035 1.06385 6.965 1.10868 6.92521L7.78452 1"
                stroke="#9FA2B4"
                stroke-width="2"
                stroke-linecap="round"
              />
            </svg>
          </button>

          <button disabled={activePage === pageArray.length} className="next" onClick={handleNext}>
            <svg
              width="9"
              height="14"
              viewBox="0 0 9 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.06543 13L7.74127 7.07479C7.7861 7.035 7.7861 6.965 7.74127 6.92521L1.06543 1"
                stroke="black"
                stroke-opacity="0.87"
                stroke-width="2"
                stroke-linecap="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Paginate;
