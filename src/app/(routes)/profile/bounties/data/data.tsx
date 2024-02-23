import { BadgeCheck, Badge, XCircle, HelpCircle, Timer } from "lucide-react";

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

export const dateRanges = [
  {
    label: "Today",
    value: "today",
    icon: Timer,
  },
  {
    label: "Yesterday",
    value: "yesterday",
    icon: Timer,
  },
  {
    label: "Last 7 days",
    value: "last7days",
    icon: Timer,
  },
  {
    label: "Last 30 days",
    value: "last30days",
    icon: Timer,
  },
  {
    label: "Last 90 days",
    value: "last90days",
    icon: Timer,
  },
  {
    label: "Last 365 days",
    value: "last365days",
    icon: Timer,
  },
];
