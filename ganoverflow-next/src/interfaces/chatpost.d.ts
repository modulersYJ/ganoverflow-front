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
  title: string;
  userId: string;
  categoryName?: string | null ;
  createdAt: Date;
  delYn: "Y" | "N";
  folder?: Folder | null;
  chatPair?: IChatPair[] | null;
}
