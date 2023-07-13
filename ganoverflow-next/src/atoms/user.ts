import { atom } from "recoil";
import { getSessionStorageItem } from "@/app/utils/common/sessionStorage";

export const userState = atom({
  key: "userState",
  default: null,
});
