import { useRecoilState } from "recoil";
import { IFolderWithPostsDTO } from "@/interfaces/chat";
import { foldersWithChatpostsState } from "@/atoms/folder";
import { useSignedCheck } from "@/hooks/jwtHooks/useSignedCheck";

export const GetHandleNewFolderBtn = () => {
  const [foldersData, setFoldersData] = useRecoilState<IFolderWithPostsDTO[]>(
    foldersWithChatpostsState
  );
  const checkUserSigned = useSignedCheck();

  return () => {
    if (!checkUserSigned()) return;

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
};
