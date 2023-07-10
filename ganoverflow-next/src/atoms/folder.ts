import { IFolderWithPostsDTO } from "@/interfaces/chat";
import { atom } from "recoil";

export const foldersWithPostsState = atom({
  key: "foldersWithPostsState",
  default: [] as IFolderWithPostsDTO[],
});
