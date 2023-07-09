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
  title: string;
  chatPair: IChatPair[];
}

interface IFolderWithPostsDTO {
  folderId: number;
  folderName: string;
  order: number;
  userId: string;
  chatposts: IChatPostWithFolder[];
}

interface IChatPostWithFolder {
  chatPostId: string;
  title: string;
  order: number;
  userId: string;
  folder: number;
}
