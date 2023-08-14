import { memo } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { Folder } from "./Folder";
import {
  foldersWithChatpostsState,
  isFolderUpdatedState,
} from "@/atoms/folder";
import React from "react";
import { accessTokenState } from "@/atoms/jwt";
import { getSessionStorageItem } from "@/utils/common/sessionStorage";
import useDidMountEffect from "@/hooks/useDidMountEffect";
import { putFoldersByUser } from "../../api/chat";
import { IFolderWithPostsDTO, TLoadThisChatHandler } from "@/interfaces/chat";

export const Container = memo(
  ({ loadThisChatHandler }: { loadThisChatHandler: TLoadThisChatHandler }) => {
    const [foldersData, setFoldersData] = useRecoilState<IFolderWithPostsDTO[]>(
      foldersWithChatpostsState
    );
    const [isFolderUpdated, setIsFolderUpdated] =
      useRecoilState<boolean>(isFolderUpdatedState);

    const accessToken = useRecoilValue(accessTokenState);
    const userData = getSessionStorageItem("userData");

    // 첫 마운트 무시 커스텀 훅
    useDidMountEffect(() => {
      const updateFolders = async () => {
        // folder 변경사항(폴더 추가, 제거, 포스트 소속 이동) 서버로 PUT
        const updatedFoldersWithPosts = await putFoldersByUser(
          userData?.id,
          foldersData,
          {
            accessToken,
            userId: userData?.id,
          }
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
      <div>
        <div
          className=" clear-both flex flex-col "
          style={{
            overflow: "hidden",
            clear: "both",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {foldersData?.map((folder: IFolderWithPostsDTO, idx: number) => (
            <Folder
              curFolder={folder}
              key={folder.folderId}
              idx={idx}
              loadThisChatHandler={loadThisChatHandler}
            />
          ))}
        </div>
      </div>
    );
  }
);

Container.displayName = "Container";
