import { useNavigate } from "react-router-dom";
import { LoanLayout, PrimaryButton, StickyFooter } from "../components/LoanLayout";
import { ProgressStepper } from "../components/ProgressStepper";
import { DocumentUploadCard } from "../components/DocumentUploadCard";
import { useApplication } from "../store";
import { CheckCircle2 } from "lucide-react";

export default function Documents() {
  const nav = useNavigate();
  const { app, update } = useApplication();

  const required = ["Citizenship Front", "Citizenship Back", "Selfie / Live Photo", "Passport-size Photo"];
  if (app.loanType === "Agriculture" || app.loanType === "Livestock") required.push("Lalpurja");

  const optional = ["Cooperative Membership Proof", "Remittance Proof", "Utility Bill", "Mobile Wallet Screenshot", "Bank Statement", "Tax Clearance Certificate"];

  const set = (name: string, s: any) => update({ documents: { ...app.documents, [name]: s } });

  const allVerified = required.every((r) => app.documents[r] === "verified");

  return (
    <LoanLayout title="Upload Documents">
      <ProgressStepper current={1} />
      <div className="rounded-2xl bg-[hsl(var(--trust-blue-soft))] p-3 mb-4 text-sm flex items-start gap-2">
        <CheckCircle2 className="w-5 h-5 text-[hsl(var(--trust-blue))] mt-0.5 shrink-0" />
        <p>Our AI checks each photo instantly. You can retake any document that looks blurry.</p>
      </div>

      <h3 className="font-semibold mb-2">Required</h3>
      <div className="space-y-3">
        {required.map((name) => (
          <DocumentUploadCard
            key={name}
            name={name}
            status={app.documents[name] || "none"}
            onChange={(s) => set(name, s)}
            extracted={name === "Citizenship Front" ? [
              { label: "Name extracted", value: app.fullName || "Ramesh Tamang" },
              { label: "Citizenship No", value: app.citizenshipNo || "34-01-76-00012" },
            ] : undefined}
          />
        ))}
      </div>

      <h3 className="font-semibold mt-6 mb-2">Optional (helps approval)</h3>
      <div className="space-y-3">
        {optional.map((name) => (
          <DocumentUploadCard
            key={name}
            name={name}
            optional
            status={app.documents[name] || "none"}
            onChange={(s) => set(name, s)}
          />
        ))}
      </div>

      <StickyFooter>
        <PrimaryButton onClick={() => nav("/apply/income")}>
          {allVerified ? "Continue" : "Continue anyway"}
        </PrimaryButton>
      </StickyFooter>
    </LoanLayout>
  );
}
