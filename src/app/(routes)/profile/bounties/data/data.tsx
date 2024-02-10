import {
  ChevronDown,
  ChevronRight,
  ChevronUp,
  BadgeCheck,
  Badge,
  XCircle,
  HelpCircle,
  Timer,
} from "lucide-react";

export const labels = [
  {
    value: "H",
    label: "H", // Hunter
  },
  {
    value: "P",
    label: "P", // Poster
  },
];

export const statuses = [
  {
    value: "backlog",
    label: "Backlog",
    icon: HelpCircle,
  },
  {
    value: "todo",
    label: "Todo",
    icon: Badge,
  },
  {
    value: "in progress",
    label: "In Progress",
    icon: Timer,
  },
  {
    value: "done",
    label: "Done",
    icon: BadgeCheck,
  },
  {
    value: "canceled",
    label: "Canceled",
    icon: XCircle,
  },
];

export const priorities = [
  {
    label: "Low",
    value: "low",
    icon: ChevronDown,
  },
  {
    label: "Medium",
    value: "medium",
    icon: ChevronRight,
  },
  {
    label: "High",
    value: "high",
    icon: ChevronUp,
  },
];
