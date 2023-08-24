import { memo } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import FolderDroppable from "./FolderDroppable";
import {
  foldersWithChatpostsState,
  isFolderUpdatedState,
} from "@/atoms/folder";
import React from "react";
import { getSessionStorageItem } from "@/utils/common/sessionStorage";
import useDidMountEffect from "@/hooks/useDidMountEffect";
import { putFoldersByUser } from "@/app/chat/api/chat";
import { IFolderWithPostsDTO } from "@/interfaces/chat";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const DragDropContainer = memo(() => {
  const userData = getSessionStorageItem("userData");

  const [foldersData, setFoldersData] = useRecoilState<IFolderWithPostsDTO[]>(
    foldersWithChatpostsState
  );
  const [isFolderUpdated, setIsFolderUpdated] =
    useRecoilState<boolean>(isFolderUpdatedState);

  // 첫 마운트 무시 커스텀 훅
  useDidMountEffect(() => {
    const updateFolders = async () => {
      // folder 변경사항(폴더 추가, 제거, 포스트 소속 이동) 서버로 PUT
      const updatedFoldersWithPosts = await putFoldersByUser(
        userData?.id,
        foldersData,
      );
      console.log(updatedFoldersWithPosts);
      setFoldersData(updatedFoldersWithPosts); // 데이터 정합성을 위한 folder state update
    };

    if (isFolderUpdated) {
      setIsFolderUpdated(false);
      return;
    }
    updateFolders();
    setIsFolderUpdated(true);
  }, [foldersData]);

  return (
    <div className="list-container overflow-y-auto h-screen pb-[200px]">
      <DndProvider backend={HTML5Backend}>
        <div className="clear-both flex flex-col">
          {Array.isArray(foldersData) &&
            foldersData.map((folder: IFolderWithPostsDTO, idx: number) => (
              <FolderDroppable
                curFolder={folder}
                key={folder.folderId}
                idx={idx}
              />
            ))}
        </div>
      </DndProvider>
    </div>
  );
});

DragDropContainer.displayName = "DragDropContainer";

export default DragDropContainer;
