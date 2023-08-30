"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getCategoriesAndTopTags } from "./api/chatposts";

export default function PLPLayout({ children }: { children: React.ReactNode }) {
  const [categoriesAndTags, setCategoriesAndTags] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null); // 새로운 상태 변수

  useEffect(() => {
    const fetchCategoriesAndTopTags = async () => {
      const response = await getCategoriesAndTopTags();
      setCategoriesAndTags(response);
      setSelectedCategory("전체");
    };

    fetchCategoriesAndTopTags();
  }, []);

  const handleCategoryClick = (categoryName: string) => {
    setSelectedCategory(categoryName);
    setSelectedTag(null); // 태그 초기화
  };

  const handleTagClick = (tagName: string) => {
    // 새로운 핸들러 함수
    setSelectedTag(tagName);
  };

  const getTagsOfSelectedCategory = () => {
    const categoryData = categoriesAndTags.find(
      (category) => category.categoryName === selectedCategory
    );
    return categoryData?.tagsInfo || [];
  };

  return (
    <div className="relative flex flex-row justify-center gap-4">
      <div className="flex flex-col justify-between items-center w-3/5">
        {children}
      </div>
      <aside className="absolute right-12 hidden md:block w-56 bg-red-400">
        <div className="flex flex-col justify-start gap-4 h-full">
          <div className="pb-4 bg-red-700">
            <p className="px-3 py-2 !text-base !font-bold !text-left">
              카테고리
            </p>
            <ul className="px-3 py-2 flex flex-wrap justify-start gap-x-2 gap-y-2">
              {categoriesAndTags.map((item, idx) => (
                <li key={idx}>
                  <Link
                    href={`/posts?page=1&category=${item.categoryName}`}
                    passHref
                  >
                    <div
                      className={`text-xs font-bold text-zinc-400 border-zinc-400 border-[1.5px] px-2 py-1 rounded-md hover:!text-white hover:border-white ${
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
          <div className="pb-4 bg-red-700">
            <p className="px-3 py-2 !text-base !font-bold !text-left">
              인기있는 태그
            </p>
            <ul className="px-3 py-2 flex flex-wrap justify-start gap-x-2 gap-y-2">
              {getTagsOfSelectedCategory().map((tagInfo: any, i: number) => (
                <li key={tagInfo.tag}>
                  <Link href={`/posts?page=1&tag=${tagInfo.tag}`}>
                    <div
                      className={`text-xs font-bold text-zinc-400 border-zinc-400 border-[1.5px] px-2 py-1 rounded-full hover:!text-white hover:border-white ${
                        tagInfo.tag === selectedTag
                          ? "!border-secondary !text-secondary"
                          : ""
                      }`}
                      onClick={() => handleTagClick(tagInfo.tag)}
                    >
                      {tagInfo.tag} {tagInfo.frequency}
                    </div>
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
