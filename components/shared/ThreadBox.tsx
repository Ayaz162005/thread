import Image from "next/image";
import Link from "next/link";
import React from "react";
import DeleteThread from "./DeleteThread";

interface Props {
  id: string;
  currentUserId: string;
  parentId: string | null;
  content: string;
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
  comments: {
    author: {
      image: string;
    };
  }[];
  isComment?: boolean;
}
export default function ThreadBox({
  id,
  currentUserId,
  parentId,
  content,
  author,
  community,
  createdAt,
  comments,
  isComment,
}: Props) {
  return (
    <div
      className={`${
        isComment ? "" : "bg-neutral-900"
      }  p-8 rounded-xl relative`}
    >
      <div className="flex gap-4">
        <div className="  relative flex flex-col">
          <Link href={`profilo/${author.id}`} className="w-14 h-14 relative">
            <Image
              src={author.image}
              alt="l"
              className=" rounded-full z-30"
              fill
            />
          </Link>

          <div className="h-full  absolute w-[2px] bg-zinc-700 bottom-0 left-1/2 -translate-x-1/2" />
        </div>
        <div>
          <h2 className="mb-2">{author.name}</h2>
          <p>{content}</p>
          <div className="flex mt-6 gap-2">
            <Image
              src="/assets/heart-gray.svg"
              alt="heart"
              width={24}
              height={24}
              className="cursor-pointer object-contain"
            />
            <Link href={`/thread/${id}`}>
              <Image
                src="/assets/reply.svg"
                alt="heart"
                width={24}
                height={24}
                className="cursor-pointer object-contain"
              />
            </Link>
            <Image
              src="/assets/repost.svg"
              alt="heart"
              width={24}
              height={24}
              className="cursor-pointer object-contain"
            />
            <Image
              src="/assets/share.svg"
              alt="heart"
              width={24}
              height={24}
              className="cursor-pointer object-contain"
            />
          </div>
        </div>
      </div>
      <div className="">
        {isComment && comments.length > 0 && (
          <Link href={`/thread/${id}`}>
            <p className="mt-1 text-subtle-medium text-gray-700">
              {comments.length} repl{comments.length > 1 ? "ies" : "y"}
            </p>
          </Link>
        )}
      </div>
      {!isComment && comments.length > 0 && (
        <div className="ml-1 mt-3 flex items-center gap-2">
          {comments.slice(0, 2).map((comment, index) => (
            <Image
              key={index}
              src={comment.author.image}
              alt={`user_${index}`}
              width={24}
              height={24}
              className={`${index !== 0 && "-ml-5"} rounded-full object-cover`}
            />
          ))}

          <Link href={`/thread/${id}`}>
            <p className="mt-1 text-subtle-medium text-gray-1">
              {comments.length} repl{comments.length > 1 ? "ies" : "y"}
            </p>
          </Link>
        </div>
      )}
      <div className="absolute top-10 right-10">
        <DeleteThread
          threadId={JSON.stringify(id)}
          currentUserId={currentUserId}
          authorId={author.id}
          parentId={parentId}
          isComment={isComment}
        />
      </div>
    </div>
  );
}
