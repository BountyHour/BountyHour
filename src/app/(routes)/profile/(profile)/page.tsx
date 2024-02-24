import { Separator } from "@/components/ui/separator";
import { ProfileForm } from "@/app/(routes)/profile/(profile)/profile-form";
import { redirect } from "next/navigation";
import { authCheck } from "@/lib/authChecks";

export default async function SettingsProfilePage() {
  const redirectUrl = await authCheck(true);
  if (redirectUrl) {
    return redirect(redirectUrl);
  }
  return (
    <div className="space-y-6 lg:max-w-2xl">
      <div>
        <h3 className="text-lg font-medium">Profile</h3>
        <p className="text-sm text-muted-foreground">
          Change the appearance of your profile to others.
        </p>
      </div>
      <Separator />
      <ProfileForm />
    </div>
  );
}
