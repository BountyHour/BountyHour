"use client";

import { columns } from "./components/columns";
import { api } from "@/trpc/react";
import { DataTable } from "@/components/ui/data-table/data-table";
import { useState, useEffect } from "react";

export function BountiesTable() {
  // Call the useQuery hook directly in the component body
  const { data, error } = api.bounty.getCreatedOrAssignedBounties.useQuery();

  if (error) {
    console.error(error);
  }

  // data will be undefined until the query completes, so provide a fallback
  const bounties = data || [];

  return <DataTable columns={columns} data={bounties} />;
}
