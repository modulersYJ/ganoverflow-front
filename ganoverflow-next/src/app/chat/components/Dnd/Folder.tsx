import { useDrop } from "react-dnd";
import { Chatpost } from "./Chatpost";
import React from "react";
import FolderIcon from "@mui/icons-material/Folder";
import ChatIcon from "@mui/icons-material/ChatBubble";
import { IChatPostWithFolder } from "@/interfaces/chat";

const style: React.CSSProperties = {
  // color: "black",
  padding: "0.5rem",
};

export const Folder = ({ folder }: { folder: any }) => {
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: "chatpost",
    drop: () => ({ name: folder.folderName, folderId: folder.folderId }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));
  const isActive = canDrop && isOver;
  let backgroundColor = "black";
  if (isActive) {
    backgroundColor = "#444";
  } else if (canDrop) {
    backgroundColor = "black";
  }
  return (
    <div
      ref={drop}
      style={{
        ...style,
        backgroundColor,
        display: "flex",
        flexDirection: "column",
      }}
      data-testid="folder"
    >
      {folder.order === 0 ? (
        <div className="min-h-[20px]">
          {folder.chatposts.map((chatpost: IChatPostWithFolder) => (
            <Chatpost
              chatpost={chatpost}
              key={chatpost.chatPostId}
              isDefault={true}
            />
          ))}
        </div>
      ) : (
        <>
          <FolderUnit folderData={folder} />
          {folder.chatposts.map((chatpost: IChatPostWithFolder) => (
            <Chatpost
              chatpost={chatpost}
              key={chatpost.chatPostId}
              isDefault={false}
            />
          ))}
        </>
      )}
    </div>
  );
};

const FolderUnit: React.FC<{ folderData: any }> = ({ folderData }) => {
  return (
    <div className="w-[calc(100%-8px)] mx-[4px] my-[1px] px-1 text-white  py-1">
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
