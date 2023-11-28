import ThreadBox from "@/components/shared/ThreadBox";
import { currentUser } from "@clerk/nextjs";
import { fetchPosts } from "@/lib/actions/threadAction";
import React from "react";
import { fetchUser } from "@/lib/actions/userAction";
import { redirect } from "next/navigation";
import Pagination from "@/components/shared/Pagination";

export default async function page({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  const result = await fetchPosts(
    searchParams.page ? +searchParams.page : 1,
    30
  );

  return (
    <>
      <div className="space-y-4">
        {result.posts.map((post, i) => {
          return (
            <ThreadBox
              key={post._id}
              id={post._id}
              currentUserId={user.id}
              parentId={post.parentId}
              content={post.text}
              author={post.author}
              community={post.community}
              createdAt={post.createdAt}
              comments={post.children}
            />
          );
        })}
      </div>
      <Pagination
        path="/"
        pageNumber={searchParams?.page ? +searchParams.page : 1}
        isNext={result.isNext}
      />
    </>
  );
}
