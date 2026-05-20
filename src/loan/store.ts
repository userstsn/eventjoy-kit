// Tiny in-memory app store with localStorage draft persistence
import { useEffect, useState } from "react";

export type LoanType = "Agriculture" | "Small Business" | "Personal" | "Livestock" | "Education";

export type Application = {
  id: string;
  fullName: string;
  citizenshipNo: string;
  dob: string;
  mobile: string;
  address: string;
  occupation: string;
  loanPurpose: string;
  amount: number;
  loanType: LoanType | "";
  documents: Record<string, "none" | "uploaded" | "checking" | "verified" | "retake">;
  incomeSources: string[];
  remittance: { receives: boolean; country?: string; monthly?: number };
  wallets: string[];
  cooperative: { member: boolean; name?: string; membershipNo?: string };
  consents: Record<string, boolean>;
  status: "Draft" | "Submitted" | "Under AI Review" | "Needs More Documents" | "Officer Review" | "Approved" | "Rejected";
  updatedAt: string;
};

export const defaultApp = (): Application => ({
  id: "AGL-2026-00291",
  fullName: "",
  citizenshipNo: "",
  dob: "",
  mobile: "",
  address: "",
  occupation: "",
  loanPurpose: "",
  amount: 0,
  loanType: "",
  documents: {
    "Citizenship Front": "none",
    "Citizenship Back": "none",
    "Selfie / Live Photo": "none",
    "Passport-size Photo": "none",
    "Lalpurja": "none",
  },
  incomeSources: [],
  remittance: { receives: false },
  wallets: [],
  cooperative: { member: false },
  consents: {},
  status: "Draft",
  updatedAt: new Date().toISOString(),
});

const KEY = "loan-sathi-app";

export function useApplication() {
  const [app, setApp] = useState<Application>(() => {
    try {
      const s = localStorage.getItem(KEY);
      return s ? JSON.parse(s) : defaultApp();
    } catch {
      return defaultApp();
    }
  });
  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify({ ...app, updatedAt: new Date().toISOString() }));
  }, [app]);
  const update = (patch: Partial<Application>) => setApp((a) => ({ ...a, ...patch }));
  return { app, setApp, update };
}

export const mockApplications: Application[] = [
  {
    ...defaultApp(),
    id: "AGL-2026-00291",
    fullName: "Ramesh Tamang",
    address: "Pokhara, Kaski",
    loanType: "Agriculture",
    amount: 200000,
    status: "Under AI Review",
  },
  {
    ...defaultApp(),
    id: "AGL-2026-00254",
    fullName: "Sita Gurung",
    address: "Kavre",
    loanType: "Small Business",
    amount: 150000,
    status: "Officer Review",
  },
  {
    ...defaultApp(),
    id: "AGL-2026-00210",
    fullName: "Hari Bahadur Karki",
    address: "Pokhara",
    loanType: "Livestock",
    amount: 80000,
    status: "Approved",
  },
  {
    ...defaultApp(),
    id: "AGL-2026-00198",
    fullName: "Maya Thapa",
    address: "Lalitpur",
    loanType: "Education",
    amount: 300000,
    status: "Draft",
  },
];
