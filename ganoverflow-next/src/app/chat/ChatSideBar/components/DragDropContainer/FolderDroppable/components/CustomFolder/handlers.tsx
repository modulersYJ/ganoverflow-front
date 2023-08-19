import { IAuthData } from "@/app/api/jwt";
import { deleteChatpostsByFolder } from "@/app/chat/api/chat";
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
  ({
    authData,
    curFolderId,
    setFoldersWithPosts,
  }: {
    authData: IAuthData;
    curFolderId: IFolderWithPostsDTO["folderId"];
    setFoldersWithPosts: SetterOrUpdater<IFolderWithPostsDTO[]>;
  }) =>
  async () => {
    const updatedFolder = await deleteChatpostsByFolder({
      authData,
      folderId: curFolderId,
    });
    setFoldersWithPosts(updatedFolder);
  };
