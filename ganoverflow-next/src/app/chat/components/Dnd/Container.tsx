import { memo, useEffect } from "react";
import { useRecoilState } from "recoil";
import { Folder } from "./Folder";
import { foldersWithChatpostsState } from "@/atoms/folder";
import React from "react";

export const Container = memo(() => {
  const [folders]: any = useRecoilState(foldersWithChatpostsState);

  useEffect(() => {
    folders.map((folder: any) => {
      console.log(`========${folder.folderName}=======`);
      folder.chatposts.map((chatpost: any) => {
        console.log(`${chatpost.chatpostName}`, chatpost);
      });
      console.log("===========================\n\n");
    });
  }, [folders]);

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
        {/* {[...folders]
          .sort((a, b) => (a.order === 0 ? 1 : b.order === 0 ? -1 : 0))
          .map((folder: any) => (
            <Folder folder={folder} key={folder.folderId} />
          ))} */}
        {folders.map((folder: any) => (
          <Folder folder={folder} key={folder.folderId} />
        ))}
      </div>
    </div>
  );
});
