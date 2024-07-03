import { useCallback, useState } from "react";
import clsx from "classnames";
import { getStatus } from "./helpers";
import { type IMessage, useSubscription } from "react-stomp-hooks";
import type { Nullish, ProgessMessage } from "@/src/types";

export function WebSocketStatus({ topic }: Readonly<{ topic: string }>) {

    const [message, setMessage] = useState<Nullish<ProgessMessage>>();

    const handleMessage = useCallback((message: IMessage) => {
        setMessage(JSON.parse(message.body))
    }, [setMessage])

    useSubscription(topic, handleMessage);

    if (!message) return null

    const percentage = (message?.currentTask / message?.totalTasks) * 100

    return (
        <span className="w-full h-10 flex justify-between px-2 rounded-xl bg-neutral-400 text-black items-center overflow-hidden scroll-none relative">
            <div
                className={
                    clsx({
                        [getStatus(message.status)]: true,
                    }, "absolute top-0 left-0 h-10 flex items-center justify-between px-2 rounded-xl opacity-50")}
                style={{ width: `${percentage}%` }}
            />
            <p className="z-10">{message.message}</p>
            <p className="z-10">{percentage}%</p>
        </span>
    )
}