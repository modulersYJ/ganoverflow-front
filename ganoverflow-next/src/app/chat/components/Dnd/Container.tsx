import { memo, useEffect } from "react";
import { useRecoilState } from "recoil";
import { Folder } from "./Folder";
import { foldersWithChatpostsState } from "./atom/recoilState";
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
  }, [folders]); // folders 상태가 변경될 때마다 콘솔에 출력

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
        {[...folders]
          .sort((a, b) => (a.order === 0 ? 1 : b.order === 0 ? -1 : 0))
          .map((folder: any) => (
            <Folder folder={folder} key={folder.folderId} />
          ))}
      </div>
    </div>
  );
});

// const FolderUnit: React.FC<{ folderData: any }> = ({ folderData }) => {
//   return (
//     <div className="w-[calc(100%-8px)] mx-[4px] my-[1px] px-1 bg-emerald-400 text-black border-gray-900 border py-1 hover:bg-slate-400 ">
//       <div className="flex flex-row pb-1">
//         <div className="w-2/12">
//           <FolderIcon sx={{ fontSize: "19px" }} />
//         </div>
//         <div className="w-8/12 px-1 pt-[4px] text-left text-sm">
//           {folderData.folderName}
//         </div>
//       </div>
//     </div>
//   );
// };
