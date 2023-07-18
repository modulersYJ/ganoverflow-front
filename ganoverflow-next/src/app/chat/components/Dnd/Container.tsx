import { memo } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { Folder } from "./Folder";
import {
  chatpostWithFolderstate,
  foldersWithChatpostsState,
  isFolderUpdatedState,
} from "@/atoms/folder";
import React from "react";
import { accessTokenState } from "@/atoms/jwt";
import { getSessionStorageItem } from "@/utils/common/sessionStorage";
import useDidMountEffect from "@/hooks/useDidMountEffect";
import { putFoldersByUser } from "../../api/chat";
import { restructFoldersWithPosts } from "@/utils/folders";
import { IFolderWithPostsDTO } from "@/interfaces/chat";

export const Container = memo(() => {
  const [foldersData, setFoldersData] = useRecoilState<IFolderWithPostsDTO[]>(
    foldersWithChatpostsState
  );
  const [isFolderUpdated, setIsFolderUpdated] =
    useRecoilState<boolean>(isFolderUpdatedState);

  const foldersWithPosts = useRecoilValue(chatpostWithFolderstate);

  const accessToken = useRecoilValue(accessTokenState);
  const userData = getSessionStorageItem("userData");

  // 첫 마운트 무시 커스텀 훅
  useDidMountEffect(() => {
    const updateFolders = async () => {
      // folder 변경사항(폴더 추가, 제거, 포스트 소속 이동) 서버로 PUT
      const updatedFoldersWithPosts = await putFoldersByUser(
        userData.id,
        restructFoldersWithPosts(foldersWithPosts),
        {
          accessToken,
          userId: userData.id,
        }
      );

      setFoldersData(updatedFoldersWithPosts); // 데이터 정합성을 위한 folder state update
    };

    if (isFolderUpdated) {
      setIsFolderUpdated(false);
      return;
    }

    console.log("useDidMount!!!!");
    updateFolders();
    setIsFolderUpdated(true);
  }, [foldersWithPosts]);

  return (
    <div>
      <div
        style={{
          overflow: "hidden",
          clear: "both",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {foldersData.map((folder: any, idx: number) => (
          <Folder folder={folder} key={folder.folderId} idx={idx} />
        ))}
      </div>
    </div>
  );
});
