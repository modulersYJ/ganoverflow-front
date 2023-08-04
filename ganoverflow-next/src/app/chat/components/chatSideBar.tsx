"use client";
import React from "react";
import { IChatSideBarProps } from "@/interfaces/IProps/chat";
import { FolderFileNoOrderDND } from "./Dnd";
import { useRecoilState } from "recoil";
import { foldersWithChatpostsState } from "@/atoms/folder";
import { IFolderWithPostsDTO } from "@/interfaces/chat";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";

export default function ChatSideBar({
  onClickNewChatBtn,
  loadThisChatHandler,
}: // foldersData,
IChatSideBarProps) {
  const [foldersData, setFoldersData] = useRecoilState<IFolderWithPostsDTO[]>(
    foldersWithChatpostsState
  );

  const onClickNewFolderBtn = () => {
    // Default folder(= ID 0), NewFolder, OtherFolders 순으로 정렬, 저장
    const newFolderId =
      foldersData.reduce(
        (acc, cur) => (cur.folderId > acc ? cur.folderId : acc),
        0
      ) + 1;

    const newFolder = {
      folderId: newFolderId,
      folderName: "새 폴더",
      chatposts: [],
    };

    const defaultFolder = foldersData.find((folder) => folder.folderId === 0);

    if (!defaultFolder) {
      console.error("Default folder(= ID 0) 가 없어요!");
      return;
    }

    const otherFolders = foldersData.filter((folder) => folder.folderId !== 0);

    setFoldersData([defaultFolder, newFolder, ...otherFolders]);
  };

  return (
    <div className="ChatPageCont">
      <div className="ChatSideBar fixed hidden md:block md:top-[68px] left-0 w-60 h-full">
        <div className="contentsBox h-full w-11/12 bg-black">
          <div className="sideHeader bg-black h-14 w-full flex justify-center gap-2 ">
            <button
              className="text-white mt-2 borderBtn w-3/5 h-4/6 border rounded text-sm"
              onClick={onClickNewChatBtn}
            >
              New Chat
            </button>
            <button
              className="text-white mt-2 borderBtn w-1/5 h-4/6 border rounded"
              onClick={onClickNewFolderBtn}
            >
              <CreateNewFolderIcon sx={{ fontSize: "14px" }} />
            </button>
          </div>
          <div className="text-xs text-left my-3 ml-5 text-gray-400">
            My Posts
          </div>
          <div className="list-container overflow-y-auto h-screen pb-[200px]">
            <FolderFileNoOrderDND loadThisChatHandler={loadThisChatHandler} />
          </div>
        </div>
      </div>
    </div>
  );
}
