import Pagination from "@/components/shared/Pagination";
import SearchBar from "@/components/shared/SearchBar";
import UserCard from "@/components/shared/UserCard";
import { fetchUser, fetchUsers } from "@/lib/actions/userAction";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const user = await currentUser();
  if (!user) return;
  const user_info = await fetchUser(user.id);
  if (!user_info?.onboarded) redirect("/onboarding");
  const users = await fetchUsers({
    userId: user.id,
    searchString: searchParams.q,
    pageNumber: searchParams?.page ? +searchParams.page : 1,
    pageSize: 25,
  });
  return (
    <div>
      <h2 className="font-bold text-3xl">Search</h2>
      <SearchBar routeType="search" />
      <div className="mt-8 space-y-8">
        {users.users.map((item, i) => (
          <UserCard
            key={i}
            img={item.image}
            name={item.name}
            username={item.username}
            id={item.id}
          />
        ))}
      </div>

      <Pagination
        path="search"
        pageNumber={searchParams?.page ? +searchParams.page : 1}
        isNext={users.isNext}
      />
    </div>
  );
}
