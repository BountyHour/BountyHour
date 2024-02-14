"use client";

import { getColumns } from "./components/columns";
import { api } from "@/trpc/react";
import { DataTable } from "@/components/ui/data-table/data-table";
import { Session } from "next-auth";
import { ReactElement } from "react";

export function BountiesTable({
  userId,
}: {
  userId: string | null;
}): ReactElement {
  // Call the useQuery hook directly in the component body
  const { data, error } = api.bounty.getCreatedOrAssignedBounties.useQuery();

  if (error || userId === null) {
    console.error(error);
  }

  // data will be undefined until the query completes, so provide a fallback
  const bounties = data || [];
  return <DataTable columns={getColumns({ userId })} data={bounties} />;
}
