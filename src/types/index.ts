export type MessageRequest = {
    topic: string
}

export type ProgessMessage = {
    status: "STARTED" | "IN_PROGRESS" | "COMPLETED" | "ERRORED"
    message: string
    currentTask: number
    totalTasks: number
}


export type Nullish<T> = T | null