"use client";
import React, { useEffect, useState } from "react";
import { getFoldersByUser } from "./api/chat";
import { useRouter } from "next/navigation";

//파일모양 아이콘 import
import ChatIcon from "@mui/icons-material/ChatOutlined";
import FolderIcon from "@mui/icons-material/FolderOutlined";
import { useAuthDataHook } from "../utils/jwtHooks/getNewAccessToken";
import { useRecoilValue, useRecoilState } from "recoil";
import { accessTokenState } from "@/atoms/jwt";
import { getLocalStorageItem } from "../utils/common/localStorage";
import { IAuthData } from "../api/jwt";
import { IChatPostWithFolder, IFolderWithPostsDTO } from "@/interfaces/chat";
import { useNewChatStatesHook } from "../utils/chat/useNewChatStates";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { foldersWithPostsState } from "@/atoms/folder";

export default function Layout({ children }: { children: React.ReactNode }) {
  useAuthDataHook();
  const accessToken = useRecoilValue(accessTokenState);
  const {
    chatSavedStatus,
    setChatSavedStatus,
    setQuestionInput,
    setChatPairs,
    setCheckCnt,
    setFormData,
  } = useNewChatStatesHook();

  const onClickNewChat = () => {
    setChatPairs([]);
    setCheckCnt(0);
    setChatSavedStatus("F");
    setFormData({ prompt: "" });
    setQuestionInput("");
  };

  const [foldersWithPosts, setFoldersWithPosts] = useRecoilState(
    foldersWithPostsState
  );

  const fetchData = async (accessToken: string) => {
    const user = await getLocalStorageItem("userData");

    const authData: IAuthData = {
      accessToken: accessToken,
      userId: user.id,
    };
    const chatFoldersByUser = await getFoldersByUser(user.id, authData);
    setFoldersWithPosts(chatFoldersByUser);

    console.log("@@@@@@@@@@@@@@@@@Layout: Folders", chatFoldersByUser);
  };

  const handleDragEnd = (result: any) => {
    const { source, destination } = result;

    // 드랍 지점이 없을 경우 무시
    if (!destination) {
      return;
    }

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return; // 드래그 시작 지점과 드랍 지점이 같을 경우 무시
    }

    if (source.droppableId === destination.droppableId) {
      console.log("BEF FoldersWithPosts: ", ...foldersWithPosts);
      setFoldersWithPosts((prev) => {
        let cloned = [...prev];
        let swapItem = {
          ...cloned[destination.index],
          order: cloned[source.index].order,
        };
        cloned[destination.index] = {
          ...cloned[source.index],
          order: cloned[destination.index].order,
        };
        cloned[source.index] = swapItem;
        return cloned;
      });
      console.log("AFTER FoldersWithPosts: ", ...foldersWithPosts);
    }
  };

  // case 1)
  useEffect(() => {
    if (accessToken) {
      fetchData(accessToken);
    }
  }, [accessToken]);

  // case 2)
  useEffect(() => {
    if (chatSavedStatus === "T" && accessToken) {
      fetchData(accessToken);
    }
  }, [chatSavedStatus, accessToken]);

  return (
    <div className="ChatPageCont">
      <div className="SideBar fixed hidden md:block md:top-[68px] left-0 w-60 h-full bg-gray-800">
        <div className="contentsBox h-full w-11/12 m-3 bg-red-100">
          <div className="sideHeader bg-red-600 h-14 w-full flex justify-center gap-2">
            <button
              className="text-white mt-2 borderBtn w-3/5 h-4/6 bg-indigo-900 rounded"
              onClick={onClickNewChat}
            >
              New Chat
            </button>
            <button className="text-white mt-2 borderBtn w-1/5 h-4/6 bg-indigo-900 rounded">
              +
            </button>
          </div>
          <div className="plain-text text-black py-2">my posts</div>
          <div className="list-container overflow-auto overflow-y-scroll h-screen pb-[400px]">
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="droppable">
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef}>
                    {foldersWithPosts.map((folder, index) =>
                      folder.order === 0 ? (
                        <div key={folder.folderId}>
                          {folder.chatposts.map((post, index) => (
                            <PostUnit
                              key={index}
                              postData={post}
                              isDefault={true}
                            />
                          ))}
                        </div>
                      ) : (
                        <Draggable
                          key={folder.folderId}
                          draggableId={folder.folderId.toString()}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              {folder.order === 0 ? (
                                folder.chatposts.map((post, index) => (
                                  <PostUnit
                                    key={index}
                                    postData={post}
                                    isDefault={true}
                                  />
                                ))
                              ) : (
                                <>
                                  <FolderUnit key={index} folderData={folder} />
                                  {folder.chatposts.map((post, index) => (
                                    <PostUnit
                                      key={index}
                                      postData={post}
                                      isDefault={false}
                                    />
                                  ))}
                                </>
                              )}
                            </div>
                          )}
                        </Draggable>
                      )
                    )}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
              {children}
            </DragDropContext>
          </div>
        </div>
      </div>
      {children}
    </div>
  );
}

const FolderUnit: React.FC<{ folderData: IFolderWithPostsDTO }> = ({
  folderData,
}) => {
  return (
    <div className="w-[calc(100%-8px)] mx-[4px] my-[1px] px-1 bg-emerald-400 text-black border-gray-900 border py-1 hover:bg-slate-400 ">
      <div className="flex flex-row pb-1">
        <div className="w-2/12">
          <FolderIcon sx={{ fontSize: "19px" }} />
        </div>
        <div className="w-8/12 px-1 pt-[4px] text-left text-sm">
          {folderData.folderName}
        </div>
      </div>
    </div>
  );
};

const PostUnit: React.FC<{
  postData: IChatPostWithFolder;
  isDefault: boolean;
}> = ({ postData, isDefault }) => {
  return (
    <div
      className={`w-[calc(100%-8px)] mx-[4px] my-[1px] px-1 bg-emerald-400 text-black border-gray-900 border py-1 hover:bg-slate-400 ${
        isDefault ? "pl-1" : "pl-5"
      }`}
    >
      <div className="flex flex-row pb-1">
        <div className="w-2/12 ">
          <ChatIcon sx={{ fontSize: "17px" }} />
        </div>
        <div className="w-8/12 px-1 pt-[3px] text-left text-sm">
          {postData.title}
        </div>
      </div>
    </div>
  );
};
