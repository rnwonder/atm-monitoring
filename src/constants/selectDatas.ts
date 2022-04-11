import sortArrayObjects from "../functions/SortArrayObjects";

const unSortedDesignationData = [
  "Assistant Branch Manager",
  "Officer",
  "Custodian",
  "Operations Head",
  "Teller",
];

const unSortedBranchData = [
  "Kairaba",
  "Bambo",
  "Churchill town",
  "Brikama",
  "Senegambia",
  "Jimpex",
  "Latrikunda",
  "Brusubi",
  "Bundung",
  "Farafenni",
  "Basse",
  "Bakau",
  "Banjul 1",
  "Banjul independence drive",
];

const unSortedOperationalStatusData = [
  "Dispensing",
  "Not Dispensing",
  "Cash Jam",
  "Offline",
  "Online",
  "Faulty Card Reader",
  "Closed",
  "Is Being Serviced"
];

const unsortedCashStatusData = [
  { name: "Cash Adequate", value: "OK" },
  { name: "Cash Low - Warning", value: "Low Cash 1" },
  { name: "Check Casette", value: "ASAP" },
  { name: "Cash Out", value: "Out of Cash" },
  { name: "Cash Low - Critical", value: "Low Cash 2" },

];

export const cashStatusData = sortArrayObjects(unsortedCashStatusData);
export const operationalStatusData = unSortedOperationalStatusData.sort();
export const designationData = unSortedDesignationData.sort();
export const branchData = unSortedBranchData.sort();
export const roleData = ["Admin", "User"];
export const statusData = ["Active"];
export const statusData2 = ["Active", "Inactive"];
