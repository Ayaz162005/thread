import ProfileHeader from "@/components/shared/ProfileHeader";
import { fetchUser } from "@/lib/actions/userAction";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { profileTabs } from "@/constants";
import Image from "next/image";
import { fetchThreadById } from "@/lib/actions/threadAction";
import ThreadsTab from "@/components/shared/ThreadsTab";

export default async function Page({ params }: { params: { id: string } }) {
  const user = await currentUser();
  if (!user) return null;
  console.log(params);
  const userInfo = await fetchUser(params.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  console.log("ryrheuirwio");
  return (
    <section>
      <ProfileHeader
        accountId={userInfo.id}
        authUserId={user.id}
        name={userInfo.name}
        username={userInfo.username}
        imgUrl={userInfo.image}
        bio={userInfo.bio}
      />

      <div className="mt-8">
        <Tabs defaultValue="threads" className="w-full ">
          <TabsList
            className={
              " flex min-h-[50px] flex-1 items-center  data-[state=active]:bg-[#0e0e12] "
            }
          >
            {profileTabs.map((item, i) => (
              <TabsTrigger
                value={item.value}
                key={i}
                className="flex min-h-[50px] flex-1 items-center gap-3 data-[state=active]:bg-[#0e0e12] bg-stone-800"
              >
                <Image
                  src={item.icon}
                  width={20}
                  height={20}
                  alt={item.value}
                />
                <p className="ml-2"> {item.label}</p>
                {item.label === "Threads" && (
                  <p className="ml-1 rounded-sm bg-slate-500 px-2 py-1 !text-tiny-medium text-light-2">
                    {userInfo.threads.length}
                  </p>
                )}
              </TabsTrigger>
            ))}
          </TabsList>
          {profileTabs.map((tab) => (
            <TabsContent
              key={`content-${tab.label}`}
              value={tab.value}
              className="w-full text-light-1"
            >
              {/* @ts-ignore */}
              <ThreadsTab
                currentUserId={user.id}
                accountId={userInfo.id}
                accountType="User"
              />
            </TabsContent>
          ))}
        </Tabs>
      </div>
      <div>
        <ThreadsTab
          currentUserId={user.id}
          accountId={userInfo._id}
          accountType={"User"}
        />
      </div>
    </section>
  );
}
