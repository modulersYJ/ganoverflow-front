import {
  ChatSavedStatus,
  IChatPair,
  IFolderWithPostsDTO,
  TLoadThisChatHandler,
} from "@/interfaces/chat";

import { useDrop } from "react-dnd";
import { SetterOrUpdater } from "recoil";

// DND Droppable 훅
export const useFolderDrop = (curFolder: IFolderWithPostsDTO) => {
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: "chatpost",
    drop: () => ({ name: curFolder.folderName, folderId: curFolder.folderId }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  return { canDrop, isOver, drop };
};

export const folderStyleProvider = (isActive: boolean) => {
  const backgroundColor = isActive ? "#444" : "black";
  const folderStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column" as "column",
    padding: "0.5rem",
    paddingTop: "0.1rem",
    paddingBottom: "0.1rem",
    backgroundColor,
  };

  return folderStyle;
};

export const GetToggleFolderSpreadHandler =
  (
    curFolder: IFolderWithPostsDTO,
    setFoldersSpread: SetterOrUpdater<{ [key: string]: boolean }>
  ) =>
  () => {
    setFoldersSpread((prev) => ({
      ...prev,
      [curFolder.folderId]: !prev[curFolder.folderId],
    }));
  };

export const GetHandleLoadThisChat = (
  setLoadChatStatus: SetterOrUpdater<any>,
  setChatPairs: SetterOrUpdater<IChatPair[]>,
  setChatSavedStatus: SetterOrUpdater<ChatSavedStatus>,
  setQuestionInput: SetterOrUpdater<string>
): TLoadThisChatHandler => {
  return (
    chatPairs: IChatPair[],
    folderId: IFolderWithPostsDTO["folderId"] | undefined
  ) => {
    setLoadChatStatus((prevStatus: any) => ({
      ...prevStatus,
      loadedMeta: {
        folderId: folderId,
        chatPostId: prevStatus.loadedMeta?.chatPostId,
        title: prevStatus.loadedMeta?.title,
        category: prevStatus.loadedMeta?.category,
        tags: prevStatus.loadedMeta?.tags,
      },
    }));
    setChatPairs(chatPairs as IChatPair[]);
    setChatSavedStatus("T");
    setQuestionInput("");
  };
};
