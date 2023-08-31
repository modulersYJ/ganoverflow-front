import Link from "next/link";
import Image from "next/image";
import { getAllChatPostByCategory } from "./api/chatposts";
import { formatTimeDifference } from "@/utils/parseDate";
import { Pagination } from "./Pagination";
import { IconComment, IconStar, IconVisibility } from "./components/icons";

interface SearchParams {
  page?: number;
  category?: string;
  tag?: string;
  keyword?: string;
}

export default async function PostPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const currentPage = searchParams.page ?? 1;
  const currentCategory = searchParams.category;
  const currentTag = searchParams.tag;
  const keyword = searchParams.keyword;

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

  if (keyword) {
    propsGetAllChatPostCategory.keyword = keyword;
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
          <div>
            {allPosts?.posts?.length === 10 ? (
              allPosts?.posts?.map((post: any, id: number) => (
                <div key={id}>
                  <div className="px-1 py-2 border-0 border-b-[1px]  border-zinc-500 hover:bg-zinc-600 flex flex-col gap-1 transition duration-300 ease-in-out rounded-sm">
                    <div className="upperline flex flex-row justify-between pb-1 gap-2">
                      <div className="flex flex-col gap-3">
                        <div className="flex flex-row gap-1">
                          <div
                            className={`chip-category flex flex-row text-xs ${
                              post?.category?.categoryName ?? "hidden"
                            } justify-start w-fit h-6 px-1.5 py-1 text-primary dark:text-white border-0 dark:border-[1px] dark:border-stone-500 rounded-md bg-gray-200 dark:bg-black  font-normal overflow-x-hidden whitespace-nowrap`}
                          >
                            {post?.category?.categoryName ?? ""}
                          </div>
                        </div>
                        <Link className="" href={`/posts/${post?.chatPostId}`}>
                          <div className="font-bold text-lg text-left pl-1">
                            {post?.chatpostName}
                          </div>
                        </Link>
                      </div>
                      <div className="flex flex-row gap-2 text-xs">
                        <div className="stars flex flex-row text-zinc-500">
                          <IconStar />
                          <span>
                            {post?.stars.reduce(
                              (acc: number, curr: any) => acc + curr.value,
                              0
                            )}
                          </span>
                        </div>
                        <div className="comments text-zinc-500 flex flex-row gap-1">
                          <IconComment />
                          {post?.comments?.length}
                        </div>
                        <div className="viewcount flex flex-row gap-1 text-zinc-500">
                          <IconVisibility />
                          <span>{post?.viewCount}</span>
                        </div>
                      </div>
                    </div>
                    <div className="lowerline flex flex-row items-center justify-between gap-5 ml-1">
                      <div className="flex flex-row gap-1">
                        <div className="userbox flex flex-row gap-2 items-center">
                          <Link href={`/users/${post?.user?.id}`}>
                            <Image
                              className="rounded-full mt-1"
                              alt={post?.user?.nickname}
                              width={24}
                              height={24}
                              src={post?.user?.imgUrl}
                            />
                          </Link>

                          <div className="dark:text-zinc-300 text-xs pt-1">
                            {post?.user?.nickname ?? ""}
                          </div>
                          <div className="date text-xs text-zinc-500 pt-1">
                            {formatTimeDifference(post?.createdAt, "ko-KR")}
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-row gap-1.5">
                        {post?.tags?.map((tag: string, idx: number) => (
                          <Link href={`/posts?page=1&tag=${tag}`} key={idx}>
                            <button className="h-full inline-flex items-center animate-popIn">
                              <span
                                className={`inline-flex items-center !text-xs whitespace-nowrap bg-gray-200 font-normal dark:bg-[#2e2e2e] text-primary  dark:text-white h-3/4 my-1.5 px-2 rounded-full $ hover:!bg-zinc-700 
                                     transition duration-300 ease-in-out`}
                              >
                                {tag}{" "}
                              </span>
                            </button>
                          </Link>
                        ))}
                      </div>
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
