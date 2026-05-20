import { useState } from "react";
import { HelpCircle, Mic, Phone, X } from "lucide-react";

const helpItems = [
  "How to upload citizenship?",
  "How to take a clear photo?",
  "What is Lalpurja?",
  "What is KYC?",
];

export function HelpAssistant() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        aria-label="Help"
        onClick={() => setOpen(true)}
        className="fixed bottom-24 right-4 z-30 w-14 h-14 rounded-full shadow-lg bg-[hsl(var(--trust-blue))] text-white flex items-center justify-center hover:scale-105 transition"
      >
        <HelpCircle className="w-6 h-6" />
      </button>
      {open && (
        <div className="fixed inset-0 z-40 bg-black/40 flex items-end" onClick={() => setOpen(false)}>
          <div
            className="bg-background w-full max-w-md mx-auto rounded-t-3xl p-5 space-y-3 animate-in slide-in-from-bottom"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Need help?</h3>
              <button onClick={() => setOpen(false)} className="p-2 rounded-full hover:bg-muted"><X className="w-4 h-4" /></button>
            </div>
            <ul className="space-y-2">
              {helpItems.map((h) => (
                <li key={h}>
                  <button className="w-full text-left p-3 rounded-xl bg-muted/50 hover:bg-muted text-sm">{h}</button>
                </li>
              ))}
            </ul>
            <div className="rounded-2xl bg-[hsl(var(--trust-blue-soft))] p-4 text-sm">
              <div className="flex items-center gap-2 font-medium text-[hsl(var(--trust-blue))] mb-1">
                <Mic className="w-4 h-4" /> Listen in Nepali
              </div>
              <p className="text-foreground/80">"कृपया नागरिकताको अगाडिको भाग स्पष्ट देखिने गरी फोटो खिच्नुहोस्।"</p>
            </div>
            <button className="w-full h-11 rounded-full bg-foreground text-background flex items-center justify-center gap-2">
              <Phone className="w-4 h-4" /> Call Support
            </button>
          </div>
        </div>
      )}
    </>
  );
}
