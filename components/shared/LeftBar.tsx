"use client";
import { sidebarLinks } from "@/constants";
import { SignedIn, useAuth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { useClerk } from "@clerk/clerk-react";
import { useRouter } from "next/navigation";
export default function LeftBar() {
  const data = usePathname();
  const { signOut } = useClerk();
  const router = useRouter();
  const { userId } = useAuth();
  return (
    <div className="bg-stone-900 hidden md:block">
      <ul className="p-4 space-y-6 mt-12">
        {sidebarLinks.map((ele, i) => {
          if (ele.route === "/profilo") ele.route = `${ele.route}/${userId}`;
          return (
            <Link
              href={ele.route}
              key={i}
              className={`flex items-center gap-4 p-3 ${
                data == ele.route ? "bg-purple-500 rounded-2xl " : ""
              }`}
            >
              <Image src={ele.imgURL} width={25} height={25} alt={ele.label} />
              {ele.label}
            </Link>
          );
        })}
      </ul>

      <div
        className="cursor-pointer flex gap-2 p-4 mt-20"
        onClick={() => signOut(() => router.push("/sign-in"))}
      >
        <Image src={"/assets/logout.svg"} width={30} height={30} alt="logout" />
        logout
      </div>
    </div>
  );
}
