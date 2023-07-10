import { atom } from "recoil";
import { IChat, IChatPair } from "@/interfaces/chat";

export type ChatSavedStatus = "F" | "ING" | "T";

export const isNowAnsweringState = atom({
  key: "isNowAnsweringState",
  default: false,
});

export const chatSavedStatusState = atom({
  key: "chatSavedStatusState",
  default: "F" as ChatSavedStatus,
});

export const questionInputState = atom({
  key: "qustionInputState",
  default: "",
});

export const chatPairsState = atom({
  key: "chatPairsState",
  default: [] as IChatPair[],
});

export const checkCntState = atom({
  key: "checkCntState",
  default: 0,
});

export const formDataState = atom({
  key: "formDataState",
  default: {
    prompt: "",
  } as IChat,
});
