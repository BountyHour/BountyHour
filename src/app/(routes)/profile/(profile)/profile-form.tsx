"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { api } from "@/trpc/react";
import { profileFormSchema } from "@/app/api/formschema/user";
import { Timezone, ProfilePrivacy } from "@prisma/client";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

type ProfileFormValues = z.infer<typeof profileFormSchema>;

const defaultValues: Partial<ProfileFormValues> = {
  name: "",
  username: "",
  about: "",
  timezone: Timezone.GMT,
  privacy: ProfilePrivacy.PRIVATE,
};

export function ProfileForm() {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  });

  // Profile is fetched from the server, and we only update it on initial load
  const [profile, setProfile] = useState<ProfileFormValues | null>(null);
  const { data: fetchedProfile, isLoading: isProfileLoading } =
    api.user.getUser.useQuery();

  // If the profile is fetched, and we don't have a local copy, set it
  useEffect(() => {
    if (fetchedProfile && !profile) {
      setProfile(fetchedProfile);
      form.reset(fetchedProfile);
    }
  }, [fetchedProfile, profile]);

  const updateProfile = api.user.updateProfile.useMutation({
    onSuccess: () => {
      toast.success("Profile saved!");
    },
    onError: (error: any) => {
      const [field, message] = error.message.split(":");
      form.setError(field as keyof ProfileFormValues, { message });
      toast.warning("Error updating " + field + ", see form for details");
    },
  });

  // Only submit changed fields, and display errors
  const onSubmit = async (data: ProfileFormValues) => {
    const dirties = form.formState.dirtyFields;
    const updatedFields = Object.keys(dirties).reduce((acc: any, key) => {
      acc[key] = data[key as keyof ProfileFormValues];
      return acc;
    }, {});

    if (updatedFields.length === 0) {
      return toast.warning("No changes to save");
    }
    try {
      await updateProfile.mutateAsync(updatedFields);
    } catch (error: any) {
      /* Handled in `useMutation` */
    }
  };

  // Helpers for UI states
  const isLoading = updateProfile.isLoading || isProfileLoading;
  const isDirty = Object.keys(form.formState.dirtyFields).length > 0;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          disabled={isLoading}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Display name</FormLabel>
              <FormControl>
                <Input placeholder="Display name" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name. It can be your real name or a
                pseudonym. You can only change this once every 30 days.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          disabled={isLoading}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Username" {...field} />
              </FormControl>
              <FormDescription>Username.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="about"
          disabled={isLoading}
          render={({ field }) => (
            <FormItem>
              <FormLabel>About</FormLabel>
              <FormControl>
                <Textarea placeholder="About" {...field} />
              </FormControl>
              <FormDescription>About.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="timezone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Timezone</FormLabel>
              <Select
                disabled={isLoading}
                onValueChange={field.onChange}
                value={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.keys(Timezone).map((timezone) => (
                    <SelectItem key={timezone} value={timezone}>
                      {timezone}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>Pick a timezone.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="privacy"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Privacy mode</FormLabel>
              <Select
                disabled={isLoading}
                onValueChange={field.onChange}
                value={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.keys(ProfilePrivacy).map((privacy) => (
                    <SelectItem key={privacy} value={privacy}>
                      {privacy}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>Pick a privacy setting.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-center space-x-2">
          <Button
            disabled={isLoading && !isDirty}
            type="submit"
            className="min-w-36"
          >
            {isLoading ? (
              <Loader2 className="animate-spin" />
            ) : (
              "Update Profile"
            )}
          </Button>
          {!isDirty && <FormDescription>No unsaved changes</FormDescription>}
        </div>
      </form>
    </Form>
  );
}
