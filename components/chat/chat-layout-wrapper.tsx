"use client";

import { usePathname } from "next/navigation";
import { Suspense } from "react";
import { ActiveChatProvider } from "@/hooks/use-active-chat";
import { ChatShell } from "@/components/chat/shell";

export function ChatLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isChatRoute = pathname === "/" || pathname.startsWith("/chat/");

  if (!isChatRoute) {
    return <>{children}</>;
  }

  return (
    <>
      <Suspense fallback={<div className="flex h-dvh" />}>
        <ActiveChatProvider>
          <ChatShell />
        </ActiveChatProvider>
      </Suspense>
      {children}
    </>
  );
}
