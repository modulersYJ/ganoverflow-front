import { IPostHeaderProps } from "@/interfaces/IProps/posts";
import { parseDate } from "@/utils/parseDate";

export const PostDetailMain = ({ postData }: any) => {
  // TODO: any를 IChatPost 수정해서 넣어주기!
  return (
    <div className="grid">
      <article className="post-detail-main w-10/12 place-self-center">
        <PostHeader
          chatpostName={postData?.chatpostName}
          nickname={postData?.userId?.nickname}
          createdAt={postData?.createdAt}
          viewCount={postData?.viewCount}
          commentCount={postData?.comments?.length}
        />
        <PostChatPair pairs={postData?.chatPair} />
      </article>
    </div>
  );
};

const PostHeader: React.FC<IPostHeaderProps> = ({
  chatpostName,
  nickname,
  createdAt,
  viewCount,
  commentCount,
}) => {
  return (
    <div className="post-chatpostName-box w-full border border-x-0 border-green-500 border-t-4 py-5 flex flex-col">
      <h2 className="post-chatpostName tw-subtitle text-start px-3 text-3xl text py-3">
        {chatpostName}
      </h2>
      <div className="post-userdate-box flex flex-row justify-between">
        <div className="w-full flex flex-row">
          <div className="post-user px-3 border border-0 border-r-2">
            {nickname}
          </div>
          <div className="post-date px-3">{parseDate(createdAt)}</div>
        </div>
        <div className="post-stats w-1/3 space-x-2">
          <span>조회수 {viewCount}</span>
          <span>댓글 {commentCount}</span>
        </div>
      </div>
    </div>
  );
};

const PostChatPair = ({ pairs }: any) => {
  // Todo: any 바꿔주기!
  return (
    <div className="post-chat-box min-h-[500px]">
      {pairs
        .sort(({ pairOne, pairTwo }: any) => pairOne?.order - pairTwo?.order)
        .map((pair: any, idx: number) => (
          <div
            key={idx}
            className={`w-full py-5 ${
              idx % 2 === 0
                ? "bg-gray-300 dark:bg-[#2c2c33]"
                : "bg-gray-200 dark:bg-[#202024]" // 홀짝 배경색 변경
            } flex flex-col`}
          >
            <div className="chatPairContainer h-full flex flex-col items-center w-full py-1">
              <div
                className={`msgBox p-5 max-w-sm text-xs ${"bg-primary text-white self-end rounded-chat-question"} inline-block max-w-lg`}
              >
                {pair.question}
              </div>
            </div>
            <div className="chatPairContainer h-full flex flex-col items-center w-full">
              <div
                className={`overflow-auto max-w-full rounded-chat-answer bg-gray-500 p-5 ${" text-white self-start"}  max-w-lg`}
              >
                {pair.answer}
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};
