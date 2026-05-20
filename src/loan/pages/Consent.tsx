import { useNavigate } from "react-router-dom";
import { LoanLayout, PrimaryButton, StickyFooter } from "../components/LoanLayout";
import { ProgressStepper } from "../components/ProgressStepper";
import { ConsentCheckbox } from "../components/ConsentCheckbox";
import { useApplication } from "../store";
import { Info } from "lucide-react";

const items = [
  { id: "docs", label: "I allow AI to read my uploaded documents." },
  { id: "id", label: "I allow identity and document verification." },
  { id: "credit", label: "I allow credit assessment." },
  { id: "fraud", label: "I allow fraud prevention checks." },
  { id: "manual", label: "I understand a bank officer may manually review my application." },
];

const explainers = [
  { title: "OCR means", body: "AI reads text from your document image." },
  { title: "KYC means", body: "Bank checks that you are a real person." },
  { title: "AML means", body: "Bank checks that the loan is not linked to illegal money or fraud." },
];

export default function Consent() {
  const nav = useNavigate();
  const { app, update } = useApplication();
  const all = items.every((i) => app.consents[i.id]);
  return (
    <LoanLayout title="Consent & Verification">
      <ProgressStepper current={3} />
      <p className="text-sm text-muted-foreground mb-4">
        We need your permission to check your documents and assess your loan application safely.
      </p>
      <div className="space-y-2 mb-5">
        {items.map((i) => (
          <ConsentCheckbox
            key={i.id} id={i.id} label={i.label}
            checked={!!app.consents[i.id]}
            onChange={(v) => update({ consents: { ...app.consents, [i.id]: v } })}
          />
        ))}
      </div>
      <h3 className="text-sm font-semibold mb-2">What these mean</h3>
      <div className="space-y-2">
        {explainers.map((e) => (
          <div key={e.title} className="rounded-2xl bg-[hsl(var(--trust-blue-soft))] p-3 text-sm flex gap-2">
            <Info className="w-4 h-4 mt-0.5 text-[hsl(var(--trust-blue))]" />
            <div><span className="font-medium">{e.title}: </span>{e.body}</div>
          </div>
        ))}
      </div>
      <StickyFooter>
        <PrimaryButton disabled={!all} onClick={() => nav("/apply/review")}>Continue</PrimaryButton>
      </StickyFooter>
    </LoanLayout>
  );
}
