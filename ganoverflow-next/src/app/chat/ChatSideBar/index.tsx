"use client";
import React from "react";
import { IChatSideBarProps } from "@/interfaces/IProps/chat";
import SideBarHeader from "./components/SideBarHeader";
import DragDropContainer from "./components/DragDropContainer";

export default function ChatSideBar({ onClickNewChatBtn }: IChatSideBarProps) {
  return (
    <div className="ChatSideBar">
      <div className="fixed hidden md:block md:top-[68px] left-0 w-60 h-full">
        <div className="contentsBox flex flex-col h-full w-11/12 bg-black">
          <SideBarHeader onClickNewChatBtn={onClickNewChatBtn} />
          <label className="text-left my-3 ml-5 text-xs !text-gray-400">
            My Posts
          </label>
          <DragDropContainer />
        </div>
      </div>
    </div>
  );
}
