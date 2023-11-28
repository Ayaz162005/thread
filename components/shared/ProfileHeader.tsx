import Image from "next/image";
import React from "react";
interface Params {
  accountId: string;
  authUserId: string;
  name: string;
  username: string;
  imgUrl: string;
  bio: string;
}
export default function ProfileHeader({
  accountId,
  authUserId,
  name,
  username,
  imgUrl,
  bio,
}: Params) {
  return (
    <div>
      <div className="flex gap-4">
        <div>
          <Image
            src={imgUrl}
            width={70}
            height={70}
            alt="logo"
            className="rounded-full"
          />
        </div>
        <div>
          <p className="text-3xl font-bold">{name}</p>
          <p className="text-zinc-700">@{username}</p>
        </div>
      </div>
      <p className="mt-4">{bio}</p>
    </div>
  );
}
