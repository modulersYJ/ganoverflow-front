"use client";

import Link from "next/link";

export const Pagination = ({
  currentPage,
  totalPage,
}: {
  currentPage: number;
  totalPage: number;
}) => {
  const pagingButtons = ["", "", "", "", ""];

  if (currentPage <= 3) {
    pagingButtons[0] = "1";
    pagingButtons[1] = "2";
    pagingButtons[2] = "3";
    pagingButtons[3] = "4";
    pagingButtons[4] = "5";
  } else if (currentPage + 2 < totalPage) {
    pagingButtons[0] = (currentPage - 2).toString();
    pagingButtons[1] = (currentPage - 1).toString();
    pagingButtons[2] = currentPage.toString();
    pagingButtons[3] = (currentPage * 1 + 1).toString();
    pagingButtons[4] = (currentPage * 1 + 2).toString();
  } else {
    pagingButtons[0] = (totalPage * 1 - 4).toString();
    pagingButtons[1] = (totalPage * 1 - 3).toString();
    pagingButtons[2] = (totalPage * 1 - 2).toString();
    pagingButtons[3] = (totalPage * 1 - 1).toString();
    pagingButtons[4] = (totalPage * 1).toString();
  }

  return (
    <>
      <Link href={`posts?page=1`}>
        <button className="p-2 m-2 rounded bg-orange-200 text-neutral-900">
          {"<"}
        </button>
      </Link>
      {pagingButtons.map((e: string) => (
        <Link href={`posts?page=${e}`}>
          <button
            className={`p-2 m-2 rounded bg-orange-200 text-neutral-900 ${
              currentPage.toString() === e ? "bg-slate-100" : ""
            }`}
          >
            {e}
          </button>
        </Link>
      ))}
      <Link href={`posts?page=${totalPage}`}>
        <button className="p-2 m-2 rounded bg-orange-200 text-neutral-900">
          {">"}
        </button>
      </Link>
    </>
  );
};