"use client";

import Link from "next/link";

export const Pagination = ({
  currentPage,
  currentCategory,
  currentTag,
  totalPage,
}: {
  currentPage: number;
  currentCategory?: string;
  currentTag?: string;
  totalPage: number;
}) => {
  let optionalQueryString = "";

  if (currentCategory) {
    optionalQueryString = `category=${currentCategory}`;
  } else if (currentTag) {
    optionalQueryString = `tag=${currentTag}`;
  }

  const pagingButtons = ["", "", "", "", ""];

  console.log("currentPage", currentPage, "totalPage", totalPage);

  if (currentPage <= 3) {
    // 페이지 1, 2일때만
    pagingButtons[0] = "1";
    pagingButtons[1] = "2";
    pagingButtons[2] = "3";
    pagingButtons[3] = "4";
    pagingButtons[4] = "5";
  } else if (currentPage * 1 + 2 < totalPage * 1) {
    // totalpage가 11이라면 currentPage 9까지는 currentPage를 가운데로
    console.log(
      "totalpage가 11이라면 currentPage 9까지는 currentPage를 가운데로"
    );
    pagingButtons[0] = (currentPage - 2).toString();
    pagingButtons[1] = (currentPage - 1).toString();
    pagingButtons[2] = currentPage.toString();
    pagingButtons[3] = (currentPage * 1 + 1).toString();
    pagingButtons[4] = (currentPage * 1 + 2).toString();
  } else {
    // totalPage가 11이라면 10, 11
    console.log("🚀 ~ file: Pagination.tsx:35 ~ totalPage가 11이라면 10, 11");
    pagingButtons[0] = (totalPage * 1 - 4).toString();
    pagingButtons[1] = (totalPage * 1 - 3).toString();
    pagingButtons[2] = (totalPage * 1 - 2).toString();
    pagingButtons[3] = (totalPage * 1 - 1).toString();
    pagingButtons[4] = (totalPage * 1).toString();
  }

  const handlePrevFive = () => {
    if (pagingButtons[0] === "1") {
      return;
    }

    pagingButtons[0] = (parseInt(pagingButtons[0]) - 5).toString();
    pagingButtons[1] = (parseInt(pagingButtons[1]) - 5).toString();
    pagingButtons[2] = (parseInt(pagingButtons[2]) - 5).toString();
    pagingButtons[3] = (parseInt(pagingButtons[3]) - 5).toString();
    pagingButtons[4] = (parseInt(pagingButtons[4]) - 5).toString();
  };

  const handleNextFive = () => {
    if (pagingButtons[4] === totalPage.toString()) {
      return;
    }

    pagingButtons[0] = (parseInt(pagingButtons[0]) + 5).toString();
    pagingButtons[1] = (parseInt(pagingButtons[1]) + 5).toString();
    pagingButtons[2] = (parseInt(pagingButtons[2]) + 5).toString();
    pagingButtons[3] = (parseInt(pagingButtons[3]) + 5).toString();
    pagingButtons[4] = (parseInt(pagingButtons[4]) + 5).toString();
  };

  return (
    <>
      <div className="md:inline hidden">
        <Link href={`posts?page=1&${optionalQueryString}`}>
          <button className="p-2 px-2.5 m-2 rounded bg-primary">{"<<"}</button>
        </Link>
      </div>
      <Link
        href={`posts?page=${
          currentPage - 5 > 0 ? currentPage - 5 : 1
        }&${optionalQueryString}`}
      >
        <button
          className="p-2 px-2.5 m-2 rounded bg-primary"
          onClick={handlePrevFive}
        >
          {"<"}
        </button>
      </Link>
      {pagingButtons.map((e: string, idx: number) => (
        <Link href={`posts?page=${e}&${optionalQueryString}`} key={idx}>
          <button
            className={`p-2 px-2.5 m-2 rounded  ${
              currentPage.toString() == e ? "bg-primary" : "bg-secondary"
            }`}
            // onClick={() => console.log("e", e, "currentPage", currentPage)}
          >
            {e}
          </button>
        </Link>
      ))}
      <Link
        href={`posts?page=${
          totalPage > currentPage * 1 + 5 ? currentPage * 1 + 5 : totalPage
        }&${optionalQueryString}`}
      >
        <button
          className="p-2 px-2.5 m-2 rounded bg-primary"
          onClick={handleNextFive}
        >
          {">"}
        </button>
      </Link>
      <div className="md:inline hidden">
        <Link href={`posts?page=${totalPage}&${optionalQueryString}`}>
          <button className="p-2 px-2.5 m-2 rounded bg-primary">{">>"}</button>
        </Link>
      </div>
    </>
  );
};
