"use client";

import { useRouter } from "next/navigation";

import { Button } from "../ui/button";

interface Props {
  pageNumber: number;
  isNext: boolean;
  path: string;
}

function Pagination({ pageNumber, isNext, path }: Props) {
  const router = useRouter();

  const handleNavigation = (type: string) => {
    let nextPageNumber = pageNumber;

    if (type === "prev") {
      nextPageNumber = Math.max(1, pageNumber - 1);
    } else if (type === "next") {
      nextPageNumber = pageNumber + 1;
    }

    if (nextPageNumber > 1) {
      router.push(`/${path}?page=${nextPageNumber}`);
    } else {
      router.push(`/${path}`);
    }
  };

  if (!isNext && pageNumber === 1) return null;

  return (
    <div className="flex items-center mt-4 gap-4 ">
      <button
        onClick={() => handleNavigation("prev")}
        disabled={pageNumber === 1}
        className="bg-purple-500 rounded-xl p-2  cursor-pointer"
      >
        Prev
      </button>
      <p className="">{pageNumber}</p>
      <button
        onClick={() => handleNavigation("next")}
        disabled={!isNext}
        className="bg-purple-500 rounded-xl p-2  cursor-pointer"
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
