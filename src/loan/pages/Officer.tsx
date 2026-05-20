import { LoanLayout } from "../components/LoanLayout";
import { RiskBadge } from "../components/RiskBadge";
import { FieldReviewCard } from "../components/FieldReviewCard";
import { Button } from "@/components/ui/button";
import { CheckCircle2, FileText, MessageSquare, X } from "lucide-react";

export default function Officer() {
  return (
    <LoanLayout title="Officer Review">
      <div className="rounded-2xl border bg-card p-4 mb-4">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs text-muted-foreground">AGL-2026-00291</p>
            <h2 className="text-lg font-semibold">Ramesh Tamang</h2>
            <p className="text-sm text-muted-foreground">Agriculture loan • Pokhara, Kaski</p>
          </div>
          <RiskBadge level="Low" />
        </div>
        <div className="mt-3 flex items-baseline justify-between">
          <span className="text-sm text-muted-foreground">Requested</span>
          <span className="text-xl font-semibold">NRs 200,000</span>
        </div>
      </div>

      <h3 className="font-semibold mb-2 flex items-center gap-1"><FileText className="w-4 h-4" /> Document status</h3>
      <div className="grid grid-cols-1 gap-2 mb-5">
        <FieldReviewCard flag="ok" label="Citizenship No" value="34-01-76-00012" />
        <FieldReviewCard flag="ok" label="Lalpurja owner" value="Matches applicant" />
        <FieldReviewCard flag="warn" label="Selfie verification" value="Pending review" />
        <FieldReviewCard flag="fail" label="Income proof" value="Missing" />
      </div>

      <h3 className="font-semibold mb-2">AI flags</h3>
      <ul className="space-y-1 text-sm mb-6">
        {[
          { ok: true, t: "Citizenship number extracted successfully" },
          { ok: true, t: "Lalpurja owner matches applicant" },
          { ok: false, t: "Selfie verification pending" },
          { ok: false, t: "Income proof missing" },
        ].map((f, i) => (
          <li key={i} className="flex items-start gap-2 p-2 rounded-lg bg-card border">
            <CheckCircle2 className={`w-4 h-4 mt-0.5 ${f.ok ? "text-[hsl(var(--trust-green))]" : "text-amber-500"}`} /> {f.t}
          </li>
        ))}
      </ul>

      <div className="grid grid-cols-2 gap-2">
        <Button className="h-12 bg-[hsl(var(--trust-green))] hover:bg-[hsl(var(--trust-green))]/90">Approve</Button>
        <Button variant="outline" className="h-12"><MessageSquare className="w-4 h-4 mr-1" /> Request Docs</Button>
        <Button variant="outline" className="h-12">Manual Review</Button>
        <Button variant="outline" className="h-12 text-red-600 border-red-200"><X className="w-4 h-4 mr-1" /> Reject</Button>
      </div>
    </LoanLayout>
  );
}
