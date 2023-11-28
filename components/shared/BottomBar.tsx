"use client";
import { sidebarLinks } from "@/constants";
import { SignedIn, useAuth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { useClerk } from "@clerk/clerk-react";
import { useRouter } from "next/navigation";
export default function BottomBar() {
  const data = usePathname();
  const { signOut } = useClerk();
  const router = useRouter();
  const { userId } = useAuth();
  return (
    <div className="bg-stone-900 md:hidden block py-2">
      <ul className="  flex justify-center w-full">
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
            </Link>
          );
        })}
      </ul>
    </div>
  );
}
