import { Camera, Upload, CheckCircle2, AlertTriangle, Loader2, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

type Status = "none" | "uploaded" | "checking" | "verified" | "retake";

const tips = [
  "Place document on flat surface",
  "Ensure good lighting",
  "Avoid blur",
  "Keep full document inside frame",
];

export function DocumentUploadCard({
  name,
  status,
  onChange,
  optional,
  extracted,
}: {
  name: string;
  status: Status;
  onChange: (s: Status) => void;
  optional?: boolean;
  extracted?: { label: string; value: string }[];
}) {
  const simulate = () => {
    onChange("checking");
    setTimeout(() => {
      // Random verified vs retake for demo
      const ok = Math.random() > 0.25;
      onChange(ok ? "verified" : "retake");
    }, 1400);
  };

  return (
    <div className="rounded-2xl bg-card border p-4 space-y-3 shadow-sm">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-xl bg-[hsl(var(--trust-blue-soft))] flex items-center justify-center text-[hsl(var(--trust-blue))]">
          <FileText className="w-5 h-5" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-medium">{name}</h3>
            {optional && <span className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground">Optional</span>}
          </div>
          <StatusPill status={status} />
        </div>
      </div>

      {status === "verified" && extracted && (
        <div className="rounded-xl bg-[hsl(var(--trust-green-soft))] p-3 text-sm space-y-1">
          <div className="flex items-center gap-2 text-[hsl(var(--trust-green))] font-medium">
            <CheckCircle2 className="w-4 h-4" /> Document detected
          </div>
          {extracted.map((e) => (
            <div key={e.label} className="text-foreground/80"><span className="text-muted-foreground">{e.label}:</span> {e.value}</div>
          ))}
        </div>
      )}

      {status === "retake" && (
        <div className="rounded-xl bg-amber-50 text-amber-800 p-3 text-sm flex gap-2 items-start">
          <AlertTriangle className="w-4 h-4 mt-0.5" /> Image blurry. Please retake the photo.
        </div>
      )}

      <div className="flex gap-2">
        <Button onClick={simulate} className="flex-1 h-11 bg-[hsl(var(--trust-blue))] hover:bg-[hsl(var(--trust-blue))]/90">
          <Camera className="w-4 h-4 mr-1" /> Open Camera
        </Button>
        <Button onClick={simulate} variant="outline" className="flex-1 h-11">
          <Upload className="w-4 h-4 mr-1" /> Upload File
        </Button>
      </div>

      <ul className="text-xs text-muted-foreground space-y-0.5 pl-1">
        {tips.map((t) => <li key={t}>• {t}</li>)}
      </ul>
    </div>
  );
}

function StatusPill({ status }: { status: Status }) {
  const map: Record<Status, { label: string; cls: string; Icon: any }> = {
    none: { label: "Not uploaded", cls: "bg-muted text-muted-foreground", Icon: FileText },
    uploaded: { label: "Uploaded", cls: "bg-blue-50 text-blue-700", Icon: Upload },
    checking: { label: "AI checking...", cls: "bg-blue-50 text-blue-700", Icon: Loader2 },
    verified: { label: "Verified", cls: "bg-[hsl(var(--trust-green-soft))] text-[hsl(var(--trust-green))]", Icon: CheckCircle2 },
    retake: { label: "Needs retake", cls: "bg-amber-50 text-amber-800", Icon: AlertTriangle },
  };
  const { label, cls, Icon } = map[status];
  return (
    <span className={`inline-flex items-center gap-1 mt-1 text-xs px-2 py-0.5 rounded-full ${cls}`}>
      <Icon className={`w-3 h-3 ${status === "checking" ? "animate-spin" : ""}`} /> {label}
    </span>
  );
}
