"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
interface Props {
  name: string;
  username: string;
  img: string;
  id: string;
}

export default function UserCard({ name, username, img, id }: Props) {
  const router = useRouter();
  return (
    <div className="flex justify-between items-center">
      <div className="flex gap-4">
        <div className="h-14 w-14 relative">
          <Image src={img} fill alt="logo" className="rounded-full" />
        </div>
        <div>
          <p>{name}</p>
          <p className="text-neutral-700">@{username}</p>
        </div>
      </div>
      <button
        className="bg-purple-500 hover:cursor-pointer rounded-2xl py-2 px-6"
        onClick={() => router.push(`profilo/${id}`)}
      >
        view
      </button>
    </div>
  );
}
