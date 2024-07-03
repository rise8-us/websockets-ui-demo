import { ProgessMessage } from "@/src/types";

const statusMap: Record<ProgessMessage["status"], string> = {
  STARTED: "bg-sky-400",
  IN_PROGRESS: "bg-yellow-400",
  COMPLETED: "bg-green-400",
  ERRORED: "bg-red-400",
};

export const getStatus = (status: ProgessMessage["status"]) => statusMap[status] ?? "bg-neutral-400";
