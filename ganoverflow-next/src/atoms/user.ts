import { atom } from "recoil";
import { getSessionStorageItem } from "@/utils/common/sessionStorage";

export const userState = atom({
  key: "userState",
  default: null,
});
