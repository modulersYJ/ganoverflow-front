import Link from "next/link";
import { getAllChatPost, getAllChatPostByCategory } from "./api/chatposts";
import {
  formatTimeDifference,
  parseDate,
  parseDateWithSeconds,
} from "@/utils/parseDate";
import { Pagination } from "./Pagination";

interface SearchParams {
  page?: number;
  category?: string;
  tag?: string;
}

export default async function PostPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const currentPage = searchParams.page ?? 1;
  const currentCategory = searchParams.category;
  const currentTag = searchParams.tag;

  const propsGetAllChatPostCategory: any = {
    page: currentPage,
  };

  if (searchParams.category) {
    // "전체"는 가상의 카테고리이므로, 빈 쿼리스트링 처리하여 전체검색 수행
    if (searchParams.category !== "전체") {
      propsGetAllChatPostCategory.category = currentCategory;
    }
  } else if (searchParams.tag) {
    propsGetAllChatPostCategory.tag = currentTag;
  }

  const allPosts = await getAllChatPostByCategory(propsGetAllChatPostCategory);

  console.log("allPosts==============================", allPosts);

  // ! 페이징용 게시물수
  const totalCount = allPosts.postCount;
  const totalPage = Math.ceil(totalCount / 10);

  // ! 10개 미만이면 10개로 채워줘야 함.
  while (allPosts?.posts?.length < 10) {
    allPosts.posts.push({
      post: "",
      id: 0,
      createdAt: "",
      stars: [],
      category: " ",
      comments: [],
    });
  }

  return (
    <div className="flex flex-col justify-between items-center w-full mx-auto gap-4">
      <div className="grid w-full">
        <div className="board w-full place-self-center">
          {/* <thead className="posts-tablehead border border-gray-300 border-x-0">
            <tr className="whitespace-nowrap">
              <th className="p-2.5">번호</th>
              <th className="p-2.5 hidden md:block">카테고리</th>
              <th className="p-2.5">제목</th>
              <th className="p-2.5">글쓴이</th>
              <th className="p-2.5 hidden md:block">작성일</th>
              <th className="p-2.5">댓글</th>
              <th className="p-2.5">조회수</th>
              <th className="p-2.5 hidden md:block">추천</th>
            </tr>
          </thead> */}
          <div>
            {allPosts?.posts?.length === 10 ? (
              allPosts?.posts?.map((post: any, id: number) => (
                <div
                  className=" border border-x-0 border-spacing-2 border-zinc-500 hover:bg-slate-600 flex flex-col"
                  key={id}
                >
                  {/* <div className="">{post?.chatPostId}</div> */}
                  <div className="upperline flex flex-row pt-2 pb-1 gap-2 items-center">
                    <div
                      className={`flex flex-row text-xs ${
                        post?.category?.categoryName ?? "hidden"
                      } justify-start border w-fit h-6 mx-1 p-1 border-stone-500 rounded-md bg-slate-200 dark:bg-[#121212]  font-normal overflow-x-hidden whitespace-nowrap`}
                    >
                      {post?.category?.categoryName ?? ""}
                    </div>
                    <Link href={`/posts/${post?.chatPostId}`}>
                      <div className="font-extrabold text-lg text-left">
                        {post?.chatpostName}
                      </div>
                    </Link>
                    <div className="comments">[{post?.comments?.length}]</div>
                  </div>
                  <div className="lowerline flex flex-row items-center gap-2">
                    <div className="userbox flex flex-row gap-2 pb-1 items-center">
                      <div className="rounded-3xl w-8 h-8 p-2 bg-fuchsia-300 text-black text-xs whitespace-nowrap">
                        {post?.user?.profile ?? "pic"}
                      </div>
                      <div className="">{post?.user?.nickname ?? ""}</div>
                    </div>

                    <div className="date">
                      {formatTimeDifference(post?.createdAt, "ko-KR")}
                    </div>
                    <div className="viewcount flex flex-row gap-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                      >
                        <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />{" "}
                        <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />{" "}
                      </svg>
                      <span>{post?.viewCount}</span>
                    </div>
                    <div className="stars flex flex-row">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="1em"
                        viewBox="0 0 512 512"
                        style={{
                          fill: "white",
                          width: "25px",
                          height: "1rem",
                          fontSize: "0.8rem",
                          pointerEvents: "none",
                        }}
                      >
                        <path d="M313.4 32.9c26 5.2 42.9 30.5 37.7 56.5l-2.3 11.4c-5.3 26.7-15.1 52.1-28.8 75.2H464c26.5 0 48 21.5 48 48c0 18.5-10.5 34.6-25.9 42.6C497 275.4 504 288.9 504 304c0 23.4-16.8 42.9-38.9 47.1c4.4 7.3 6.9 15.8 6.9 24.9c0 21.3-13.9 39.4-33.1 45.6c.7 3.3 1.1 6.8 1.1 10.4c0 26.5-21.5 48-48 48H294.5c-19 0-37.5-5.6-53.3-16.1l-38.5-25.7C176 420.4 160 390.4 160 358.3V320 272 247.1c0-29.2 13.3-56.7 36-75l7.4-5.9c26.5-21.2 44.6-51 51.2-84.2l2.3-11.4c5.2-26 30.5-42.9 56.5-37.7zM32 192H96c17.7 0 32 14.3 32 32V448c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32V224c0-17.7 14.3-32 32-32z" />
                      </svg>
                      <span>
                        {post?.stars.reduce(
                          (acc: number, curr: any) => acc + curr.value,
                          0
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
      <div className="pagination-wrapper flex flex-row pb-10">
        <Pagination
          currentPage={currentPage}
          currentCategory={currentCategory}
          currentTag={currentTag}
          totalPage={totalPage}
        />
      </div>
    </div>
  );
}
