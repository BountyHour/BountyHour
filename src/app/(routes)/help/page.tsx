import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Help",
  description: "Frequently asked questions",
};

export default async function HelpPage() {
  return (
    <>
      <div className="container relative grid items-center justify-center lg:max-w-none lg:px-0">
        <div className="relative mx-auto flex min-h-screen flex-col justify-center">
          Uh oh, nothing here!
        </div>
      </div>
    </>
  );
}
