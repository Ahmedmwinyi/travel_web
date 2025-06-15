export interface User {
  id: string;
  name: string;
  email: string;
  role: "hod" | "dean" | "dvc" | "admin";
  department?: string;
  school?: string;
  avatar?: string;
}

export interface Request {
  id: string;
  lecturerName: string;
  lecturerEmail: string;
  department: string;
  school: string;
  reason: string;
  startDate: string;
  endDate: string;
  destination: string;
  isPrivate: boolean;
  status: "pending" | "approved" | "rejected";
  currentLevel: "hod" | "dean" | "dvc" | "completed";
  hodApproval?: ApprovalInfo;
  deanApproval?: ApprovalInfo;
  dvcApproval?: ApprovalInfo;
  createdAt: string;
  updatedAt: string;
}

export interface ApprovalInfo {
  approvedBy: string;
  approvedAt: string;
  comment?: string;
  approved: boolean;
}

export interface Department {
  id: string;
  name: string;
  school: string;
  hod: string;
}

export interface School {
  id: string;
  name: string;
  dean: string;
}
