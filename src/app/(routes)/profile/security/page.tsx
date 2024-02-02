import { Separator } from "@/components/ui/separator";
import { SecurityForm } from "@/app/(routes)/profile/security/security-form";

export default function SettingsSecurityPage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Security</h3>
        <p className="text-sm text-muted-foreground">
          Turn items on or off to control what is displayed in the app.
        </p>
      </div>
      <Separator />
      <SecurityForm />
    </div>
  );
}
