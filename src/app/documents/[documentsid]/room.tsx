"use client";

import { ReactNode } from "react";
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";

export function Room({ children, id }: { children: ReactNode; id: string }) {
  return (
    <LiveblocksProvider
      publicApiKey={
        "pk_dev_5wU8IrqWnmjavG6CltWcWBBIwxCfgD8gBbra1EZWtcjPVOnhmBIHmlV9bw3_fSl-"
      }
    >
      <RoomProvider id={id}>
        <ClientSideSuspense fallback={<div>Loading…</div>}>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}
