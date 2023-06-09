import { getOneChatPost } from "../api/chatposts";
import { CommentBox } from "./comments";

export default async function PostDetailPage({
  params,
}: {
  params: { chatPostId: string };
}) {
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
          <div className="post-userdate-box flex flex-row justify-between">
            <div className="w-full flex flex-row">
              <div className="post-user px-3 border border-0 border-r-2">
                {postData?.userId?.nickname}
              </div>
              <div className="post-date px-3">{`${postData?.createdAt.slice(
                0,
                10
              )} ${postData?.createdAt.slice(11, 19)}`}</div>
            </div>
            <div className="post-stats w-1/3 space-x-2">
              <span>따봉 {postData?.likes}</span>
              <span>조회수 {postData?.viewCount}</span>
              <span>댓글 {postData?.comments.length}</span>
            </div>
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
        <div className="flex justify-center my-6">
          <div className="post-likes w-1/2 h-32 flex justify-center items-center border">
            <button className="border rounded-lg p-2 mx-8 h-12 hover:bg-slate-500">
              따봉
            </button>
            <button className="border rounded-lg p-2 mx-8 h-12 hover:bg-slate-500">
              붐따
            </button>
          </div>
        </div>
        <CommentBox chatPostId={chatPostId} comments={postData?.comments} />
      </article>
    </div>
  );
}
