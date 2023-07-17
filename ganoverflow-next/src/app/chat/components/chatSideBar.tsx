"use client";
import React from "react";
import { IChatSideBarProps } from "@/interfaces/IProps/chat";
import { FolderFileNoOrderDND } from "./Dnd";

export default function ChatSideBar({
  onClickNewChatBtn,
}: // foldersData,
IChatSideBarProps) {

  return (
    <div className="ChatPageCont">
      <div className="ChatSideBar fixed hidden md:block md:top-[68px] left-0 w-60 h-full bg-gray-800">
        <div className="contentsBox h-full w-11/12 m-3 bg-red-100">
          <div className="sideHeader bg-red-600 h-14 w-full flex justify-center gap-2">
            <button
              className="text-white mt-2 borderBtn w-3/5 h-4/6 bg-indigo-900 rounded"
              onClick={onClickNewChatBtn}
            >
              New Chat
            </button>
            <button className="text-white mt-2 borderBtn w-1/5 h-4/6 bg-indigo-900 rounded">
              +
            </button>
          </div>
          <div className="plain-text text-black py-2">my posts</div>
          <div className="list-container overflow-y-auto h-screen pb-[200px]">
            <FolderFileNoOrderDND />
          </div>
        </div>
      </div>
    </div>
  );
}
