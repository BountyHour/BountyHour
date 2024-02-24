"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Badge } from "@/components/ui/badge";

import { labels, statuses } from "./mappings";
import { DataTableColumnHeader } from "@/components/ui/data-table/data-table-column-header";
import Link from "next/link";
import TimeAgo from "react-timeago";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Bounty } from "@prisma/client";

export const getColumns = ({
  userId,
}: {
  userId: string;
}): ColumnDef<Bounty>[] => [
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = statuses.find(
        (status) => status.value === row.getValue("status"),
      );

      if (!status) {
        return null;
      }

      return (
        <div className="flex w-[100px] items-center">
          {status.icon && (
            <status.icon className="mr-2 h-4 w-4 text-muted-foreground" />
          )}
          <span>{status.label}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Bounty" />
    ),
    cell: ({ row }) => {
      const labelLetter = row.original.createdById === userId ? "P" : "H";
      const label = labels.find((label) => label.value === labelLetter);

      return (
        <div className="flex space-x-2">
          {label && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Badge variant="outline">{label.label}</Badge>
                </TooltipTrigger>
                <TooltipContent>{label.tooltip}</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
          <span className="truncate font-medium">
            <Link href={`/bounty/${row.original.id}`}>
              {row.getValue("title")}
            </Link>
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "updatedAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Updated" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <TimeAgo
                  date={(row.getValue("updatedAt") as Date).toISOString()}
                  title=""
                />
              </TooltipTrigger>
              <TooltipContent>
                {new Intl.DateTimeFormat("en-GB", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                }).format(new Date(row.getValue("updatedAt")))}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return (
        new Date(row.getValue("updatedAt")).getTime() >
        new Date().getTime() - value * 1000
      );
    },
  },
];
