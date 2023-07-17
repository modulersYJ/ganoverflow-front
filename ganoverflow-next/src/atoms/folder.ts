import { serializePostsWithFolderId } from "@/utils/folders";
import { IChatPostWithFolder, IFolderWithPostsDTO } from "@/interfaces/chat";
import { atom, selector } from "recoil";

export const foldersWithChatpostsState = atom({
  key: "foldersWithChatpostsState",
  default: [] as IFolderWithPostsDTO[],
});

// 'chatpostWithFolderstate'는 Recoil selector로, 이는 상태를 변환하는 데 사용
// 이 selector는 'foldersWithChatpostsState' atom을 가져와
// 모든 폴더의 모든 chatpost를 시리얼라이즈하여 하나의 배열로 반환
export const chatpostWithFolderstate = selector({
  key: "chatpostWithFolderstate",
  get: ({ get }) => {
    const folderWithChatposts = get(foldersWithChatpostsState);
    // 구조화된 FolderWithPostsDTO 배열을 시리얼라이즈 (in)
    return serializePostsWithFolderId(folderWithChatposts);
  },
  set: ({ set, get }, newchatpost: any) => {
    if (
      typeof newchatpost.chatPostId !== "number" ||
      typeof newchatpost.folderId !== "number"
    ) {
      throw new Error("Invalid chatpost");
    }
    const Folders = get(foldersWithChatpostsState);

    // 새 폴더 상태 생성
    const newFoldersState = Folders.map((folder: any) => {
      if (folder.folderId === newchatpost.folderId) {
        return {
          ...folder,
          chatposts: [
            ...folder.chatposts.filter(
              (chatpost: any) => chatpost.chatPostId !== newchatpost.chatPostId
            ),
            newchatpost,
          ],
        };
      } else {
        return {
          ...folder,
          chatposts: folder.chatposts.filter(
            (chatpost: IChatPostWithFolder) =>
              chatpost.chatPostId !== newchatpost.chatPostId
          ),
        };
      }
    });

    // 폴더 상태 업데이트
    set(foldersWithChatpostsState, newFoldersState);
  },
});
