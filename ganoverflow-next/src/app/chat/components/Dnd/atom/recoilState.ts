import { DefaultValue, atom, selector } from "recoil";

interface IFolderWithPostsDTO {
  folderId: number;
  folderName: string;
  order: number;
  userId: string;
  chatposts: IChatPostWithFolder[];
}

interface IChatPostWithFolder {
  chatpostId: string;
  chatpostName: string;
  order: number;
  userId: string;
  folderId: number;
}

const initialFoldersWithChatposts: any = [
  {
    folderId: 0,
    folderName: "Folder 0",
    order: 0,
    userId: "user1",
    chatposts: [
      {
        chatpostId: "chatpost5",
        chatpostName: "kimchi",
        order: 1,
        userId: "user1",
        folderId: 0,
      },
      {
        chatpostId: "chatpost6",
        chatpostName: "gamza",
        order: 2,
        userId: "user1",
        folderId: 0,
      },
    ],
  },

  {
    folderId: 1,
    folderName: "Folder 1",
    order: 1,
    userId: "user1",
    chatposts: [
      {
        chatpostId: "chatpost1",
        chatpostName: "Glass",
        order: 1,
        userId: "user1",
        folderId: 1,
      },
      {
        chatpostId: "chatpost2",
        chatpostName: "Paper",
        order: 2,
        userId: "user1",
        folderId: 1,
      },
    ],
  },
  {
    folderId: 2,
    folderName: "Folder 2",
    order: 2,
    userId: "user1",
    chatposts: [
      {
        chatpostId: "chatpost3",
        chatpostName: "Banana",
        order: 1,
        userId: "user1",
        folderId: 2,
      },
    ],
  },
];

export const foldersWithChatpostsState = atom({
  key: "foldersWithChatpostsState",
  default: initialFoldersWithChatposts,
});

// 'chatpostWithFolderstate'는 Recoil selector로, 이는 상태를 변환하는 데 사용
// 이 selector는 'foldersWithChatpostsState' atom을 가져와
// 모든 폴더의 모든 chatpost를 시리얼라이즈하여 하나의 배열로 반환합니다.
export const chatpostWithFolderstate = selector({
  key: "chatpostWithFolderstate",
  get: ({ get }) => {
    const folderWithChatposts = get(foldersWithChatpostsState);
    return folderWithChatposts.flatMap((folder: any) =>
      folder.chatposts.map((chatpost: IChatPostWithFolder) => ({
        ...chatpost,
        folderId: folder.folderId,
      }))
    );
  },
  set: ({ set, get }, newchatpost) => {
    if (
      typeof newchatpost.chatpostId !== "string" ||
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
                  chatpost.chatpostId !== newchatpost.chatpostId
              ),
              newchatpost,
            ],
          };
        } else {
          return {
            ...folder,
            chatposts: folder.chatposts.filter(
              (chatpost: IChatPostWithFolder) =>
                chatpost.chatpostId !== newchatpost.chatpostId
            ),
          };
        }
      })
    );
  },
});
