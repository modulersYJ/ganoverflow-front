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
  chatposts: IChatPostBasicInfo[];
}

export interface IChatPostBasicInfo {
  chatPostId: string;
  chatpostName: string;
}

export interface ISerailzedChatposts {
  chatPostId: string;
  chatpostName: string;
  folderId: number;
  folderName: string;
}
