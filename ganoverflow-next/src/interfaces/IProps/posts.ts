import { IChatPair } from "../chat";
import { IChatPost } from "../chatpost";

export interface IPostHeaderProps {
  chatpostName?: IChatPost["chatpostName"];
  nickname: string;
  createdAt: string;
  viewCount: number;
  commentCount: number;
}

export interface IPostChatPairProps {
  // 작성 및 활용 필요
}
