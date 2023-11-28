import OnboardForm from "@/components/forms/OnboardForm";
import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs";
import React from "react";
import { fetchUser } from "@/lib/actions/userAction";

export default async function page() {
  const user = await currentUser();
  if (!user) return null;
  const userInfo = await fetchUser(user.id);

  if (userInfo?.onboarded) redirect("/");

  const userData = {
    id: user.id,
    objectId: userInfo?._id,
    username: userInfo ? userInfo?.username : user.username,
    name: userInfo ? userInfo?.name : user.firstName ?? "",
    bio: userInfo ? userInfo?.bio : "",
    image: userInfo ? userInfo?.image : user.imageUrl,
  };
  return (
    <div className="px-12 py-20">
      <h2 className="text-3xl font-bold mb-4">Onboarding</h2>
      <p>Complete your profile now, to use Threds.</p>
      <OnboardForm user={userData} />
    </div>
  );
}
