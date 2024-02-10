import { Separator } from "@/components/ui/separator";
import { promises as fs } from "fs";
import path from "path";
import { z } from "zod";
import { columns } from "./components/columns";
import { taskSchema } from "./data/schema";
import { DataTable } from "./components/data-table";

// Simulate a database read for tasks.
async function getTasks() {
  const data = await fs.readFile(
    path.join(process.cwd(), "app/examples/tasks/data/tasks.json"),
  );

  const tasks = JSON.parse(data.toString());

  return z.array(taskSchema).parse(tasks);
}

export default async function SettingsBountiesPage() {
  const tasks = await getTasks();
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Bounties</h3>
        <p className="text-sm text-muted-foreground">
          Manage your current raised & assigned bounties.
        </p>
      </div>
      <Separator />
      <DataTable data={tasks} columns={columns} />
    </div>
  );
}
