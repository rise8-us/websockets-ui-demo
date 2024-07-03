import { NextRequest, NextResponse } from "next/server";
import type { MessageRequest } from "@/src/types";

export async function POST(req: NextRequest) {
    const body: MessageRequest = await req.json()
    
    fetch('http://localhost:8080/automation', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body),
    })

    return new NextResponse()
}