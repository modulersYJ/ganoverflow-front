import React from "react";
import { getChatPosts } from "./api/route";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const chatPosts = await getChatPosts();
  console.log("@@@@@@@@@@@@@@@@@Layout", chatPosts);
  return (
    <div>
      <div className="fixed n top-0 left-0 w-60 h-screen bg-gray-800 pt-20">
        {chatPosts.map((post: any, index: number) => (
          <div key={index}>{post.title}</div>
        ))}
      </div>
      {children}
    </div>
  );
}
