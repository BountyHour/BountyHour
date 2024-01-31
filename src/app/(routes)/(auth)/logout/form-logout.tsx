"use client";

import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { signOut } from "next-auth/react";

export function FormLogout() {
  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Log out</CardTitle>
      </CardHeader>
      <CardFooter>
        <Button
          onClick={() => signOut({ callbackUrl: "/?loggedout" })}
          className="w-full"
        >
          Log out
        </Button>
      </CardFooter>
    </Card>
  );
}
