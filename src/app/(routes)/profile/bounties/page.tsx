import { Separator } from "@/components/ui/separator";
import { BountiesTable } from "./bounties-table";

export default async function SettingsBountiesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Bounties</h3>
        <p className="text-sm text-muted-foreground">
          Manage your current raised & assigned bounties.
        </p>
      </div>
      <Separator />
      <BountiesTable />
    </div>
  );
}
