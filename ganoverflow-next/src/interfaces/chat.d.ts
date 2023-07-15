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
}

interface IFolderWithPostsDTO {
  folderId: number;
  folderName: string;
  order: number;
  userId: string;
  chatposts: IChatPostWithFolder[] | [];
}

export interface IChatPostWithFolder {
  chatPostId: number;
  chatpostName: string;
  order: number;
  folderId: number;
}
