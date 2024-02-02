import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile for...",
  description: "Your account",
};

export default async function SpecifiedProfilePage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <>
      <div className="container relative grid items-center justify-center lg:max-w-none lg:px-0">
        <div className="relative mx-auto flex min-h-screen flex-col justify-center">
          Profile for user {params.id}
        </div>
      </div>
    </>
  );
}
