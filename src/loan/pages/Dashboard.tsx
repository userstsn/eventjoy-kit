import { LoanLayout } from "../components/LoanLayout";
import { ApplicationCard } from "../components/ApplicationCard";
import { mockApplications, useApplication } from "../store";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Plus, WifiOff } from "lucide-react";

export default function Dashboard() {
  const { app } = useApplication();
  const list = [app, ...mockApplications.filter((m) => m.id !== app.id)];
  return (
    <LoanLayout title="My Applications">
      <div className="rounded-2xl bg-[hsl(var(--trust-green-soft))] text-[hsl(var(--trust-green))] p-3 mb-4 text-sm flex items-center gap-2">
        <WifiOff className="w-4 h-4" /> Draft saved on this device
      </div>
      <div className="space-y-3 mb-4">
        {list.map((a) => <ApplicationCard key={a.id} app={a} />)}
      </div>
      <Button asChild className="w-full h-12 bg-[hsl(var(--trust-blue))] hover:bg-[hsl(var(--trust-blue))]/90">
        <Link to="/apply/basic-info"><Plus className="w-4 h-4 mr-1" /> New Application</Link>
      </Button>
    </LoanLayout>
  );
}
