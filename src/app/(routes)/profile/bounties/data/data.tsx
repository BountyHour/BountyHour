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
    value: "DRAFT",
    label: "Draft",
    icon: HelpCircle,
  },
  {
    value: "OPEN",
    label: "Open",
    icon: Badge,
  },
  {
    value: "IN_PROGRESS",
    label: "In Progress",
    icon: Timer,
  },
  {
    value: "SUBMITTED",
    label: "Submitted",
    icon: BadgeCheck,
  },
  {
    value: "COMPLETED",
    label: "Completed",
    icon: BadgeCheck,
  },
  {
    value: "FAILED",
    label: "Failed",
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
