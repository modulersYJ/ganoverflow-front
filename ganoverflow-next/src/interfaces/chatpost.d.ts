import { IChatPair } from "./chat";

interface IComment {
  commentId: number;
  chatpostId: string;
  userId: string;
  userLikes: User[];
  content: string;
  createdAt: string;
  delYn: string;
}


interface IChatPost {
  chatPostId: string;
  chatpostName: string;
  userId: string;
  categoryName?: string | null;
  createdAt: string;
  delYn: "Y" | "N";
  chatPair?: IChatPair[] | null;
  viewCount: number;
  comments: IComment[];
  // stars: Star[]; 
}

// Star 엔티티를 정확히 모르겠어서 비워두겠습니다! 이거 완성되면 posts쪽에 하나씩 연결하면 좋을것 같아요
// interface IStar {
//   starId: string;
//   userid: string;
// }
