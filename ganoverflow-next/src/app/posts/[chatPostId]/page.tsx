import { getOneChatPost } from "../api/chatposts";
import { CommentBox } from "./components/comments";
import { LikeBox } from "./components/likes";
import { PostDetailMain } from "./components/postDetailMain";

export default async function PostDetailPage({
  params,
}: {
  params: { chatPostId: string };
}) {
  const chatPostId = params.chatPostId;

  const postData = await getOneChatPost(chatPostId); // todo: 해당 함수 반환값 인터페이스 정의
  console.log("pd ", postData?.category?.categoryName);

  return (
    <div className="grid w-full">
      <article className="post-detail-main w-5/6 md:w-full place-self-center my-4">
        <PostDetailMain postData={postData} />
        <LikeBox chatPostId={chatPostId} />
        <CommentBox chatPostId={chatPostId} comments={postData?.comments} />
      </article>
    </div>
  );
}
