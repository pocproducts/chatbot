import { Briefcase } from "lucide-react";
import React from "react";

export default function WorkspacesSettingsPage() {
  return (
    <div className="flex flex-1 flex-col h-full bg-background/50">
      <div className="flex items-center gap-4 border-b border-border/40 px-6 py-5">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
          <Briefcase className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h1 className="text-lg font-semibold tracking-tight text-foreground">Workspaces</h1>
          <p className="text-sm text-muted-foreground">Manage your team and project workspaces.</p>
        </div>
      </div>
      <div className="flex-1 p-6">
        <div className="text-muted-foreground text-sm">Workspaces configuration will go here.</div>
      </div>
    </div>
  );
}
