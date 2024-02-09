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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { api } from "@/trpc/react";
import { profileFormSchema } from "@/app/api/formschema/user";
import { Timezone, ProfilePrivacy } from "@prisma/client";
import { useEffect, useState } from "react";
import { Loader2, ShieldCheck, ShieldEllipsis, ShieldOff } from "lucide-react";

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
              <FormLabel className="flex items-center space-x-2">
                <span>Display name</span>
                {getPrivacyIcon(ProfilePrivacy.PUBLIC)}
              </FormLabel>
              <FormControl>
                <Input placeholder="..." {...field} />
              </FormControl>
              <FormDescription>
                Your display name can be your real name or a pseudonym (2-25
                characters).
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
              <FormLabel className="flex items-center space-x-2">
                <span>Username</span>
                {getPrivacyIcon(ProfilePrivacy.PUBLIC)}
              </FormLabel>
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
              <FormLabel className="flex items-center space-x-2">
                <span>About</span>
                {getPrivacyIcon(form.getValues("privacy"))}
              </FormLabel>
              <FormControl>
                <Textarea placeholder="..." {...field} />
              </FormControl>
              <FormDescription>
                A brief description of yourself (0-160 characters, optional).
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
              <FormLabel className="flex items-center space-x-2">
                <span>Timezone</span>{" "}
                {getPrivacyIcon(form.getValues("privacy"))}
              </FormLabel>
              <Select
                disabled={isLoading}
                onValueChange={(value) => {
                  if (value) {
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
              <FormDescription>
                Your timezone will be displayed on your profile, and influence
                which searches you appear in.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="privacy"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Profile privacy</FormLabel>
              <Select
                disabled={isLoading}
                onValueChange={(value) => {
                  if (value) {
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
                  <SelectItem key="PUBLIC" value="PUBLIC">
                    Public
                  </SelectItem>
                  <SelectItem key="PROTECTED" value="PROTECTED">
                    Protected (default)
                  </SelectItem>
                  <SelectItem key="PRIVATE" value="PRIVATE">
                    Private
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                Choose who can see your profile information. Display name and
                Username are always public.
                <br />
                <br />- <b>Public</b>: Visible to all users.
                <br />- <b>Protected (default)</b>: Visible to potential bounty
                hunters / posters, e.g. in a search.
                <br />- <b>Private</b>: Only visible to users you are current
                engaged in a bounty or conversation with.
              </FormDescription>
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

function getPrivacyIcon(type: ProfilePrivacy) {
  switch (type) {
    case ProfilePrivacy.PUBLIC:
      return (
        <Popover>
          <PopoverTrigger>
            <ShieldCheck className="h-4 w-4" />
          </PopoverTrigger>
          <PopoverContent>
            <p>
              <b>Public</b>: Visible to all users.
            </p>
          </PopoverContent>
        </Popover>
      );
    case ProfilePrivacy.PROTECTED:
      return (
        <Popover>
          <PopoverTrigger>
            <ShieldEllipsis className="h-4 w-4" />
          </PopoverTrigger>
          <PopoverContent>
            <p>
              <b>Protected</b>: Visible to potential bounty hunters / posters,
              e.g. in a search.
            </p>
          </PopoverContent>
        </Popover>
      );
    case ProfilePrivacy.PRIVATE:
      return (
        <Popover>
          <PopoverTrigger>
            <ShieldOff className="h-4 w-4" />
          </PopoverTrigger>
          <PopoverContent>
            <p>
              <b>Private</b>: Only visible to users you are current engaged in a
              bounty or conversation with.
            </p>
          </PopoverContent>
        </Popover>
      );
  }
}
