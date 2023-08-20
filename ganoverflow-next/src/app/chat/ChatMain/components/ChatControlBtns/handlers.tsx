import { TLoadChatStatus } from "@/atoms/chat";
import { ChatSavedStatus, IChatPair } from "@/interfaces/chat";
import { SetterOrUpdater } from "recoil";

export const GetHandleSaveChatpostInit = (
  isNowAnswering: boolean,
  setChatSavedStatus: SetterOrUpdater<ChatSavedStatus>
) => {
  return async (e: React.MouseEvent) => {
    if (isNowAnswering) {
      alert("답변중에는 저장할 수 없습니다!");
      return false;
    }
    setChatSavedStatus("ING");
    return true;
  };
};

export const GetHandleContinueChat = (
  loadChatStatus: any,
  chatPairs: SetterOrUpdater<IChatPair[]>,
  setLoadChatStatus: SetterOrUpdater<any>,
  setCheckCnt: SetterOrUpdater<number>,
  setChatSavedStatus: SetterOrUpdater<ChatSavedStatus>,
  setQuestionInput: SetterOrUpdater<string>
) => {
  return () => {
    setLoadChatStatus({
      status: TLoadChatStatus.UPDATING,
      loadedMeta: {
        folderId: loadChatStatus.loadedMeta?.folderId,
        chatPostId: loadChatStatus.loadedMeta?.chatPostId,
        title: loadChatStatus.loadedMeta?.title,
        category: loadChatStatus.loadedMeta?.category,
      },
    });
    setCheckCnt(chatPairs.length);
    setChatSavedStatus("F");
    setQuestionInput("");
  };
};
