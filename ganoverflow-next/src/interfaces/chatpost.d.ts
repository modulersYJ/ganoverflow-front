import { IChatPair } from "./chat";

interface IComment {
  commentId: number;
  chatpostId: string;
  userId: string;
  userLikes: User[];
  content: string;
  createdAt: Date;
  delYn: string;
}

interface IChatPost {
  chatPostId: string;
  chatpostName: string;
  userId: string;
  categoryName?: string | null;
  createdAt: Date;
  delYn: "Y" | "N";
  chatPair?: IChatPair[] | null;
}
