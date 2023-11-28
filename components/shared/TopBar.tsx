import { OrganizationSwitcher, SignedIn, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function TopBar() {
  return (
    <nav className="bg-stone-900 flex py-2 px-8 justify-between items-center">
      <Link href={"/"} className="flex items-center gap-2">
        <Image src={"/logo.svg"} width={28} height={28} alt="logo" />
        <p className="text-3xl font-bold">Threads</p>
      </Link>
      <UserButton />

      <div>
        <OrganizationSwitcher
          appearance={{
            // baseTheme: dark,
            elements: {
              organizationSwitcherTrigger: "py-2 px-4",
            },
          }}
        />
      </div>
    </nav>
  );
}
