import { atom } from "recoil";

export enum TIsSigned {
  unknown = "unknown",
  F = "F",
  T = "T",
}

export const isSignedState = atom<TIsSigned>({
  key: "isSignedState",
  default: TIsSigned.unknown,
});
