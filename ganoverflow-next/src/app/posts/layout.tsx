"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getCategoriesAndTopTags } from "./api/chatposts";

export default function PLPLayout({ children }: { children: React.ReactNode }) {
  const [categoriesAndTags, setCategoriesAndTags] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategoriesAndTopTags = async () => {
      const response = await getCategoriesAndTopTags();
      setCategoriesAndTags(response);
      setSelectedCategory("전체");
    };

    fetchCategoriesAndTopTags();
  }, []);

  const handleCategoryClick = (categoryName: string) => {
    console.log("clicked");
    setSelectedCategory(categoryName);
  };

  const getTagsOfSelectedCategory = () => {
    console.log("getTagsOfSelectedCategory");
    const categoryData = categoriesAndTags.find(
      (category) => category.categoryName === selectedCategory
    );
    console.log("getTagsOfSelectedCategory END:", categoryData?.tagsInfo || []);
    return categoryData?.tagsInfo || [];
  };

  return (
    <div className="flex flex-row justify-center gap-4">
      {children}
      <aside className="w-64 bg-red-400">
        <div className="flex flex-col justify-between gap-4 h-full">
          <div className="h-[30%] bg-red-700">
            <h2 className="tw-subtitle">Categories</h2>
            <ul className="flex flex-wrap justify-start gap-x-2 gap-y-2">
              {categoriesAndTags.map((item, idx) => (
                <li key={idx}>
                  <Link
                    href={`/posts?page=1&category=${item.categoryName}`}
                    passHref
                  >
                    <button
                      onClick={() => handleCategoryClick(item.categoryName)}
                    >
                      {item.categoryName}
                    </button>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="h-[50%] bg-red-700">
            <ul className="flex flex-wrap justify-start gap-x-2 gap-y-2">
              {getTagsOfSelectedCategory().map((tagInfo: any, i: number) => (
                <li key={tagInfo.tag}>
                  <Link href={`/posts?page=1&tag=${tagInfo.tag}`}>
                    <button className="text-xs bg-secondary px-2 py-2 rounded-full">
                      {tagInfo.tag} {tagInfo.frequency}
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
