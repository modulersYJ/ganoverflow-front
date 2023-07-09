"use client";
import { useParams } from "next/navigation";
import { getOneChatPost } from "../api/chatposts";
import { CommentBox } from "./comments";

export default async function PostDetailPage() {
  const params = useParams();
  const chatPostId = params.chatPostId;

  const postData = await getOneChatPost(chatPostId);
  console.log(postData);
  return (
    <div className="grid">
      <article className="post-detail-main w-3/5 place-self-center">
        <div className="post-title-box w-full border border-x-0 border-green-500 border-t-4 py-5 flex flex-col">
          <h2 className="post-title text-start px-3 text-3xl text">
            {postData?.title}
          </h2>
          <div className="post-userdate-box flex flex-row">
            <div className="post-user px-3 border border-0 border-r-2">
              {postData?.userId?.nickname}
            </div>
            <div className="post-date px-3">{`${postData?.createdAt.slice(
              0,
              10
            )} ${postData?.createdAt.slice(11, 19)}`}</div>
          </div>
        </div>
        <div className="post-chat-box min-h-[500px]">
          {postData?.chatPair
            ?.sort(
              (pairOne: any, pairTwo: any) => pairOne.order - pairTwo.order
            )
            .map((pair: any, idx: number) => {
              return (
                <div key={idx}>
                  <div>
                    <div>Q</div>
                    <div>{pair?.question}</div>
                  </div>
                  <div>
                    <div>A</div>
                    <div>{pair?.answer}</div>
                  </div>
                </div>
              );
            })}
        </div>
        <CommentBox chatPostId={chatPostId} comments={postData?.comments} />
      </article>
    </div>
  );
}
