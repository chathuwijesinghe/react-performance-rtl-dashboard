export type RecordStatus = "Active" | "Pending" | "Inactive";

export interface CustomerRecord {
  id: string;
  name: string;
  email: string;
  company: string;
  amount: number;
  status: RecordStatus;
  createdAt: string;
}

export type ApiMode = "success" | "empty" | "error";
export type RequestStatus = "loading" | "success" | "empty" | "error";
