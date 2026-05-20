import { createContext, useContext, useState, ReactNode } from "react";

type Lang = "en" | "ne";
type Dict = Record<string, { en: string; ne: string }>;

export const dict: Dict = {
  appName: { en: "AI Loan Sathi", ne: "एआई लोन साथी" },
  tagline: { en: "Simple loan application with AI document help", ne: "एआईको सहयोगमा सजिलो ऋण आवेदन" },
  start: { en: "Start Application", ne: "आवेदन सुरु गर्नुहोस्" },
  checkStatus: { en: "Check Application Status", ne: "आवेदन स्थिति हेर्नुहोस्" },
  continue: { en: "Continue", ne: "अगाडि बढ्नुहोस्" },
  back: { en: "Back", ne: "पछाडि" },
  submit: { en: "Submit Application", ne: "आवेदन पेश गर्नुहोस्" },
  basic: { en: "Basic Info", ne: "आधारभूत" },
  documents: { en: "Documents", ne: "कागजात" },
  income: { en: "Income", ne: "आम्दानी" },
  consent: { en: "Consent", ne: "मञ्जुरी" },
  review: { en: "Review", ne: "समीक्षा" },
  fullName: { en: "Full Name", ne: "पुरा नाम" },
  citizenship: { en: "Citizenship Number", ne: "नागरिकता नम्बर" },
  dob: { en: "Date of Birth", ne: "जन्म मिति" },
  mobile: { en: "Mobile Number", ne: "मोबाइल नम्बर" },
  address: { en: "Address", ne: "ठेगाना" },
  occupation: { en: "Occupation", ne: "पेशा" },
  loanPurpose: { en: "Loan Purpose", ne: "ऋणको उद्देश्य" },
  amount: { en: "Requested Amount", ne: "रकम (NRs)" },
  loanType: { en: "Loan Type", ne: "ऋण प्रकार" },
};

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: (k: keyof typeof dict | string) => string };
const LangCtx = createContext<Ctx>({ lang: "en", setLang: () => {}, t: (k) => String(k) });

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");
  const t = (k: string) => (dict[k] ? dict[k][lang] : k);
  return <LangCtx.Provider value={{ lang, setLang, t }}>{children}</LangCtx.Provider>;
}

export const useLang = () => useContext(LangCtx);
