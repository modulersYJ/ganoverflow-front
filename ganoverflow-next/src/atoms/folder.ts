import { serializePostsWithFolderId } from "@/utils/folders";
import { IChatPostWithFolder, IFolderWithPostsDTO } from "@/interfaces/chat";
import { atom, selector } from "recoil";

export const isFolderSpreadState = atom({
  key: "isFolderSpreadState",
  default: {},
});

export const foldersWithChatpostsState = atom({
  key: "foldersWithChatpostsState",
  default: [] as IFolderWithPostsDTO[],
});

export const isFolderUpdatedState = atom({
  key: "isFolderUpdatedState",
  default: false,
});

// 'chatpostWithFolderstate'는 foldersWithChatpostsState의 상태를 참고 및 변경하는 역할 수행 / state로는 평면화된 chatpost 배열이 저장됨
// !!! "만에 하나" chatpostsWithFolderstate의 get을 사용한다면(즉, serialize를 평가한다면), 폴더에서 모든 포스트가 빠질 경우, 폴더가 삭제되는 문제가 발생할 수 있음
export const chatpostsWithFolderstate = selector({
  key: "chatpostWithFolderstate",
  get: ({ get }) => {
    const folderWithChatposts = get(foldersWithChatpostsState);
    // 구조화된 FolderWithPostsDTO 배열을 시리얼라이즈 (in)
    console.log("get - folderWithChatposts ", folderWithChatposts);
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

    // foldersWithChatpostsState의 폴더 상태 업데이트
    set(foldersWithChatpostsState, newFoldersState);
  },
});
