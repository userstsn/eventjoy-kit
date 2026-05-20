import { Check, FileText, Camera, Wallet, ShieldCheck, ListChecks } from "lucide-react";
import { useLang } from "../i18n";

const steps = [
  { key: "basic", path: "/apply/basic-info", icon: FileText, label: "basic" },
  { key: "documents", path: "/apply/documents", icon: Camera, label: "documents" },
  { key: "income", path: "/apply/income", icon: Wallet, label: "income" },
  { key: "consent", path: "/apply/consent", icon: ShieldCheck, label: "consent" },
  { key: "review", path: "/apply/review", icon: ListChecks, label: "review" },
];

export function ProgressStepper({ current }: { current: number }) {
  const { t } = useLang();
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between">
        {steps.map((s, i) => {
          const done = i < current;
          const active = i === current;
          const Icon = s.icon;
          return (
            <div key={s.key} className="flex-1 flex flex-col items-center">
              <div className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ${
                done ? "bg-[hsl(var(--trust-green))] text-white" :
                active ? "bg-[hsl(var(--trust-blue))] text-white ring-4 ring-[hsl(var(--trust-blue-soft))]" :
                "bg-muted text-muted-foreground"
              }`}>
                {done ? <Check className="w-4 h-4" /> : <Icon className="w-4 h-4" />}
              </div>
              <span className={`mt-1 text-[10px] truncate ${active ? "font-medium text-foreground" : "text-muted-foreground"}`}>
                {t(s.label)}
              </span>
            </div>
          );
        })}
      </div>
      <div className="relative mt-2 h-1 bg-muted rounded-full overflow-hidden">
        <div
          className="absolute inset-y-0 left-0 bg-[hsl(var(--trust-blue))] transition-all"
          style={{ width: `${((current + 1) / steps.length) * 100}%` }}
        />
      </div>
    </div>
  );
}
