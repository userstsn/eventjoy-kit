import { Check, Clock } from "lucide-react";

export type ChecklistItem = { label: string; done: boolean };

export function StatusChecklist({ items }: { items: ChecklistItem[] }) {
  return (
    <ul className="space-y-2">
      {items.map((i) => (
        <li key={i.label} className="flex items-center gap-3 p-3 rounded-xl bg-card border">
          <div className={`w-7 h-7 rounded-full flex items-center justify-center ${
            i.done ? "bg-[hsl(var(--trust-green))] text-white" : "bg-muted text-muted-foreground"
          }`}>
            {i.done ? <Check className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
          </div>
          <span className={i.done ? "text-foreground" : "text-muted-foreground"}>{i.label}</span>
        </li>
      ))}
    </ul>
  );
}
