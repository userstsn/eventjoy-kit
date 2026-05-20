import { LoanLayout } from "../components/LoanLayout";
import { StatusChecklist } from "../components/StatusChecklist";
import { useApplication } from "../store";
import { Button } from "@/components/ui/button";
import { Clock, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

export default function Status() {
  const { app } = useApplication();
  const items = [
    { label: "Documents uploaded", done: true },
    { label: "Identity extraction completed", done: true },
    { label: "Checking land ownership", done: false },
    { label: "Assessing repayment capacity", done: false },
    { label: "Running compliance checks", done: false },
    { label: "Waiting for officer review", done: false },
  ];
  return (
    <LoanLayout title="Application Status">
      <div className="rounded-3xl bg-gradient-to-br from-[hsl(var(--trust-blue))] to-[hsl(var(--trust-green))] text-white p-5 mb-5">
        <p className="text-xs opacity-80">Application ID</p>
        <h2 className="text-lg font-semibold">{app.id}</h2>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <p className="text-xs opacity-80">Requested</p>
            <p className="font-semibold">NRs {(app.amount || 200000).toLocaleString()}</p>
          </div>
          <div>
            <p className="text-xs opacity-80">Status</p>
            <p className="font-semibold">{app.status === "Draft" ? "Under AI Review" : app.status}</p>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border bg-card p-4 mb-5 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-[hsl(var(--trust-blue-soft))] flex items-center justify-center">
          <Sparkles className="w-5 h-5 text-[hsl(var(--trust-blue))]" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold">Current stage: AI Review</p>
          <p className="text-xs text-muted-foreground flex items-center gap-1"><Clock className="w-3 h-3" /> Estimated 5 minutes</p>
        </div>
      </div>

      <h3 className="font-semibold mb-2">Progress</h3>
      <StatusChecklist items={items} />

      <Button asChild className="w-full h-12 mt-5 bg-[hsl(var(--trust-blue))] hover:bg-[hsl(var(--trust-blue))]/90">
        <Link to="/dashboard">View All Applications</Link>
      </Button>
    </LoanLayout>
  );
}
