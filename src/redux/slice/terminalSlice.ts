import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICashStatus, IOperationalStatus, ITerminalData } from "../../interface/terminalData";

export interface ITerminalSlice {
    main: ITerminalData[]
    filtered: ITerminalData[]
    filterParameters: {
        zone: string
        branch: string
        cashStatus: ICashStatus
        operationalStatus: IOperationalStatus
    }
}

const initialState : ITerminalSlice = {
    main: [],
    filtered: [],
    filterParameters: {
        zone: "",
        branch: "",
        cashStatus: "",
        operationalStatus: "",
    }
}

export const terminalSlice = createSlice({
    name: "terminal",
    initialState,
    reducers: {
        setMainTerminalDataAction: (state, { payload }: PayloadAction<ITerminalData[]> ) => {
            state.main = payload
        },
        setFilteredDataAction: (state, { payload }: PayloadAction<ITerminalData[]> ) => {
            state.filtered = payload
        },
        setTerminalFilterZoneAction: (state, { payload }: PayloadAction<string> ) => {
            state.filterParameters.zone = payload
        },
        setTerminalFilterBranchAction: (state, { payload }: PayloadAction<string> ) => {
            state.filterParameters.branch = payload
        },
        setTerminalFilterCashStatusAction: (state, { payload }: PayloadAction<ICashStatus> ) => {
            state.filterParameters.cashStatus = payload
        },
        setTerminalFilterOperationalStatusAction: (state, { payload }: PayloadAction<IOperationalStatus> ) => {
            state.filterParameters.operationalStatus = payload
        },
    }
})

export const {
    setFilteredDataAction,
    setMainTerminalDataAction,
    setTerminalFilterBranchAction,
    setTerminalFilterCashStatusAction,
    setTerminalFilterOperationalStatusAction,
    setTerminalFilterZoneAction,
} = terminalSlice.actions

