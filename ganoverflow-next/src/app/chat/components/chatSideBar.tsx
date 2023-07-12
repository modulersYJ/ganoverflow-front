"use client";
import React from "react";
import ChatIcon from "@mui/icons-material/ChatOutlined";
import FolderIcon from "@mui/icons-material/FolderOutlined";

import { IChatPostWithFolder, IFolderWithPostsDTO } from "@/interfaces/chat";
import { IChatSideBarProps } from "@/interfaces/IProps/chat";

export default function ChatSideBar({
  onClickNewChatBtn,
  foldersData,
}: IChatSideBarProps) {
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
