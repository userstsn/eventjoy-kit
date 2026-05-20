import { useNavigate } from "react-router-dom";
import { LoanLayout, PrimaryButton, StickyFooter } from "../components/LoanLayout";
import { ProgressStepper } from "../components/ProgressStepper";
import { useApplication } from "../store";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Upload, Wallet } from "lucide-react";

const sources = ["Farming", "Salary", "Small Business", "Remittance", "Daily Wage", "Livestock", "Other"];
const walletList = ["eSewa", "Khalti", "IME Pay", "ConnectIPS", "Other"];

export default function Income() {
  const nav = useNavigate();
  const { app, update } = useApplication();

  const toggle = (arr: string[], v: string) => arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v];

  return (
    <LoanLayout title="Income & Activity">
      <ProgressStepper current={2} />

      <Section title="How do you earn income?">
        <div className="grid grid-cols-2 gap-2">
          {sources.map((s) => {
            const on = app.incomeSources.includes(s);
            return (
              <button
                key={s}
                type="button"
                onClick={() => update({ incomeSources: toggle(app.incomeSources, s) })}
                className={`p-3 rounded-2xl border text-sm text-left flex items-center gap-2 ${
                  on ? "bg-[hsl(var(--trust-blue-soft))] border-[hsl(var(--trust-blue))] text-foreground"
                     : "bg-card border-border"
                }`}
              >
                <Checkbox checked={on} className="pointer-events-none" />
                {s}
              </button>
            );
          })}
        </div>
      </Section>

      <Section title="Do you receive money from abroad?">
        <YesNo
          value={app.remittance.receives}
          onChange={(v) => update({ remittance: { ...app.remittance, receives: v } })}
        />
        {app.remittance.receives && (
          <div className="space-y-3 mt-3">
            <Field label="Country" value={app.remittance.country || ""} onChange={(v) => update({ remittance: { ...app.remittance, country: v } })} placeholder="Qatar" />
            <Field label="Monthly Average Amount (NRs)" type="number" value={app.remittance.monthly || ""} onChange={(v) => update({ remittance: { ...app.remittance, monthly: Number(v) } })} placeholder="40000" />
            <Button variant="outline" className="w-full h-11"><Upload className="w-4 h-4 mr-1" /> Upload Remittance Proof</Button>
          </div>
        )}
      </Section>

      <Section title="Which wallets do you use?">
        <div className="grid grid-cols-2 gap-2">
          {walletList.map((w) => {
            const on = app.wallets.includes(w);
            return (
              <button
                key={w}
                type="button"
                onClick={() => update({ wallets: toggle(app.wallets, w) })}
                className={`p-3 rounded-2xl border text-sm text-left flex items-center gap-2 ${
                  on ? "bg-[hsl(var(--trust-green-soft))] border-[hsl(var(--trust-green))] text-foreground"
                     : "bg-card border-border"
                }`}
              >
                <Wallet className="w-4 h-4 opacity-70" />
                {w}
              </button>
            );
          })}
        </div>
        <div className="grid grid-cols-2 gap-2 mt-3">
          <Button variant="outline" className="h-11"><Upload className="w-4 h-4 mr-1" /> Wallet screenshot</Button>
          <Button variant="ghost" className="h-11" disabled>Connect wallet</Button>
        </div>
      </Section>

      <Section title="Are you part of a cooperative?">
        <YesNo
          value={app.cooperative.member}
          onChange={(v) => update({ cooperative: { ...app.cooperative, member: v } })}
        />
        {app.cooperative.member && (
          <div className="space-y-3 mt-3">
            <Field label="Cooperative Name" value={app.cooperative.name || ""} onChange={(v) => update({ cooperative: { ...app.cooperative, name: v } })} placeholder="Kavre Agro Cooperative" />
            <Field label="Membership Number" value={app.cooperative.membershipNo || ""} onChange={(v) => update({ cooperative: { ...app.cooperative, membershipNo: v } })} placeholder="KAC-1024" />
            <Button variant="outline" className="w-full h-11"><Upload className="w-4 h-4 mr-1" /> Upload Membership Proof</Button>
          </div>
        )}
      </Section>

      <StickyFooter>
        <PrimaryButton onClick={() => nav("/apply/consent")}>Continue</PrimaryButton>
      </StickyFooter>
    </LoanLayout>
  );
}

function Section({ title, children }: { title: string; children: any }) {
  return (
    <div className="mb-6">
      <h3 className="text-sm font-semibold mb-2">{title}</h3>
      {children}
    </div>
  );
}
function YesNo({ value, onChange }: { value: boolean; onChange: (v: boolean) => void }) {
  return (
    <div className="grid grid-cols-2 gap-2">
      {[true, false].map((v) => (
        <button
          key={String(v)}
          onClick={() => onChange(v)}
          className={`h-11 rounded-full border text-sm ${value === v ? "bg-foreground text-background border-foreground" : "bg-card"}`}
        >{v ? "Yes" : "No"}</button>
      ))}
    </div>
  );
}
function Field({ label, value, onChange, ...rest }: any) {
  return (
    <div>
      <Label className="text-sm font-medium mb-1.5 block">{label}</Label>
      <Input {...rest} value={value} onChange={(e) => onChange(e.target.value)} className="h-12 rounded-xl" />
    </div>
  );
}
