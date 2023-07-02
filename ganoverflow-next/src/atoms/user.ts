import { atom } from "recoil";
import { getLocalStorageItem } from "@/app/utils/common/localStorage";

export const userState = atom({
  key: "userState",
  default: null,
});
