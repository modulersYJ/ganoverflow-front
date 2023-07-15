import { useDrop } from "react-dnd";
import { Chatpost } from "./Chatpost";
import React from "react";
import FolderIcon from "@mui/icons-material/Folder";
import ChatIcon from "@mui/icons-material/ChatBubble";

const style: React.CSSProperties = {
  width: "12rem",
  marginRight: "1.5rem",
  marginBottom: "1.5rem",
  color: "black",
  padding: "1rem",
  textAlign: "center",
  fontSize: "1rem",
  lineHeight: "normal",
  float: "left",
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
  let backgroundColor = "#222";
  if (isActive) {
    backgroundColor = "darkgreen";
  } else if (canDrop) {
    backgroundColor = "darkkhaki";
  }
  return (
    <div
      ref={drop}
      style={{
        // ...style,
        // backgroundColor,
        display: "flex",
        flexDirection: "column",
      }}
      data-testid="folder"
    >
      {folder.order === 0 ? (
        <div className="min-h-[300px]">
          {folder.chatposts.map((chatpost: any) => (
            <Chatpost
              chatpost={chatpost}
              key={chatpost.chatpostId}
              isDefault={true}
            />
          ))}
        </div>
      ) : (
        <>
          <FolderUnit folderData={folder} />
          {folder.chatposts.map((chatpost: any) => (
            <Chatpost
              chatpost={chatpost}
              key={chatpost.chatpostId}
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
