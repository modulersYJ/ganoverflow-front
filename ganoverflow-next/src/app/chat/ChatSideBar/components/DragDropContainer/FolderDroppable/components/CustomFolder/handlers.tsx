import { IFolderWithPostsDTO } from "@/interfaces/chat";
import { Dispatch, SetStateAction } from "react";
import { SetterOrUpdater } from "recoil";

/* FolderUnit을 위한 핸들러 프로바이더 */
export const getModifyFolderNameHandler =
  (
    setFolderName: Dispatch<SetStateAction<string>>,
    setFoldersWithPosts: SetterOrUpdater<IFolderWithPostsDTO[]>,
    curFolder: IFolderWithPostsDTO
  ) =>
  (newName: string) => {
    setFolderName(newName);
    setFoldersWithPosts((prev) =>
      prev.map((folder) =>
        folder.folderId === curFolder.folderId
          ? { ...folder, folderName: newName }
          : folder
      )
    );
  };

export const getToggleDeleteBtnShowHandler =
  (setIsDeleteFolderClicked: Dispatch<SetStateAction<boolean>>) => () => {
    setIsDeleteFolderClicked((prev) => !prev);
  };

export const getDeleteFolderHandler =
  (
    setFoldersWithPosts: SetterOrUpdater<IFolderWithPostsDTO[]>,
    curFolder: IFolderWithPostsDTO
  ) =>
  () => {
    setFoldersWithPosts((prev) =>
      prev.filter((folder) => folder.folderId !== curFolder.folderId)
    );
  };
