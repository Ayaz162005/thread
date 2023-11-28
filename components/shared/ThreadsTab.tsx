import { fetchUserPosts } from "@/lib/actions/userAction";
import { redirect } from "next/navigation";
import React from "react";
import ThreadBox from "./ThreadBox";
interface Result {
  name: string;
  image: string;
  id: string;
  threads: {
    _id: string;
    text: string;
    parentId: string | null;
    author: {
      name: string;
      image: string;
      id: string;
    };
    community: {
      id: string;
      name: string;
      image: string;
    } | null;
    createdAt: string;
    children: {
      author: {
        image: string;
      };
    }[];
  }[];
}

interface Params {
  currentUserId: string;
  accountId: string;
  accountType: string;
}
export default async function ThreadsTab({
  currentUserId,
  accountId,
  accountType,
}: Params) {
  let result: Result;

  if (accountType === "Community") {
    // result = await fetchCommunityPosts(accountId);
    result = "";
  } else {
    result = await fetchUserPosts(accountId);
  }
  console.log(result);
  //   if (!result) {
  //     redirect("/");
  //   }
  return (
    <section className="mt-9 flex flex-col gap-10">
      {result?.threads.map((thread) => (
        <ThreadBox
          key={thread._id}
          id={thread._id}
          currentUserId={currentUserId}
          parentId={thread.parentId}
          content={thread.text}
          author={
            accountType === "User"
              ? { name: result.name, image: result.image, id: result.id }
              : {
                  name: thread.author.name,
                  image: thread.author.image,
                  id: thread.author.id,
                }
          }
          community={
            accountType === "Community"
              ? { name: result.name, id: result.id, image: result.image }
              : thread.community
          }
          createdAt={thread.createdAt}
          comments={thread.children}
        />
      ))}
    </section>
  );
}
