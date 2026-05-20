import { useNavigate } from "react-router-dom";
import { LoanLayout, StickyFooter, PrimaryButton } from "../components/LoanLayout";
import { ProgressStepper } from "../components/ProgressStepper";
import { LoanTypeCard } from "../components/LoanTypeCard";
import { useApplication, LoanType } from "../store";
import { useLang } from "../i18n";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const loanTypes: LoanType[] = ["Agriculture", "Small Business", "Personal", "Livestock", "Education"];

export default function BasicInfo() {
  const nav = useNavigate();
  const { app, update } = useApplication();
  const { t } = useLang();

  const canContinue = app.fullName && app.citizenshipNo && app.mobile && app.loanType && app.amount > 0;

  return (
    <LoanLayout title="Apply for Loan">
      <ProgressStepper current={0} />
      <h2 className="text-xl font-semibold mb-1">Tell us about you</h2>
      <p className="text-sm text-muted-foreground mb-4">We need a few basics to start your application.</p>

      <div className="space-y-4">
        <Field label={t("fullName")} value={app.fullName} onChange={(v) => update({ fullName: v })} placeholder="Ramesh Tamang" />
        <Field label={t("citizenship")} value={app.citizenshipNo} onChange={(v) => update({ citizenshipNo: v })} placeholder="34-01-76-00012" />
        <Field label={t("dob")} type="date" value={app.dob} onChange={(v) => update({ dob: v })} />
        <Field label={t("mobile")} type="tel" value={app.mobile} onChange={(v) => update({ mobile: v })} placeholder="98XXXXXXXX" />
        <Field label={t("address")} value={app.address} onChange={(v) => update({ address: v })} placeholder="Pokhara, Kaski" />
        <Field label={t("occupation")} value={app.occupation} onChange={(v) => update({ occupation: v })} placeholder="Farmer" />

        <div>
          <Label className="text-sm font-medium mb-2 block">{t("loanType")}</Label>
          <div className="grid grid-cols-2 gap-2">
            {loanTypes.map((lt) => (
              <LoanTypeCard key={lt} type={lt} selected={app.loanType === lt} onClick={() => update({ loanType: lt })} />
            ))}
          </div>
        </div>

        <Field label={t("loanPurpose")} value={app.loanPurpose} onChange={(v) => update({ loanPurpose: v })} placeholder="Buy seeds and fertilizer" />

        <div>
          <Label className="text-sm font-medium mb-2 block">{t("amount")}</Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">NRs</span>
            <Input
              type="number"
              inputMode="numeric"
              className="h-12 pl-12 text-base rounded-xl"
              value={app.amount || ""}
              onChange={(e) => update({ amount: Number(e.target.value) })}
              placeholder="200000"
            />
          </div>
        </div>

        {!canContinue && (
          <p className="text-xs text-muted-foreground">Please fill required fields to continue.</p>
        )}
      </div>

      <StickyFooter>
        <PrimaryButton disabled={!canContinue} onClick={() => nav("/apply/documents")}>{t("continue")}</PrimaryButton>
      </StickyFooter>
    </LoanLayout>
  );
}

function Field({ label, value, onChange, ...rest }: any) {
  return (
    <div>
      <Label className="text-sm font-medium mb-1.5 block">{label}</Label>
      <Input {...rest} value={value} onChange={(e) => onChange(e.target.value)} className="h-12 text-base rounded-xl" />
    </div>
  );
}
