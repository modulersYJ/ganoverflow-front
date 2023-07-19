import {
  IChatPostWithFolder,
  IFolderWithPostsDTO,
  ISerailzedChatposts,
} from "@/interfaces/chat";

export function serializePostsWithFolderId(
  foldersWithChatposts: IFolderWithPostsDTO[]
) {
  if (!foldersWithChatposts || foldersWithChatposts.length === 0) {
    console.log("util / serializePostsWithFolderId - length 0 or undefined");
    return [];
  }

  const serializedChatpostsWithFolder = foldersWithChatposts.flatMap(
    (folder: IFolderWithPostsDTO): ISerailzedChatposts[] =>
      folder.chatposts.map((chatpost: IChatPostWithFolder) => ({
        ...chatpost,
        folderId: folder.folderId,
        folderName: folder.folderName,
      }))
  );
  console.log(
    "serializePostsWithFolderId - serialized chatposts: ",
    serializedChatpostsWithFolder
  );

  return serializedChatpostsWithFolder;
}

// 시리얼라이즈된 serilizedChatposts배열을 재구조화 (out)
export function restructFoldersWithPosts(
  data: ISerailzedChatposts[]
): IFolderWithPostsDTO[] {
  const folderMap = new Map<number, IFolderWithPostsDTO>();

  for (const item of data) {
    const existingFolder = folderMap.get(item.folderId);
    const chatPost: IChatPostWithFolder = {
      chatPostId: item.chatPostId,
      chatpostName: item.chatpostName,
    };

    if (existingFolder) {
      existingFolder.chatposts.push(chatPost);
    } else {
      folderMap.set(item.folderId, {
        folderId: item.folderId,
        folderName: item.folderName,
        chatposts: [chatPost],
      });
    }
  }

  return Array.from(folderMap.values());
}
