import { BadgeCheck, Badge, XCircle, HelpCircle, Timer } from "lucide-react";

export const labels = [
  {
    value: "H",
    label: "H",
    tooltip: "Hunter",
  },
  {
    value: "P",
    label: "P",
    tooltip: "Poster",
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
    value: (60 * 60 * 24).toString(),
    icon: Timer,
  },
  {
    label: "This week",
    value: (60 * 60 * 24 * 7).toString(),
    icon: Timer,
  },
  {
    label: "This month",
    value: (60 * 60 * 24 * 31).toString(),
    icon: Timer,
  },
  {
    label: "This quarter",
    value: (60 * 60 * 24 * 93).toString(),
    icon: Timer,
  },
  {
    label: "This year",
    value: (60 * 60 * 24 * 365).toString(),
    icon: Timer,
  },
];
