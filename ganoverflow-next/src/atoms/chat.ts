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
