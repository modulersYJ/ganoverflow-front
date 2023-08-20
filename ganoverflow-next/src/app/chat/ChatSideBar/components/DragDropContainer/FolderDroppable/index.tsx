import React from "react";
import { useRecoilState, useSetRecoilState } from "recoil";

import { IFolderWithPostsDTO } from "@/interfaces/chat";
import { isFolderSpreadState } from "@/atoms/folder";
import {
  GetHandleLoadThisChat,
  folderStyleProvider,
  GetToggleFolderSpreadHandler,
  useFolderDrop,
} from "./handlers";
import ChatpostDraggable from "./components/ChatpostDraggable";

import CustomFolder from "./components/CustomFolder";
import {
  chatPairsState,
  chatSavedStatusState,
  loadChatStatusState,
  questionInputState,
} from "@/atoms/chat";

const FolderDroppable: React.FC<{
  curFolder: IFolderWithPostsDTO;
  idx: number;
}> = ({ curFolder, idx }) => {
  const { canDrop, isOver, drop } = useFolderDrop(curFolder);
  const isActive = canDrop && isOver;

  const [foldersSpread, setFoldersSpread] = useRecoilState<{
    [key: string]: boolean;
  }>(isFolderSpreadState);
  const isFolderSpread = foldersSpread[curFolder.folderId] || false;

  const setLoadChatStatus = useSetRecoilState(loadChatStatusState);
  const setChatPairs = useSetRecoilState(chatPairsState);
  const setChatSavedStatus = useSetRecoilState(chatSavedStatusState);
  const setQuestionInput = useSetRecoilState(questionInputState);

  const onClickToggleFolderSpread = GetToggleFolderSpreadHandler(
    curFolder,
    setFoldersSpread
  );
  const onClickLoadThisChat = GetHandleLoadThisChat(
    setLoadChatStatus,
    setChatPairs,
    setChatSavedStatus,
    setQuestionInput
  );

  return (
    <div ref={drop} style={folderStyleProvider(isActive)} data-testid="folder">
      {idx === 0 ? (
        // 1. 무소속(Folder idx = 0) Posts
        <div className="min-h-[20px]">
          {curFolder.chatposts.map((chatpost) => (
            <ChatpostDraggable
              curChatpost={chatpost}
              curFolderId={curFolder.folderId}
              key={`${chatpost.chatPostId}:${chatpost.chatpostName}`}
              isDefault={true}
              loadThisChatHandler={onClickLoadThisChat}
            />
          ))}
        </div>
      ) : (
        // 2. 폴더 & 소속된 Posts
        <div>
          <CustomFolder
            curFolder={curFolder}
            isFolderSpread={isFolderSpread}
            onClickToggleFolderSpread={onClickToggleFolderSpread}
          />
          {isFolderSpread && (
            <>
              {curFolder.chatposts.map((chatpost) => (
                <ChatpostDraggable
                  curChatpost={chatpost}
                  curFolderId={curFolder.folderId}
                  key={`${chatpost.chatPostId}:${chatpost.chatpostName}`}
                  isDefault={false}
                  loadThisChatHandler={onClickLoadThisChat}
                />
              ))}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default FolderDroppable;
