import Link from "next/link";
import { getAllChatPost } from "./api/chatposts";

export default async function PostPage() {
  const allPosts = await getAllChatPost();
  console.log("ap", allPosts[0]);
  return (
    <>
      <div className="post-title text-xl ">GanOverflow - POSTS</div>
      <div className="grid">
        <table className="w-3/5 place-self-center">
          <thead className="posts-tablehead border border-gray-300 border-x-0">
            <tr>
              <th className="p-2.5">번호</th>
              <th className="p-2.5">카테고리</th>
              <th className="p-2.5">제목</th>
              <th className="p-2.5">글쓴이</th>
              <th className="p-2.5">작성일</th>
              <th className="p-2.5">댓글</th>
              <th className="p-2.5">조회수</th>
              <th className="p-2.5">추천</th>
            </tr>
          </thead>
          <tbody>
            {allPosts.length > 0 ? (
              allPosts.map((post: any, id: number) => (
                <tr
                  className="border border-x-0 border-spacing-2 border-zinc-500 hover:bg-slate-800"
                  key={id}
                >
                  <td className="py-1">{post?.chatPostId}</td>
                  <td className="py-1">{post?.category ?? "카테고리"}</td>
                  <td className="py-1">
                    <Link href={`/posts/${post?.chatPostId}`}>
                      {post?.title}
                    </Link>
                  </td>
                  <td className="py-1">
                    {post?.userId.nickname ?? "작성자 없음"}
                  </td>
                  <td className="py-1">
                    {post?.createdAt.slice(0, 10) ?? "2"}
                  </td>
                  <td className="py-1">{post?.comments?.length ?? 0}</td>
                  <td className="py-1">{post?.viewCount}</td>
                  <td className="py-1">{post?.likes}</td>
                </tr>
              ))
            ) : (
              <></>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
