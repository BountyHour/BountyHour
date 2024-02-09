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
import { api } from "@/trpc/react";
import { profileFormSchema } from "@/app/api/formschema/user";
import { Timezone, ProfilePrivacy } from "@prisma/client";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export function ProfileForm() {
  /** Fetch initial user data, and expose state for {@link isLoading} */
  const { data: initialUserData, isLoading: loadingInitialData } =
    api.user.getUser.useQuery(undefined, {
      refetchOnWindowFocus: false, // Don't refetch on tab change
    });
  useEffect(() => {
    initialUserData && form.reset(initialUserData);
  }, [initialUserData]);

  /** Error handling, including parsing {@link withFieldMappedErrors} */
  const [errorData, setErrorData] = useState<string | null>(null);
  useEffect(() => {
    if (errorData) {
      const [field, message] = errorData.split(":");
      form.setError(field as keyof ProfileFormValues, { message });
      toast.warning("Error updating " + field + ", see form for details");
    }
  }, [errorData]);

  /** Form initialisation boilerplate */
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: { name: "", username: "", about: "" },
    mode: "onChange",
  });

  /** Handling results of updating data via {@link onSubmit} */
  const updateProfile = api.user.updateProfile.useMutation({
    onSuccess: async (dataPromise) => {
      const data: ProfileFormValues = await dataPromise;
      form.reset(data); // Reset form to new data for accurate "dirtiness"
      toast.success("Profile saved!");
    },
    onError: (error: any) => {
      setErrorData(error.message);
    },
  });

  /** Only submit changed values */
  const onSubmit = async (data: ProfileFormValues) => {
    setErrorData(null);
    const dirties = form.formState.dirtyFields;
    const updatedFields = Object.keys(dirties).reduce((acc: any, key) => {
      acc[key] = data[key as keyof ProfileFormValues];
      return acc;
    }, {});

    if (updatedFields.length === 0) {
      return toast.info("No changes to save");
    }

    try {
      await updateProfile.mutateAsync(updatedFields);
    } catch (error: any) {
      /* Handled in `useMutation` */
    }
  };

  // Helpers for UI states
  const isLoading = loadingInitialData || updateProfile.isLoading;
  const isDirty = form.formState.isDirty;

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
                <Input placeholder="..." {...field} />
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
                <Input placeholder="..." {...field} />
              </FormControl>
              <FormDescription>
                This will also be your profile URL (6-12 characters).
              </FormDescription>
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
                <Textarea placeholder="..." {...field} />
              </FormControl>
              <FormDescription>
                A brief description of yourself (0-160 characters).
              </FormDescription>
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
                onValueChange={(value) => {
                  if (value != "") {
                    field.onChange(value);
                  }
                }}
                value={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="..." />
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
                onValueChange={(value) => {
                  if (value != "") {
                    field.onChange(value);
                  }
                }}
                value={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="..." />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.keys(ProfilePrivacy).map((timezone) => (
                    <SelectItem key={timezone} value={timezone}>
                      {timezone.charAt(0).toUpperCase() +
                        timezone.slice(1).toLowerCase()}
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
            disabled={isLoading || !isDirty}
            type="submit"
            className="min-w-36"
          >
            {isLoading ? (
              <Loader2 className="animate-spin" />
            ) : (
              "Update Profile"
            )}
          </Button>
          {!isDirty && !isLoading && (
            <FormDescription className="italic">
              No unsaved changes
            </FormDescription>
          )}
        </div>
      </form>
    </Form>
  );
}
