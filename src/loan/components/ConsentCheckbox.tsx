import { Checkbox } from "@/components/ui/checkbox";

export function ConsentCheckbox({
  id, checked, onChange, label,
}: { id: string; checked: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <label htmlFor={id} className="flex items-start gap-3 p-3 rounded-2xl border bg-card cursor-pointer">
      <Checkbox id={id} checked={checked} onCheckedChange={(v) => onChange(Boolean(v))} className="mt-0.5" />
      <span className="text-sm leading-snug">{label}</span>
    </label>
  );
}
