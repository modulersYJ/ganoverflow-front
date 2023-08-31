"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getCategoriesAndTopTags } from "./api/chatposts";
import LottieCommunity from "./components/Lottie_Community";
import LottieTrending from "./components/Lottie_Trending";
import ChatIcon from "@mui/icons-material/Chat";
import SearchIcon from "@mui/icons-material/Search";

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
              className="relative h-11 w-full bg-inherit px-2 pl-3 py-1 font-normal text-xs text-left outline-none rounded-md"
              name="keyword"
              value={searchData}
              autoFocus
              autoComplete="off"
              placeholder="관심있는 제목, 내용을 검색해요"
              onChange={handleInputChange}
            />
            <button
              className="absolute right-1 top-2.5 text-white dark:text-black  rounded min-w-fit"
              onClick={handleSearch}
            >
              <SearchIcon className="!text-secondary dark:!text-white mr-1" />
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
                    url: "/posts/231",
                  },
                  {
                    title: "ㅋㅋ를 코드화!!!",
                    commentCnt: 8,
                    url: "/posts/131",
                  },
                  {
                    title: "Say Cutely 시스템 명령 적용 모드",
                    commentCnt: 6,
                    url: "/posts/193",
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
