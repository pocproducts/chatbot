import { Clock, Globe, Code, Wifi, MapPin, Hash, Bot, DollarSign, Activity } from "lucide-react";
import React from "react";

const DUMMY_BROWSERS = [
  {
    browser: "Chromium 124",
    cdpUrl: "ws://127.0.0.1:9222/devtools/browser/xyz",
    live: true,
    profileId: "prof_48x",
    agent: "sess_x192837",
    region: "us-east-1",
    startedAt: "2026-07-06 10:14",
    duration: "45s",
    cost: "$0.02",
  },
  {
    browser: "Firefox 120",
    cdpUrl: "ws://127.0.0.1:9222/devtools/browser/abc",
    live: false,
    profileId: "prof_48x",
    agent: "sess_y827364",
    region: "eu-west-1",
    startedAt: "2026-07-06 10:20",
    duration: "12s",
    cost: "$0.01",
  }
];

export default function RemoteBrowserPage() {
  return (
    <div className="flex flex-1 flex-col h-full bg-background/50">
      <div className="flex items-center gap-4 border-b border-border/40 px-6 py-5">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
          <Globe className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h1 className="text-lg font-semibold tracking-tight text-foreground">Remote Browser Sessions</h1>
          <p className="text-sm text-muted-foreground">Manage and observe cloud browser instances.</p>
        </div>
      </div>

      <div className="flex-1 p-6">
        <div className="rounded-xl border border-border/50 bg-background/50 shadow-sm overflow-hidden">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-muted/30 text-muted-foreground">
              <tr>
                <th className="px-4 py-3 font-medium"><div className="flex items-center gap-2"><Globe className="size-4" /> Browser</div></th>
                <th className="px-4 py-3 font-medium"><div className="flex items-center gap-2"><Code className="size-4" /> CDP URL</div></th>
                <th className="px-4 py-3 font-medium"><div className="flex items-center gap-2"><Wifi className="size-4" /> Live</div></th>
                <th className="px-4 py-3 font-medium"><div className="flex items-center gap-2"><Hash className="size-4" /> Profile ID</div></th>
                <th className="px-4 py-3 font-medium"><div className="flex items-center gap-2"><Bot className="size-4" /> Agent</div></th>
                <th className="px-4 py-3 font-medium"><div className="flex items-center gap-2"><MapPin className="size-4" /> Region</div></th>
                <th className="px-4 py-3 font-medium"><div className="flex items-center gap-2"><Clock className="size-4" /> Started At</div></th>
                <th className="px-4 py-3 font-medium"><div className="flex items-center gap-2"><Activity className="size-4" /> Duration</div></th>
                <th className="px-4 py-3 font-medium"><div className="flex items-center gap-2"><DollarSign className="size-4" /> Cost</div></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              {DUMMY_BROWSERS.map((b, i) => (
                <tr key={i} className="hover:bg-muted/20 transition-colors">
                  <td className="px-4 py-3 text-foreground font-medium">{b.browser}</td>
                  <td className="px-4 py-3 font-mono text-[11px] truncate max-w-[150px]" title={b.cdpUrl}>{b.cdpUrl}</td>
                  <td className="px-4 py-3">
                    {b.live ? (
                      <span className="flex w-fit items-center gap-1.5 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[11px] font-semibold tracking-wide text-emerald-600">
                        <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        LIVE
                      </span>
                    ) : (
                      <span className="flex w-fit items-center gap-1.5 rounded-full bg-muted px-2 py-0.5 text-[11px] font-semibold tracking-wide text-muted-foreground">
                        <span className="size-1.5 rounded-full bg-muted-foreground" />
                        OFFLINE
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 font-mono text-xs">{b.profileId}</td>
                  <td className="px-4 py-3 font-mono text-xs">{b.agent}</td>
                  <td className="px-4 py-3 text-muted-foreground">{b.region}</td>
                  <td className="px-4 py-3 text-muted-foreground">{b.startedAt}</td>
                  <td className="px-4 py-3 text-muted-foreground">{b.duration}</td>
                  <td className="px-4 py-3 text-emerald-500 font-medium">{b.cost}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {DUMMY_BROWSERS.length === 0 && (
            <div className="p-8 text-center text-muted-foreground">No remote browser instances active.</div>
          )}
        </div>
      </div>
    </div>
  );
}
