import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IOverviewFilter } from "../../interface/overviewFilter";

export interface IFilterSlice {
  overview: IOverviewFilter;
}

const initialState: IFilterSlice = {
  overview: "none",
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setOverviewFilterAction: (state, { payload }: PayloadAction<IOverviewFilter>) => {
      state.overview = payload;
    },
  },
});

export const { setOverviewFilterAction } = filterSlice.actions;
