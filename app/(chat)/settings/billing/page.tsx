import { CreditCard } from "lucide-react";
import React from "react";

export default function BillingSettingsPage() {
  return (
    <div className="flex flex-1 flex-col h-full bg-background/50">
      <div className="flex items-center gap-4 border-b border-border/40 px-6 py-5">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
          <CreditCard className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h1 className="text-lg font-semibold tracking-tight text-foreground">Billing</h1>
          <p className="text-sm text-muted-foreground">Manage your subscription and payment methods.</p>
        </div>
      </div>
      <div className="flex-1 p-6">
        <div className="text-muted-foreground text-sm">Billing configuration will go here.</div>
      </div>
    </div>
  );
}
