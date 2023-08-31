import {
  ChatPairWrapper,
  MarkdownWrapper,
  MsgBox,
} from "@/app/chat/ChatMain/components/ChatContent/components";
import { IPostHeaderProps } from "@/interfaces/IProps/posts";
import { IChatPair } from "@/interfaces/chat";
import { parseDateYMDWithLocale } from "@/utils/parseDate";

export const PostDetailMain = ({ postData }: any) => {
  // TODO: any를 IChatPost 수정해서 넣어주기!
  return (
    <div className="grid">
      <article className="post-detail-main w-full place-self-center">
        <PostHeader
          chatpostName={postData?.chatpostName}
          nickname={postData?.user?.nickname}
          createdAt={postData?.createdAt}
          viewCount={postData?.viewCount}
          commentCount={postData?.comments?.length}
          category={postData?.category?.categoryName}
        />
        <PostChatPair chatPairs={postData?.chatPair} />
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
  category,
}) => {
  return (
    <div className="post-chatpostName-box border-[1px] border-x-0 border-zinc-600 py-5 flex flex-row justify-between">
      <div className="w-3/12 post-user-category-box flex flex-row justify-between">
        <div className="post-stats flex flex-row gap-2 justify-start items-end text-gray-700 dark:text-gray-500 text-xs font-light">
          <span className="text-left">{nickname}</span>

          <span className="text-left">{category ?? "카테고리"}</span>
        </div>
      </div>

      <div className="w-6/12">
        <h2 className="post-title-date-box tw-subtitle text-center px-3 text-3xl text py-3">
          {chatpostName}
        </h2>
        <div className="post-date px-3 font-oswald">
          {parseDateYMDWithLocale(createdAt)}
        </div>
      </div>

      <div className="post-stats-box w-3/12 flex flex-col justify-end text-gray-700 dark:text-gray-500 text-xs font-light">
        <span className="text-right">댓글 {commentCount}</span>
        <span className="text-right">조회수 {viewCount}</span>
      </div>
    </div>
  );
};

const PostChatPair = ({ chatPairs }: { chatPairs: IChatPair[] }) => {
  // Todo: any 바꿔주기!
  return (
    <div className="post-chat-box min-h-[500px]">
      {chatPairs.map((chatPair: IChatPair, idx: number) => (
        <ChatPairWrapper
          key={`${idx}:${chatPair.question}`}
          index={idx}
          isChatPage={false}
        >
          <div className="chatPairBox w-full flex flex-col justify-center self-center">
            {chatPair.question && (
              <MsgBox isQuestion={true}>{chatPair.question}</MsgBox>
            )}

            {chatPair.answer && (
              <MsgBox isQuestion={false}>
                <MarkdownWrapper>{chatPair.answer}</MarkdownWrapper>
              </MsgBox>
            )}
          </div>
        </ChatPairWrapper>
      ))}
    </div>
  );
};
