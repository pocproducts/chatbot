import { Briefcase } from "lucide-react";

export default function WorkspacesSettingsPage() {
  return (
    <div className="flex flex-1 flex-col h-full bg-background/50">
      <div className="flex flex-col items-center justify-center border-b border-border/40 px-6 py-8 text-center">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 mb-3">
          <Briefcase className="h-5 w-5 text-primary" />
        </div>
        <h1 className="text-lg font-semibold tracking-tight text-foreground">
          Workspaces
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Manage your team and project workspaces.
        </p>
      </div>
      <div className="flex-1 p-6">
        <div className="text-muted-foreground text-sm">
          Workspaces configuration will go here.
        </div>
      </div>
    </div>
  );
}
