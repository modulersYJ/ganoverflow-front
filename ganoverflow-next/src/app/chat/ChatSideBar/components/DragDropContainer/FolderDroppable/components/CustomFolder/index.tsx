import React, { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { IFolderWithPostsDTO } from "@/interfaces/chat";
import { foldersWithChatpostsState } from "@/atoms/folder";
import TitleEdit from "@/components/ui/Chat/TitleEdit";
import FolderIcon from "@mui/icons-material/Folder";
import Box from "@mui/material/Box";
import {
  getDeleteFolderHandler,
  getModifyFolderNameHandler,
  getToggleDeleteBtnShowHandler,
} from "./handlers";
import {
  DeleteFolderButtons,
  FolderUtilityButtons,
  TFolderBtnProps,
} from "./components";
import { getSessionStorageItem } from "@/utils/common/sessionStorage";

const CustomFolder: React.FC<{
  curFolder: IFolderWithPostsDTO;
  isFolderSpread: boolean;
  onClickToggleFolderSpread: any;
}> = ({ curFolder, isFolderSpread, onClickToggleFolderSpread }) => {
  const [isDeleteFolderClicked, setIsDeleteFolderClicked] =
    useState<boolean>(false);
  const [folderName, setFolderName] = useState<string>(curFolder.folderName);
  const [foldersWithPosts, setFoldersWithPosts] = useRecoilState<
    IFolderWithPostsDTO[]
  >(foldersWithChatpostsState);

  const SxIcon = {
    fontSize: "16px",
    color: "gray",
    transition: "color 0.2s ease",
    "&:hover": {
      color: "white",
    },
  };

  const BtnProps: TFolderBtnProps = {
    onClickToggleDeleteBtnShow: getToggleDeleteBtnShowHandler(
      setIsDeleteFolderClicked
    ),
    setIsDeleteFolderClicked,
    isDeleteFolderClicked,
    setFoldersWithPosts,
    foldersWithPosts,
    onClickDeleteFolder: getDeleteFolderHandler({
      userId: getSessionStorageItem("userData").id,
      curFolderId: curFolder.folderId,
      setFoldersWithPosts,
    }),
    curFolder,
    SxConfirmIcons: SxIcon,
    onClickToggleFolderSpread: onClickToggleFolderSpread,
    isFolderSpread,
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
            onSave={getModifyFolderNameHandler(
              setFolderName,
              setFoldersWithPosts,
              curFolder
            )}
          />
          {isDeleteFolderClicked ? (
            <DeleteFolderButtons {...BtnProps} />
          ) : (
            <FolderUtilityButtons {...BtnProps} />
          )}
        </div>
      </Box>
    </div>
  );
};

export default CustomFolder;
