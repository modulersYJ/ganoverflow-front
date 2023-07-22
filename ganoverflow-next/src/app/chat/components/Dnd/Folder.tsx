import { useDrop } from "react-dnd";
import { Chatpost } from "./Chatpost";
import React, { useState } from "react";
import FolderIcon from "@mui/icons-material/Folder";
import { IFolderWithPostsDTO, TLoadThisChatHandler } from "@/interfaces/chat";
import { useRecoilState } from "recoil";
import { foldersWithChatpostsState, isFolderSpreadState } from "@/atoms/folder";

import Box from "@mui/material/Box";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ArrowSpreadIcon from "@mui/icons-material/ArrowDropDown";
import ArrowFoldIcon from "@mui/icons-material/ArrowLeft";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import TitleEdit from "@/components/ui/Chat/TitleEdit";

const style: React.CSSProperties = {
  padding: "0.5rem",
  paddingTop: "0.1rem",
  paddingBottom: "0.1rem",
};

export const Folder = ({
  curFolder,
  idx,
  loadThisChatHandler,
}: {
  curFolder: IFolderWithPostsDTO;
  idx: number;
  loadThisChatHandler: TLoadThisChatHandler;
}) => {
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: "chatpost",
    drop: () => ({ name: curFolder.folderName, folderId: curFolder.folderId }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  const isActive = canDrop && isOver;
  const backgroundColor = isActive ? "#444" : "black";

  const [foldersSpreadState, setFoldersSpreadState] = useRecoilState<{
    [key: string]: boolean;
  }>(isFolderSpreadState);
  const isFolderSpread = foldersSpreadState[curFolder.folderId] || false;

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
      {idx === 0 ? (
        <div className="min-h-[20px]">
          {curFolder.chatposts.map((chatpost) => (
            <Chatpost
              curChatpost={chatpost}
              curFolderId={curFolder.folderId}
              key={chatpost.chatPostId}
              isDefault={true}
              loadThisChatHandler={loadThisChatHandler}
            />
          ))}
        </div>
      ) : (
        <>
          <FolderUnit curFolder={curFolder} />
          {isFolderSpread &&
            curFolder.chatposts.map((chatpost) => (
              <Chatpost
                curChatpost={chatpost}
                curFolderId={curFolder.folderId}
                key={chatpost.chatPostId}
                isDefault={false}
                loadThisChatHandler={loadThisChatHandler}
              />
            ))}
        </>
      )}
    </div>
  );
};

const FolderUnit: React.FC<{ curFolder: IFolderWithPostsDTO }> = ({
  curFolder,
}) => {
  const [foldersWithPosts, setFoldersWithPosts] = useRecoilState<
    IFolderWithPostsDTO[]
  >(foldersWithChatpostsState);
  const [isDeleteFolderClicked, setIsDeleteFolderClicked] =
    useState<boolean>(false);
  const [foldersSpreadState, setFoldersSpreadState] = useRecoilState<{
    [key: string]: boolean;
  }>(isFolderSpreadState);
  const isFolderSpread = foldersSpreadState[curFolder.folderId] || false;

  const [folderName, setFolderName] = useState<string>(curFolder.folderName);

  const handleSaveFolderName = (newName: string) => {
    setFolderName(newName);
    setFoldersWithPosts(
      foldersWithPosts.map((folder) =>
        folder.folderId === curFolder.folderId
          ? {
              ...folder,
              folderName: newName,
            }
          : folder
      )
    );
  };

  const toggleFolderSpread = () => {
    setFoldersSpreadState((prev) => ({
      ...prev,
      [curFolder.folderId]: !isFolderSpread,
    }));
  };

  const toggleDeleteBtns = () => {
    setIsDeleteFolderClicked(!isDeleteFolderClicked);
  };

  const deleteFolder = () => {
    setFoldersWithPosts(
      foldersWithPosts.filter(
        (folder) => folder.folderId !== curFolder.folderId
      )
    );
  };

  const DeleteFolderConfirmIcons = (): JSX.Element => {
    return (
      <>
        <button className="w-2/12" onClick={deleteFolder}>
          <CheckIcon className="func-icons" sx={SxConfirmIcons} />
        </button>
        <button className="w-2/12" onClick={toggleDeleteBtns}>
          <CloseIcon className="func-icons" sx={SxConfirmIcons} />
        </button>
      </>
    );
  };

  const FuncFolderIcons = (): JSX.Element => {
    return (
      <>
        <button className="w-2/12" onClick={toggleDeleteBtns}>
          <DeleteOutlineIcon className="func-icons" sx={SxFuncIcons} />
        </button>
        <button className="w-2/12" onClick={toggleFolderSpread}>
          {isFolderSpread ? (
            <ArrowSpreadIcon className="func-icons" sx={SxConfirmIcons} />
          ) : (
            <ArrowFoldIcon className="func-icons" sx={SxConfirmIcons} />
          )}
        </button>
      </>
    );
  };

  const SxFuncIcons = {
    fontSize: "14px",
    color: "gray",
    opacity: "0",
    transition: `opacity 0.2s ease, color 0.2s ease`,
    "&:hover": {
      color: "white",
    },
  };

  const SxConfirmIcons = {
    fontSize: "16px",
    color: "gray",
    transition: "color 0.2s ease",
    "&:hover": {
      color: "white",
    },
  };

  return (
    <div className="w-[calc(100%-8px)] mx-[4px] my-[1px] px-1 text-white py-1">
      <Box sx={{ "&:hover": { "& .func-icons": { opacity: "1" } } }}>
        <div className="flex flex-row pb-1">
          <div className="w-2/12">
            <FolderIcon sx={{ fontSize: "19px" }} />
          </div>

          <TitleEdit
            initialName={curFolder.folderName}
            onSave={handleSaveFolderName}
          />

          {isDeleteFolderClicked
            ? DeleteFolderConfirmIcons()
            : FuncFolderIcons()}
        </div>
      </Box>
    </div>
  );
};
