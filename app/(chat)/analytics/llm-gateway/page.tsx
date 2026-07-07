import { Server } from "lucide-react";

export default function LLMGatewayPage() {
  return (
    <div className="flex flex-1 flex-col h-full bg-background/50">
      <div className="flex items-center gap-4 border-b border-border/40 px-6 py-5">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
          <Server className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h1 className="text-lg font-semibold tracking-tight text-foreground">
            LLM Gateway
          </h1>
          <p className="text-sm text-muted-foreground">
            Manage and observe your AI model connections.
          </p>
        </div>
      </div>
      <div className="flex-1 p-6">
        <div className="text-muted-foreground text-sm">
          LLM Gateway configuration and usage routing will go here.
        </div>
      </div>
    </div>
  );
}
