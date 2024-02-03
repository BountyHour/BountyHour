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
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { api } from "@/trpc/react";
import { profileFormSchema } from "@/app/api/formschema/user";
import { Timezone, ProfilePrivacy } from "@prisma/client";

type ProfileFormValues = z.infer<typeof profileFormSchema>;

// Todo: Fetch from DB
const defaultValues: Partial<ProfileFormValues> = {
  displayName: "Display name",
  username: "Username",
  about: "About me",
  timezone: Timezone.GMT,
  privacy: ProfilePrivacy.PRIVATE,
};

export function ProfileForm() {
  const router = useRouter();
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  });

  const updateProfile = api.user.updateProfile.useMutation({
    onSuccess: () => {
      router.refresh();
    },
  });

  function onSubmit(data: ProfileFormValues) {
    updateProfile.mutate({ ...data });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="displayName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Display name</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
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
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>Username.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="about"
          render={({ field }) => (
            <FormItem>
              <FormLabel>About</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
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
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a verified email to display" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="America/New_York">
                    America/New_York
                  </SelectItem>
                  <SelectItem value="America/Chicago">
                    America/Chicago
                  </SelectItem>
                  <SelectItem value="America/Denver">America/Denver</SelectItem>
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
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Pick a privacy setting" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="private">
                    Private (only visible to current bounty's users)
                  </SelectItem>
                  <SelectItem value="protected">
                    Protected (only visible to potential bounty's users)
                  </SelectItem>
                  <SelectItem value="public">
                    Public (visible to everyone)
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>Pick a privacy setting.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Update profile</Button>
      </form>
    </Form>
  );
}
