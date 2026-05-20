import { Sprout, Store, User, Beef, GraduationCap } from "lucide-react";
import { LoanType } from "../store";

const icons: Record<LoanType, any> = {
  Agriculture: Sprout,
  "Small Business": Store,
  Personal: User,
  Livestock: Beef,
  Education: GraduationCap,
};

export function LoanTypeCard({ type, selected, onClick }: { type: LoanType; selected: boolean; onClick: () => void }) {
  const Icon = icons[type];
  return (
    <button
      type="button"
      onClick={onClick}
      className={`p-3 rounded-2xl border text-left transition-all flex flex-col items-start gap-2 ${
        selected
          ? "border-[hsl(var(--trust-blue))] bg-[hsl(var(--trust-blue-soft))] ring-2 ring-[hsl(var(--trust-blue))]/30"
          : "border-border bg-card hover:bg-muted/50"
      }`}
    >
      <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${selected ? "bg-[hsl(var(--trust-blue))] text-white" : "bg-muted text-foreground"}`}>
        <Icon className="w-4 h-4" />
      </div>
      <span className="text-sm font-medium">{type}</span>
    </button>
  );
}
