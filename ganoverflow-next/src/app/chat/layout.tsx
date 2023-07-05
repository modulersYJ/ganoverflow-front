"use client";
import React from "react";
import { getAllChatPostsByUserId } from "./api/chat";
import { chatPostAPI } from "../api/axiosInstanceManager";
import Link from "next/link";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const chatPosts = await getAllChatPostsByUserId();
  // const chatPosts = await chatPostAPI.get("/");

  console.log("@@@@@@@@@@@@@@@@@Layout", chatPosts);
  return (
    <div className="flex flex-row h-screen">
      <div className="n top-0 left-0 w-60 h-full bg-gray-800">
        <div className="contentsBox h-full w-11/12 m-3 bg-red-100">
          <div className="sideHeader bg-red-600 h-14 w-full flex justify-center gap-2">
            <button className="text-white mt-2 borderBtn w-3/5 h-4/6 bg-indigo-900 rounded">
              New Chat
            </button>
            <button className="text-white mt-2 borderBtn w-1/5 h-4/6 bg-indigo-900 rounded">
              +
            </button>
          </div>
          <div className="list-container overflow-auto overflow-y-scroll max-h-screen ">
            <div className="plain-text text-black">my posts</div>
            {chatPosts.map((post: any, index: number) => (
              <div
                key={index}
                className="w-full bg-emerald-400 text-black border-gray-900 border py-1 my-1 hover:bg-slate-600"
              >
                <Link href={post.chatPostId.toString()}>{post.title}</Link>
              </div>
            ))}
          </div>
        </div>
      </div>
      {children}
    </div>
  );
}
