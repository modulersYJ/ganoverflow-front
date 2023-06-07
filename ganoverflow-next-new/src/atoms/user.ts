import { atom } from "recoil";

export interface INickname {
  nickname: string;
}

export const userState = atom<INickname | null>({
  key: "userState",
  default: null,
});
