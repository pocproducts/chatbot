import { Clock, DollarSign, Activity, Hash, Tag, Cpu, Target } from "lucide-react";
import React from "react";

const DUMMY_SESSIONS = [
  {
    goal: "Analyze fiscal report",
    sessionId: "sess_x192837",
    profileId: "prof_48x",
    startedAt: "2026-07-06 10:14",
    duration: "45s",
    cost: "$0.01",
    lastTask: "Format output",
  },
  {
    goal: "Fetch remote entity data",
    sessionId: "sess_y827364",
    profileId: "prof_48x",
    startedAt: "2026-07-06 10:20",
    duration: "12s",
    cost: "$0.005",
    lastTask: "Authenticate",
  },
];

export default function AgentSessionsPage() {
  return (
    <div className="flex flex-1 flex-col h-full bg-background/50">
      <div className="flex items-center gap-4 border-b border-border/40 px-6 py-5">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
          <Activity className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h1 className="text-lg font-semibold tracking-tight text-foreground">Agent Sessions</h1>
          <p className="text-sm text-muted-foreground">Monitor your active and past agent executions.</p>
        </div>
      </div>

      <div className="flex-1 p-6">
        <div className="rounded-xl border border-border/50 bg-background/50 shadow-sm overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-muted/30 text-muted-foreground">
              <tr>
                <th className="px-4 py-3 font-medium"><div className="flex items-center gap-2"><Target className="size-4" /> Goal</div></th>
                <th className="px-4 py-3 font-medium"><div className="flex items-center gap-2"><Tag className="size-4" /> Session ID</div></th>
                <th className="px-4 py-3 font-medium"><div className="flex items-center gap-2"><Hash className="size-4" /> Profile ID</div></th>
                <th className="px-4 py-3 font-medium"><div className="flex items-center gap-2"><Clock className="size-4" /> Started At</div></th>
                <th className="px-4 py-3 font-medium"><div className="flex items-center gap-2"><Activity className="size-4" /> Duration</div></th>
                <th className="px-4 py-3 font-medium"><div className="flex items-center gap-2"><DollarSign className="size-4" /> Cost</div></th>
                <th className="px-4 py-3 font-medium"><div className="flex items-center gap-2"><Cpu className="size-4" /> Last Task</div></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              {DUMMY_SESSIONS.map((s, i) => (
                <tr key={i} className="hover:bg-muted/20 transition-colors">
                  <td className="px-4 py-3 text-foreground font-medium">{s.goal}</td>
                  <td className="px-4 py-3 font-mono text-xs">{s.sessionId}</td>
                  <td className="px-4 py-3 font-mono text-xs">{s.profileId}</td>
                  <td className="px-4 py-3 text-muted-foreground">{s.startedAt}</td>
                  <td className="px-4 py-3 text-muted-foreground">{s.duration}</td>
                  <td className="px-4 py-3 text-emerald-500 font-medium">{s.cost}</td>
                  <td className="px-4 py-3 text-muted-foreground">{s.lastTask}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {DUMMY_SESSIONS.length === 0 && (
            <div className="p-8 text-center text-muted-foreground">No agent sessions found.</div>
          )}
        </div>
      </div>
    </div>
  );
}
