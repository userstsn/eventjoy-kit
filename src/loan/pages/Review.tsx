import { useNavigate } from "react-router-dom";
import { LoanLayout, PrimaryButton, StickyFooter } from "../components/LoanLayout";
import { ProgressStepper } from "../components/ProgressStepper";
import { useApplication } from "../store";
import { Check, AlertTriangle } from "lucide-react";

export default function Review() {
  const nav = useNavigate();
  const { app, update } = useApplication();

  const sections = [
    { title: "Personal Details", items: [
      ["Name", app.fullName], ["Citizenship", app.citizenshipNo], ["Mobile", app.mobile], ["Address", app.address],
    ]},
    { title: "Loan Details", items: [
      ["Type", app.loanType], ["Amount", "NRs " + app.amount.toLocaleString()], ["Purpose", app.loanPurpose],
    ]},
  ];

  const docList = Object.entries(app.documents).map(([k, v]) => ({ k, v }));
  const consentDone = Object.values(app.consents).filter(Boolean).length;

  return (
    <LoanLayout title="Review & Submit">
      <ProgressStepper current={4} />

      {sections.map((s) => (
        <div key={s.title} className="mb-4 rounded-2xl border bg-card p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold">{s.title}</h3>
            <Chip ok />
          </div>
          <dl className="text-sm space-y-1">
            {s.items.map(([k, v]) => (
              <div key={k} className="flex justify-between gap-3">
                <dt className="text-muted-foreground">{k}</dt>
                <dd className="font-medium text-right truncate">{v || "—"}</dd>
              </div>
            ))}
          </dl>
        </div>
      ))}

      <div className="mb-4 rounded-2xl border bg-card p-4">
        <h3 className="font-semibold mb-2">Uploaded Documents</h3>
        <ul className="text-sm space-y-1">
          {docList.map((d) => (
            <li key={d.k} className="flex justify-between">
              <span>{d.k}</span>
              {d.v === "verified" ? <Chip ok /> : d.v === "none" ? <Chip missing /> : <Chip review />}
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-4 rounded-2xl border bg-card p-4 flex items-center justify-between">
        <div>
          <h3 className="font-semibold">Income Sources</h3>
          <p className="text-sm text-muted-foreground">{app.incomeSources.join(", ") || "Not specified"}</p>
        </div>
        {app.incomeSources.length ? <Chip ok /> : <Chip missing />}
      </div>

      <div className="mb-4 rounded-2xl border bg-card p-4 flex items-center justify-between">
        <div>
          <h3 className="font-semibold">Consent Status</h3>
          <p className="text-sm text-muted-foreground">{consentDone} of 5 agreed</p>
        </div>
        {consentDone === 5 ? <Chip ok /> : <Chip missing />}
      </div>

      <StickyFooter>
        <PrimaryButton onClick={() => { update({ status: "Under AI Review" }); nav("/status"); }}>
          Submit Application
        </PrimaryButton>
      </StickyFooter>
    </LoanLayout>
  );
}

function Chip({ ok, missing, review }: { ok?: boolean; missing?: boolean; review?: boolean }) {
  if (ok) return <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-[hsl(var(--trust-green-soft))] text-[hsl(var(--trust-green))]"><Check className="w-3 h-3" /> Completed</span>;
  if (missing) return <span className="text-xs px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 inline-flex items-center gap-1"><AlertTriangle className="w-3 h-3" /> Missing</span>;
  if (review) return <span className="text-xs px-2 py-0.5 rounded-full bg-blue-50 text-blue-700">Needs Review</span>;
  return null;
}
