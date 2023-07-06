"use client";
import React, { MouseEventHandler } from "react";
import { getAllChatPosts } from "./api/chat";
import { chatPostAPI } from "../api/axiosInstanceManager";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const chatPosts = await getAllChatPosts();
  const router = useRouter();

  const onClickPost = (postId: string) => {
    router.push(`/chat/post/${postId}`);
  };

  console.log("@@@@@@@@@@@@@@@@@Layout", chatPosts);
  return (
    <div className="ChatPageCont">
      <div className="SideBar fixed hidden md:block md:top-[68px] left-0 w-60 h-full bg-gray-800">
        <div className="contentsBox h-full w-11/12 m-3 bg-red-100">
          <div className="sideHeader bg-red-600 h-14 w-full flex justify-center gap-2">
            <button className="text-white mt-2 borderBtn w-3/5 h-4/6 bg-indigo-900 rounded">
              New Chat
            </button>
            <button className="text-white mt-2 borderBtn w-1/5 h-4/6 bg-indigo-900 rounded">
              +
            </button>
          </div>
          <div className="plain-text text-black py-2">my posts</div>
          <div className="list-container overflow-auto overflow-y-scroll h-screen pb-[400px]">
            {chatPosts.map((post: any, index: number) => (
              <div
                key={index}
                className="w-[calc(100%-8px)] mx-[4px] my-[1px] flex px-3 bg-emerald-400 text-black border-gray-900 border py-1 hover:bg-slate-400"
              >
                <div>
                  <div className="w-1/12">icon</div>
                  <div className="w-11/12">{post.title}</div>
                  {post.title}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {children}
    </div>
  );
}

interface IFolderUnit {
  id: string;
  title: string;
  userId: string;
  order: number;
}

interface IPostUnit {
  id: string;
  title: string;
  userId: string;
  folderId: string;
  order: number;
}

const dummyPostData: IPostUnit[] = [
  {
    id: "pa",
    title: "post1",
    userId: "id1",
    folderId: "a",
    order: 0,
  },
  {
    id: "pb",
    title: "post2",
    userId: "id1",
    folderId: "a",
    order: 1,
  },
  {
    id: "pc",
    title: "post3",
    userId: "id1",
    folderId: "b",
    order: 0,
  },
  {
    id: "pd",
    title: "post4",
    userId: "id1",
    folderId: "b",
    order: 2,
  },
  {
    id: "pe",
    title: "post5",
    userId: "id1",
    folderId: "b",
    order: 1,
  },
  {
    id: "pf",
    title: "post6",
    userId: "id1",
    folderId: "c",
    order: 0,
  },
  {
    id: "pg",
    title: "post6",
    userId: "id1",
    folderId: "d",
    order: 0,
  },
];
const dummyFolderData: IFolderUnit[] = [
  {
    id: "a",
    title: "default folder for independent posts",
    userId: "id1",
    order: 0,
  },
  {
    id: "b",
    title: "folder1",
    userId: "id1",
    order: 2,
  },
  {
    id: "c",
    title: "folder2",
    userId: "id1",
    order: 1,
  },
  {
    id: "d",
    title: "folder3",
    userId: "id1",
    order: 3,
  },
];

const folderUnit = (index: number, folderData: IFolderUnit) => {
  return <></>;
};

const postUnit = (index: number, folderData: IFolderUnit) => {
  return <></>;
};
