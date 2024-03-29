import { ChatSavedStatus, IChatPair } from "@/interfaces/chat";
import { atom } from "recoil";

export enum TLoadChatStatus {
  F = "F",
  SHOWING = "SHOWING",
  UPDATING = "UPDATING",
}

type TLoadedMeta = {
  folderId: number | undefined;
  chatPostId: string | undefined;
  title: string | undefined;
  category: string | undefined;
  tags: Array<string> | undefined;
};

type LoadChatStatusStateType = {
  status: TLoadChatStatus;
  loadedMeta?: TLoadedMeta;
};

export const loadChatStatusState = atom<LoadChatStatusStateType>({
  key: "loadedChatStatusState",
  default: {
    status: TLoadChatStatus.F,
    loadedMeta: undefined,
  },
});

/* Chat - Sidebar 공유 상태 */
// ChatSavedStatus 상태
export const chatSavedStatusState = atom<ChatSavedStatus>({
  key: "chatSavedStatusState",
  default: "F",
});

export const chatPairsState = atom<IChatPair[]>({
  key: "chatPairsState",
  default: [],
});

export const checkCntState = atom<number>({
  key: "checkCntState",
  default: 0,
});

export const questionInputState = atom<string>({
  key: "questionInputState",
  default: "",
});
