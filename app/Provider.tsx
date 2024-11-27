"use client";

import { LiveblocksProvider ,ClientSideSuspense } from "@liveblocks/react/suspense"
import { ReactNode } from "react";

const Provider = ({children}:{children:ReactNode}) => {
  return (
    <div>
      <LiveblocksProvider authEndpoint="/api/liveblocks-auth">
      <ClientSideSuspense fallback={<div>Loading....</div>}>
        {children}
      </ClientSideSuspense>
    </LiveblocksProvider>
    </div>
  )
}

export default Provider
