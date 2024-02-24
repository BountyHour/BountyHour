import {
  XCircle,
  Calendar,
  CalendarDays,
  CalendarRange,
  CalendarFold,
  CalendarClock,
  CircleDashed,
  Circle,
  CircleDot,
  CircleEllipsis,
  CheckCircle2,
  TerminalSquare,
  HandCoins,
} from "lucide-react";

export const labels = [
  {
    value: "H",
    label: "Hunter",
    icon: TerminalSquare,
  },
  {
    value: "P",
    label: "Poster",
    icon: HandCoins,
  },
];

export const statuses = [
  {
    value: "DRAFT",
    label: "Draft",
    icon: CircleDashed,
  },
  {
    value: "OPEN",
    label: "Open",
    icon: Circle,
  },
  {
    value: "IN_PROGRESS",
    label: "In Progress",
    icon: CircleDot,
  },
  {
    value: "SUBMITTED",
    label: "Submitted",
    icon: CircleEllipsis,
  },
  {
    value: "COMPLETED",
    label: "Completed",
    icon: CheckCircle2,
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
    icon: CalendarClock,
  },
  {
    label: "This week",
    value: (60 * 60 * 24 * 7).toString(),
    icon: CalendarRange,
  },
  {
    label: "This month",
    value: (60 * 60 * 24 * 31).toString(),
    icon: CalendarDays,
  },
  {
    label: "This quarter",
    value: (60 * 60 * 24 * 93).toString(),
    icon: Calendar,
  },
  {
    label: "This year",
    value: (60 * 60 * 24 * 365).toString(),
    icon: CalendarFold,
  },
];
