import { memo } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { Folder } from "./Folder";
import {
  chatpostWithFolderstate,
  foldersWithChatpostsState,
} from "@/atoms/folder";
import React from "react";
import { accessTokenState } from "@/atoms/jwt";
import { getSessionStorageItem } from "@/utils/common/sessionStorage";
import useDidMountEffect from "@/hooks/useDidMountEffect";
import { putFoldersByUser } from "../../api/chat";
import { restructFoldersWithPosts } from "@/utils/folders";

export const Container = memo(() => {
  const [folders]: any = useRecoilState(foldersWithChatpostsState);

  const foldersWithPosts = useRecoilValue(chatpostWithFolderstate);

  const accessToken = useRecoilValue(accessTokenState);
  const userData = getSessionStorageItem("userData");

  // 첫 마운트 무시 커스텀 훅
  useDidMountEffect(() => {
    putFoldersByUser(userData.id, restructFoldersWithPosts(foldersWithPosts), {
      accessToken,
      userId: userData.id,
    });
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
        {folders.map((folder: any, idx: number) => (
          <Folder folder={folder} key={folder.folderId} idx={idx} />
        ))}
      </div>
    </div>
  );
});
