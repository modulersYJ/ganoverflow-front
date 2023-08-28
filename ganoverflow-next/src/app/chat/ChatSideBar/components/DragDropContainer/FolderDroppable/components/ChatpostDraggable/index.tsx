import React, { useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";

import {
  chatpostsWithFolderstate,
  foldersWithChatpostsState,
} from "@/atoms/folder";
import {
  IChatPair,
  IChatPostBasicInfo,
  IFolderWithPostsDTO,
  TLoadThisChatHandler,
} from "@/interfaces/chat";
import { getSessionStorageItem } from "@/utils/common/sessionStorage";

import useDidMountEffect from "@/hooks/useDidMountEffect";
import { loadChatStatusState } from "@/atoms/chat";

import {
  getHandleDeleteChatpost,
  getHandleUpdateChatpostName,
  getHandleLoadThisPost,
  useChatpostDrag,
} from "./handlers";

import TitleEdit from "@/components/ui/Chat/TitleEdit";
import Box from "@mui/material/Box";
import ChatIcon from "@mui/icons-material/Chat";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

interface IChatpostDraggableProps {
  curChatpost: IChatPostBasicInfo;
  curFolderId: IFolderWithPostsDTO["folderId"];
  isDefault: boolean;
  loadThisChatHandler: TLoadThisChatHandler;
}

const ChatpostDraggable: React.FC<IChatpostDraggableProps> = ({
  curChatpost,
  isDefault,
  curFolderId,
  loadThisChatHandler,
}) => {
  const [chatpostName, setChatpostName] = useState<string>(
    curChatpost.chatpostName
  );
  const [loadedChatPairs, setLoadedChatPairs] = useState<IChatPair[]>([]);

  const [foldersWithPosts, setFoldersWithPosts] = useRecoilState(
    foldersWithChatpostsState
  );
  const setFoldersWithPostsByDnd = useSetRecoilState(chatpostsWithFolderstate);
  const setLoadChatStatus = useSetRecoilState(loadChatStatusState);

  const { isDragging, drag } = useChatpostDrag(
    setFoldersWithPostsByDnd,
    curChatpost,
    curFolderId
  );

  const handleUpdatePostName = getHandleUpdateChatpostName({
    chatpost: curChatpost,
    folderId: curFolderId,
    userId: getSessionStorageItem("userData").id,
    setName: setChatpostName,
    setFolders: setFoldersWithPosts,
  });
  const onClickDeleteChatpostBtn = getHandleDeleteChatpost({
    curChatpost,
    setFolders: setFoldersWithPosts,
  });
  const onClickLoadThisPost = getHandleLoadThisPost(
    curChatpost,
    setLoadChatStatus,
    setLoadedChatPairs
  );

  // 클릭된 해당 포스트의 채팅을 로드
  useDidMountEffect(() => {
    loadThisChatHandler(
      loadedChatPairs?.map((chatPair) => {
        return {
          question: chatPair.question,
          answer: chatPair.answer,
          isChecked: true,
        };
      }),
      curFolderId
    );
  }, [loadedChatPairs]);

  const opacity = isDragging ? 0.4 : 1;
  return (
    <div ref={drag} style={{ opacity }} data-testid={`chatpost`}>
      <div
        className={`postUnit w-[calc(100%-8px)] cursor-move float-left mx-[4px] my-[1px] px-1 text-gray-200 py-1 hover:bg-slate-600  ${
          isDefault ? "pl-1" : "pl-5"
        } cursor-pointer
		opacity-[${opacity}]
		`}
        style={{ opacity }}
      >
        <Box
          sx={{
            "&:hover": {
              cursor: "pointer",
              "& .deleteIcon": {
                opacity: "1",
              },
            },
          }}
        >
          <div onClick={onClickLoadThisPost} className="flex flex-row pb-1">
            <div className="w-2/12 text-white pt-[2px]">
              <ChatIcon sx={{ fontSize: "15px" }} />
            </div>
            <div className="w-full">
              <TitleEdit
                initialName={curChatpost.chatpostName}
                onSave={handleUpdatePostName}
              />
            </div>
            <button className="w-2/12 z-10" onClick={onClickDeleteChatpostBtn}>
              <DeleteOutlineIcon
                className="deleteIcon"
                sx={{
                  fontSize: "14px",
                  color: "white",
                  opacity: "0",
                  transition: "opacity 0.2s ease",
                }}
              />
            </button>
          </div>
        </Box>
      </div>
    </div>
  );
};

export default ChatpostDraggable;
