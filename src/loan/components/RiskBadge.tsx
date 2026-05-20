export function RiskBadge({ level }: { level: "Low" | "Medium" | "High" }) {
  const cls = {
    Low: "bg-[hsl(var(--trust-green-soft))] text-[hsl(var(--trust-green))]",
    Medium: "bg-amber-50 text-amber-800",
    High: "bg-red-50 text-red-700",
  }[level];
  return <span className={`text-xs px-2 py-1 rounded-full font-medium ${cls}`}>{level} Risk</span>;
}
