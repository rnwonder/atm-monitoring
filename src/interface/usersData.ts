export interface IUsersData {
  id: number;
  fullname: string;
  email: string;
  password?: string;
  designation: string;
  role: string;
  branch: string;
  is_active: boolean;
  change_password: boolean;
  created_at: string;
  updated_at: string;
}

export type IUsersDesignation =
  | ""
  | "Assistant Branch Manager"
  | "Officer"
  | "Custodian"
  | "Operations Head"
  | "Teller";

export type IUsersRole = "" | "Admin" | "User";

export type IUsersStatus = "" | "Active" | "Inactive";

export type IUsersBranch =
  | ""
  | "Kairaba"
  | "Bambo"
  | "Churchill town"
  | "Brikama"
  | "Senegambia"
  | "Jimpex"
  | "Latrikunda"
  | "Brusubi"
  | "Bundung"
  | "Farafenni"
  | "Basse"
  | "Bakau"
  | "Banjul 1"
  | "Banjul independence drive";
