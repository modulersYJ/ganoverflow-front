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
    return folderWithChatposts.flatMap((folder: IFolderWithPostsDTO) =>
      folder.chatposts.map((chatpost: IChatPostWithFolder) => ({
        ...chatpost,
        folderId: folder.folderId,
      }))
    );
  },
  set: ({ set, get }, newchatpost: any) => {
    if (
      typeof newchatpost.chatPostId !== "number" ||
      typeof newchatpost.folderId !== "number"
    ) {
      throw new Error("Invalid chatpost");
    }
    const Folders = get(foldersWithChatpostsState);
    set(
      foldersWithChatpostsState,
      Folders.map((folder: any) => {
        if (folder.folderId === newchatpost.folderId) {
          return {
            ...folder,
            chatposts: [
              ...folder.chatposts.filter(
                (chatpost: any) =>
                  chatpost.chatPostId !== newchatpost.chatPostId
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
      })
    );
  },
});
