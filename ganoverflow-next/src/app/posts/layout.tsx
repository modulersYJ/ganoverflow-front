import Link from "next/link";

export default function PLPLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-row justify-center gap-4">
      {children}
      <aside className="w-1/5 bg-red-400">
        <div className="flex flex-col justify-between gap-4 h-full">
          <div className="h-[30%] bg-red-700">
            <h2 className="tw-subtitle">Categories</h2>
            {/* 카테고리 fetch해와서 동적할당 */}
            <ul>
              {["전체", "프로그래밍", "글쓰기 과제"].map((category, idx) => (
                <li key={idx}>
                  <Link href={`/posts?page=1&category=${category}`}>
                    {category}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="h-[50%] bg-red-700"></div>

          <div className="h-[20%] bg-red-700"></div>
        </div>
      </aside>
    </div>
  );
}
