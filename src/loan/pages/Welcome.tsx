import { Link } from "react-router-dom";
import { LoanLayout } from "../components/LoanLayout";
import { Sparkles, ShieldCheck, FileText, Wallet } from "lucide-react";
import { useLang } from "../i18n";
import { Button } from "@/components/ui/button";

export default function Welcome() {
  const { t } = useLang();
  return (
    <LoanLayout showBack={false}>
      <div className="text-center pt-6 pb-8">
        <div className="mx-auto w-20 h-20 rounded-3xl bg-gradient-to-br from-[hsl(var(--trust-blue))] to-[hsl(var(--trust-green))] flex items-center justify-center text-white mb-4 shadow-lg">
          <Sparkles className="w-10 h-10" />
        </div>
        <h1 className="text-3xl font-bold">{t("appName")}</h1>
        <p className="text-muted-foreground mt-2 px-4">{t("tagline")}</p>
      </div>

      <div className="rounded-3xl bg-card border p-5 mb-5 shadow-sm">
        <p className="text-sm text-foreground/80 leading-relaxed">
          Apply for a loan using your citizenship, income details, and documents.
          Our AI helps verify your information so you can apply quickly and safely.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-6">
        {[
          { Icon: FileText, label: "Easy form" },
          { Icon: ShieldCheck, label: "Safe & secure" },
          { Icon: Wallet, label: "Fast review" },
        ].map(({ Icon, label }) => (
          <div key={label} className="rounded-2xl bg-[hsl(var(--trust-blue-soft))] p-3 flex flex-col items-center text-center">
            <Icon className="w-5 h-5 text-[hsl(var(--trust-blue))] mb-1" />
            <span className="text-[11px] font-medium">{label}</span>
          </div>
        ))}
      </div>

      <div className="space-y-3">
        <Button asChild className="w-full h-12 text-base bg-[hsl(var(--trust-blue))] hover:bg-[hsl(var(--trust-blue))]/90">
          <Link to="/apply/basic-info">{t("start")}</Link>
        </Button>
        <Button asChild variant="outline" className="w-full h-12 text-base">
          <Link to="/dashboard">{t("checkStatus")}</Link>
        </Button>
        <Button asChild variant="ghost" className="w-full text-xs text-muted-foreground">
          <Link to="/officer">Officer view (demo)</Link>
        </Button>
      </div>
    </LoanLayout>
  );
}
