import { CheckCircle2, AlertTriangle, XCircle } from "lucide-react";

type Flag = "ok" | "warn" | "fail";

export function FieldReviewCard({ flag, label, value }: { flag: Flag; label: string; value: string }) {
  const Icon = flag === "ok" ? CheckCircle2 : flag === "warn" ? AlertTriangle : XCircle;
  const color = flag === "ok" ? "text-[hsl(var(--trust-green))]" : flag === "warn" ? "text-amber-600" : "text-red-600";
  return (
    <div className="flex items-start gap-3 p-3 rounded-xl border bg-card">
      <Icon className={`w-5 h-5 mt-0.5 ${color}`} />
      <div className="flex-1 min-w-0">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-sm font-medium truncate">{value}</p>
      </div>
    </div>
  );
}
