import { BarChart } from "lucide-react";
import React from "react";

export default function AnalyticsOverviewPage() {
  return (
    <div className="flex flex-1 flex-col h-full bg-background/50">
      <div className="flex items-center gap-4 border-b border-border/40 px-6 py-5">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
          <BarChart className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h1 className="text-lg font-semibold tracking-tight text-foreground">Overview</h1>
          <p className="text-sm text-muted-foreground">General analytics and execution metrics.</p>
        </div>
      </div>
      <div className="flex-1 p-6">
        <div className="text-muted-foreground text-sm">Overview charts and metrics will go here.</div>
      </div>
    </div>
  );
}
