"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getCategoriesAndTopTags } from "./api/chatposts";
import LottieCommunity from "./components/Lottie_Community";

export default function PLPLayout({ children }: { children: React.ReactNode }) {
  const [categoriesAndTags, setCategoriesAndTags] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [latestSelected, setLatestSelected] = useState<string | null>(null);

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

  const styleTransitionColor = `transition duration-300 ease-in-out`;
  return (
    <div className="relative flex flex-row justify-center gap-4">
      <div className="flex flex-col justify-between gap-6 items-center w-3/5 mt-10">
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
          <h1 className="relative px-14 z-10 text-xl font-bold text-center w-full !text-white">
            {latestSelected === "전체" ? "전체 보기" : latestSelected}
          </h1>
        </div>
        {children}
      </div>
      <aside className="mt-32 absolute right-12 hidden lg:block w-48 xl:w-56">
        <div className="flex flex-col justify-start gap-4 h-full">
          <div className="pb-4 bg-gray-200 dark:bg-zinc-900 rounded-md">
            <div className="w-full border-b-[1px] border-white dark:border-zinc-700">
              <p className="px-3 py-2 !text-base !font-bold !text-left text-zinc-700 dark:text-white">
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
              <p className="px-3 py-2 !text-sm font-medium !text-left text-zinc-700 dark:text-white">
                이 카테고리에서 인기있는 태그
              </p>
            </div>
            <ul className="px-3 py-2 flex flex-wrap justify-start gap-x-2 gap-y-2">
              {getTagsOfSelectedCategory().map((tagInfo: any, i: number) => (
                <li key={tagInfo.tag}>
                  <Link href={`/posts?page=1&tag=${tagInfo.tag}`}>
                    {/* <div
                      className={`text-xs font-bold text-zinc-600 border-zinc-600 bg-green-300 dark:text-zinc-400 dark:border-zinc-400 border-[1.5px] px-2 py-1 rounded-full hover:!text-white hover:border-white ${
                        tagInfo.tag === selectedTag
                          ? "!border-secondary !text-secondary"
                          : ""
                      }`}
                      onClick={() => handleTagClick(tagInfo.tag)}
                    > */}
                    <button
                      className="h-full inline-flex items-center animate-popIn"
                      onClick={() => handleTagClick(tagInfo.tag)}
                    >
                      <span
                        className={`inline-flex items-center !text-xs whitespace-nowrap bg-gray-100 font-normal dark:bg-[#222222] text-primary dark:text-secondary h-3/4 my-2 px-2 rounded-full ${styleTransitionColor} ${
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
          <div className="h-[20%] bg-red-700"></div>
        </div>
      </aside>
    </div>
  );
}
