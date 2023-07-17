export type ChatSavedStatus = "F" | "ING" | "T";

export interface IChat {
  prompt: string;
}

export interface IChatPair {
  question: string;
  answer: string;
  isUser: boolean;
  isChecked: boolean;
}

export interface IChatPostSendDTO {
  chatpostName: string;
  chatPair: IChatPair[];
  category?: string;
}

interface IFolderWithPostsDTO {
  folderId: number;
  folderName: string;
  chatposts: IChatPostWithFolder[];
}

export interface IChatPostWithFolder {
  chatPostId: number;
  chatpostName: string;
}

export interface ISerailzedChatposts {
  chatPostId: number;
  chatpostName: string;
  folderId: number;
  folderName: string;
}
