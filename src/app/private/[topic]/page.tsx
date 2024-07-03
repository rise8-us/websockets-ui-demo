'use client'

import { WebSocketStatus } from "@/src/components/websocket-status";
import { usePathname } from "next/navigation";
import { StompSessionProvider } from "react-stomp-hooks";

const startAutomation = (topic: string) => () => {
  fetch('/api/websocket/automation', {
    method: 'POST',
    body: JSON.stringify({ topic })
  })
}

export default function TopicPage() {
  const pathName = usePathname()

  return (
    <div className="flex flex-col gap-3 w-full items-center">
        <p className="text-xl mb-4">
          Welcome to the private topic
          {' '}<code className="bg-neutral-800 px-4 py-2 rounded-lg mx-2">{pathName}</code>
          {' '}page
          </p>
        <button className="text-lg px-8 py-4 border rounded bg-slate-900 hover:bg-slate-800 w-full max-w-96" onClick={startAutomation(pathName)}>
          Begin Automation
        </button>
        <StompSessionProvider url={'http://localhost:8080/ws-endpoint'}>
          <WebSocketStatus topic={pathName}/>
        </StompSessionProvider>
    </div>
  )
}