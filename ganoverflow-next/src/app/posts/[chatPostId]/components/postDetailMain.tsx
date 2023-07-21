import {
  IPostHeaderProps,
} from "@/interfaces/IProps/posts";
import { parseDate } from "@/utils/parseDate";

export const PostDetailMain = ({ postData }: any) => {
  // TODO: any를 IChatPost 수정해서 넣어주기!
  return (
    <div className="grid">
      <article className="post-detail-main w-3/5 place-self-center">
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
      <h2 className="post-chatpostName text-start px-3 text-3xl text">
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
        .sort(({ pairOne, pairTwo }: any) => pairOne.order - pairTwo.order)
        .map((pair: any, idx: number) => (
          <div key={idx}>
            <div>
              <div>Q</div>
              <div>{pair.question}</div>
            </div>
            <div>
              <div>A</div>
              <div>{pair.answer}</div>
            </div>
          </div>
        ))}
    </div>
  );
};
