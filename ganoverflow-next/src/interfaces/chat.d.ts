export type ChatSavedStatus = "F" | "ING" | "T";

export interface IChat {
  prompt: string;
}

export interface IChatPair {
  question: string;
  answer: string;
  isChecked: boolean;
}

export interface IChatPostSendDTO {
  chatpostName: string | undefined;
  chatPair: IChatPair[];
  category?: string;
}

// extend IChatPostSendDTO
export interface IChatPostPutDTO extends IChatPostSendDTO {
  folderId: number | undfined;
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

export type TLoadThisChatHandler = (
  chatPairs: IChatPair[],
  folderId: number | undefined
) => void;
