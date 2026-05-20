import { Link } from "react-router-dom";
import { Application } from "../store";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const statusColor: Record<string, string> = {
  Draft: "bg-muted text-muted-foreground",
  Submitted: "bg-blue-50 text-blue-700",
  "Under AI Review": "bg-blue-50 text-blue-700",
  "Needs More Documents": "bg-amber-50 text-amber-800",
  "Officer Review": "bg-purple-50 text-purple-700",
  Approved: "bg-[hsl(var(--trust-green-soft))] text-[hsl(var(--trust-green))]",
  Rejected: "bg-red-50 text-red-700",
};

export function ApplicationCard({ app }: { app: Application }) {
  return (
    <div className="rounded-2xl border bg-card p-4 space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground">{app.id}</span>
        <span className={`text-xs px-2 py-0.5 rounded-full ${statusColor[app.status]}`}>{app.status}</span>
      </div>
      <div>
        <h3 className="font-semibold">{app.fullName || "Untitled application"}</h3>
        <p className="text-sm text-muted-foreground">{app.loanType || "—"} • NRs {app.amount.toLocaleString()}</p>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground">Updated {new Date(app.updatedAt).toLocaleDateString()}</span>
        <Button asChild size="sm" variant="ghost" className="text-[hsl(var(--trust-blue))]">
          <Link to={app.status === "Draft" ? "/apply/basic-info" : "/status"}>
            {app.status === "Draft" ? "Continue" : "View Status"} <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
