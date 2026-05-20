import { ReactNode } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, Sparkles } from "lucide-react";
import { useLang } from "../i18n";
import { HelpAssistant } from "./HelpAssistant";
import { Button } from "@/components/ui/button";

export function LoanLayout({ children, showBack = true, title }: { children: ReactNode; showBack?: boolean; title?: string }) {
  const { lang, setLang } = useLang();
  const nav = useNavigate();
  const loc = useLocation();
  const isHome = loc.pathname === "/";

  return (
    <div className="min-h-screen bg-gradient-to-b from-[hsl(var(--trust-blue-soft))] to-background">
      <header className="sticky top-0 z-30 bg-background/80 backdrop-blur border-b">
        <div className="max-w-md mx-auto flex items-center justify-between h-14 px-4">
          <div className="flex items-center gap-2 min-w-0">
            {showBack && !isHome ? (
              <button onClick={() => nav(-1)} className="p-2 -ml-2 rounded-full hover:bg-muted">
                <ArrowLeft className="w-5 h-5" />
              </button>
            ) : (
              <Link to="/" className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[hsl(var(--trust-blue))] to-[hsl(var(--trust-green))] flex items-center justify-center text-white">
                  <Sparkles className="w-4 h-4" />
                </div>
              </Link>
            )}
            <span className="font-semibold truncate">{title || "AI Loan Sathi"}</span>
          </div>
          <div className="flex items-center gap-1 text-xs">
            <button
              onClick={() => setLang("en")}
              className={`px-2 py-1 rounded-full ${lang === "en" ? "bg-foreground text-background" : "text-muted-foreground"}`}
            >EN</button>
            <button
              onClick={() => setLang("ne")}
              className={`px-2 py-1 rounded-full ${lang === "ne" ? "bg-foreground text-background" : "text-muted-foreground"}`}
            >ने</button>
          </div>
        </div>
      </header>
      <main className="max-w-md mx-auto px-4 py-4 pb-28">{children}</main>
      <HelpAssistant />
    </div>
  );
}

export function StickyFooter({ children }: { children: ReactNode }) {
  return (
    <div className="fixed bottom-0 inset-x-0 z-20 bg-background/95 backdrop-blur border-t">
      <div className="max-w-md mx-auto p-3 flex gap-2">{children}</div>
    </div>
  );
}

export function PrimaryButton(props: React.ComponentProps<typeof Button>) {
  return <Button {...props} className={"flex-1 h-12 text-base bg-[hsl(var(--trust-blue))] hover:bg-[hsl(var(--trust-blue))]/90 " + (props.className || "")} />;
}
