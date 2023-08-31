"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getCategoriesAndTopTags } from "./api/chatposts";
import LottieCommunity from "./components/Lottie_Community";
import LottieTrending from "./components/Lottie_Trending";
import ChatIcon from "@mui/icons-material/Chat";

export const styleTransitionColor = `transition duration-300 ease-in-out`;

export default function PLPLayout({ children }: { children: React.ReactNode }) {
  const [categoriesAndTags, setCategoriesAndTags] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [latestSelected, setLatestSelected] = useState<string | null>(null);
  const [searchData, setSearchData] = useState<string>("");

  useEffect(() => {
    const fetchCategoriesAndTopTags = async () => {
      const response = await getCategoriesAndTopTags();
      setCategoriesAndTags(response);
      setSelectedCategory("전체");
      setLatestSelected("전체");
    };

    fetchCategoriesAndTopTags();
  }, []);

  const handleCategoryClick = (categoryName: string) => {
    setSelectedCategory(categoryName);
    setSelectedTag(null); // 태그 초기화
    setLatestSelected(categoryName);
  };

  const handleTagClick = (tagName: string) => {
    setSelectedTag(tagName);
    setLatestSelected(`# ${tagName}`);
  };

  const getTagsOfSelectedCategory = () => {
    const categoryData = categoriesAndTags.find(
      (category) => category.categoryName === selectedCategory
    );
    return categoryData?.tagsInfo || [];
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchData(e.target.value);
  };

  const handleSearch = (e: React.FormEvent) => {};

  return (
    <div className="relative flex flex-row justify-center gap-4">
      <div className="flex flex-col justify-between gap-6 items-center w-10/12 md:w-3/5 mt-10">
        <div className="filter-title relative flex items-center justify-start w-full h-16">
          <div
            className="absolute inset-0 opacity-75 z-0 rounded-lg"
            style={{
              backgroundImage: "url(/title-bg.png)",
              backgroundSize: "100% auto",
              backgroundRepeat: "no-repeat",
            }}
          ></div>
          <LottieCommunity />
          <h1
            className="relative px-14 z-10 text-xl font-bold text-center w-full !text-white animate-fadeIn"
            key={latestSelected}
          >
            {latestSelected === "전체" ? "전체 보기" : latestSelected}
          </h1>
        </div>
        {children}
      </div>
      <aside className="mt-32 absolute right-12 hidden lg:block w-48 xl:w-56">
        <div className="flex flex-col justify-start gap-4 h-full">
          <form
            action="/posts"
            className="flex flex-row gap-2 border-[1px] rounded-md border-primary outline-secondary bg-white dark:bg-[#121212]"
          >
            <input
              className="h-11 w-full bg-inherit px-2 py-1 font-normal text-xs text-left"
              name="keyword"
              value={searchData}
              autoFocus
              autoComplete="off"
              placeholder="관심있는 제목, 내용을 검색해요"
              onChange={handleInputChange}
            />
            <button
              className=" text-white dark:text-black  rounded min-w-fit"
              onClick={handleSearch}
            >
              <svg
                fill="#12D761"
                height="20px"
                width="20px"
                version="1.1"
                id="Layer_1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                stroke="#12D761"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <g>
                    <g>
                      <path d="M196.165,53.195c-75.163,0-136.312,61.149-136.312,136.312s61.15,136.312,136.312,136.312s136.312-61.149,136.312-136.312 S271.328,53.195,196.165,53.195z M196.165,299.221c-60.496,0-109.714-49.217-109.714-109.714 c0-60.497,49.219-109.714,109.714-109.714s109.714,49.217,109.714,109.714C305.879,250.004,256.662,299.221,196.165,299.221z"></path>{" "}
                    </g>
                  </g>
                  <g>
                    <g>
                      <path d="M493.676,443.893L349.931,300.149c23.122-32.11,35.74-70.953,35.74-110.643C385.672,85.012,300.66,0,196.165,0 S6.659,85.012,6.659,189.506s85.012,189.507,189.507,189.507c33.349,0,65.797-8.715,94.494-25.293l146.593,146.594 c7.535,7.535,17.554,11.686,28.212,11.686s20.675-4.151,28.212-11.686C509.23,484.759,509.23,459.449,493.676,443.893z M474.869,481.507c-2.512,2.512-5.851,3.895-9.404,3.895c-3.552,0-6.893-1.383-9.404-3.895L302.037,327.483 c-2.571-2.571-5.975-3.895-9.407-3.895c-2.524,0-5.064,0.717-7.296,2.184c-26.543,17.431-57.375,26.644-89.169,26.644 c-89.829,0-162.909-73.08-162.909-162.909s73.08-162.909,162.909-162.909s162.909,73.08,162.909,162.909 c0,37.585-13.166,74.285-37.071,103.34c-4.35,5.286-3.975,13.011,0.864,17.852l152,152 C480.052,467.886,480.052,476.322,474.869,481.507z"></path>
                    </g>
                  </g>
                </g>
              </svg>
            </button>
          </form>

          <div className="pb-4 bg-gray-200 dark:bg-zinc-900 rounded-md">
            <div className="w-full border-b-[1px] border-white dark:border-zinc-700">
              <p className="px-3 py-2 !text-base !font-bold !text-left text-zinc-900 dark:text-white">
                카테고리
              </p>
            </div>
            <ul className="px-3 py-2 flex flex-wrap justify-start gap-x-2 gap-y-2">
              {categoriesAndTags.map((item, idx) => (
                <li key={idx}>
                  <Link
                    href={`/posts?page=1&category=${item.categoryName}`}
                    passHref
                  >
                    <div
                      className={`text-xs font-bold text-zinc-600 border-zinc-600 dark:text-zinc-400 dark:border-zinc-400 border-[1.5px] px-2 py-1 rounded-md hover:!text-white hover:border-white ${styleTransitionColor} ${
                        item.categoryName === selectedCategory
                          ? "!border-secondary !text-secondary"
                          : ""
                      }`}
                      onClick={() => handleCategoryClick(item.categoryName)}
                    >
                      {item.categoryName === "전체"
                        ? "전체 보기"
                        : item.categoryName}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="pb-4 bg-gray-200 dark:bg-zinc-900 rounded-md">
            <div className="w-full border-b-[1px] border-white dark:border-zinc-700">
              <p className="px-3 py-2 !text-sm font-medium !text-left text-zinc-900 dark:text-white">
                이 카테고리에서 인기있는 태그
              </p>
            </div>
            <ul className="px-3 py-2 flex flex-wrap justify-start gap-x-2 gap-y-2">
              {getTagsOfSelectedCategory().map((tagInfo: any, i: number) => (
                <li key={tagInfo.tag}>
                  <Link href={`/posts?page=1&tag=${tagInfo.tag}`}>
                    <button
                      className="h-full inline-flex items-center animate-popIn"
                      onClick={() => handleTagClick(tagInfo.tag)}
                    >
                      <span
                        className={`inline-flex items-center !text-xs whitespace-nowrap bg-gray-100 font-normal dark:bg-[#222222] text-primary dark:text-secondary h-3/4 my-2 px-2 rounded-full ${styleTransitionColor} hover:!bg-zinc-700 ${
                          tagInfo.tag === selectedTag
                            ? "!bg-primary !text-white"
                            : ""
                        }`}
                      >
                        {tagInfo.tag}{" "}
                        <span className="ml-1 text-[0.55rem]">
                          {tagInfo.frequency}
                        </span>
                      </span>
                    </button>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="pb-4 mt-4 bg-gray-200 dark:bg-zinc-900 rounded-md">
            <div className="w-full border-b-[1px] border-white dark:border-zinc-700 relative">
              <LottieTrending />
              <p className="px-3 py-2 !text-sm font-medium !text-right mr-4 text-zinc-900 dark:text-white">
                현재 <span className="text-secondary font-bold">핫한</span>{" "}
                스레드
              </p>
            </div>
            <div className="my-1">
              <ul className="flex flex-col gap-4 px-4 py-2">
                {[
                  {
                    title: "GANoverflow는 무슨 서비스인가?",
                    commentCnt: 12,
                    url: "http://localhost:3000/posts/231",
                  },
                  {
                    title: "ㅋㅋ를 코드화!!!",
                    commentCnt: 8,
                    url: "http://localhost:3000/posts/131",
                  },
                  {
                    title: "Say Cutely 시스템 명령 적용 모드",
                    commentCnt: 6,
                    url: "http://localhost:3000/posts/193",
                  },
                ].map((item: any, idx: number) => (
                  <li key={idx}>
                    <Link
                      href={item.url}
                      className={`w-full flex flex-row items-center justify-start gap-3 text-zinc-600 dark:text-zinc-300 hover:!text-zinc-600 ${styleTransitionColor}`}
                    >
                      <div className="!text-left text-xs w-3/4">
                        {" "}
                        {item.title.length > 16
                          ? item.title.substring(0, 16) + ".."
                          : item.title}
                      </div>
                      <div className="w-2/12 flex flex-row gap-1 mt-[1px]">
                        <ChatIcon
                          sx={{ fontSize: "15px", paddingTop: "3px" }}
                        />
                        <span className="text-xs ">{item.commentCnt}</span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
