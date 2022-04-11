import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { IUsersBranch, IUsersData, IUsersDesignation, IUsersRole, IUsersStatus } from '../../interface/usersData';

export interface IUsersTableSlice {
    main: IUsersData[]
    filtered: IUsersData[]
    filterParameters: {
        designation: IUsersDesignation
        role: IUsersRole
        branch: IUsersBranch
        status: IUsersStatus
    }
}

const initialState : IUsersTableSlice = {
    main: [],
    filtered: [],
    filterParameters: {
        designation: "",
        role: "",
        branch: "",
        status: "",
    }
}

export const usersTableSlice = createSlice({
    name: "usersTable",
    initialState,
    reducers: {
        setMainUsersTableDataAction: (state, { payload }: PayloadAction<IUsersData[]> ) => {
            state.main = payload
        },
        setFilteredUsersTableDataAction: (state, { payload }: PayloadAction<IUsersData[]> ) => {
            state.filtered = payload
        },
        setUsersTableFilterDesignationAction: (state, { payload }: PayloadAction<IUsersDesignation> ) => {
            state.filterParameters.designation = payload
        },
        setUsersTableFilterBranchAction: (state, { payload }: PayloadAction<IUsersBranch> ) => {
            state.filterParameters.branch = payload
        },
        setUsersTableFilterRoleAction: (state, { payload }: PayloadAction<IUsersRole> ) => {
            state.filterParameters.role = payload
        },
        setUsersTableFilterStatusAction: (state, { payload }: PayloadAction<IUsersStatus> ) => {
            state.filterParameters.status = payload
        },
    }
})

export const {
    setFilteredUsersTableDataAction,
    setMainUsersTableDataAction,
    setUsersTableFilterBranchAction,
    setUsersTableFilterDesignationAction,
    setUsersTableFilterRoleAction,
    setUsersTableFilterStatusAction,
} = usersTableSlice.actions