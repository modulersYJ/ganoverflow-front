import { styleTransitionColor } from "@/app/posts/layout";
import { formatTimeDifference } from "@/utils/parseDate";
import Image from "next/image";
import Link from "next/link";

const RankPostDashboard = ({
  post,
  index,
}: {
  post: DummyHotThread;
  index: number;
}) => {
  const colorValue = (index + 1) * 200;
  let RankH1Color = "";
  if (index === 0) {
    RankH1Color = "!text-zinc-200";
  } else if (index === 1) {
    RankH1Color = "!text-zinc-400";
  } else if (index === 2) {
    RankH1Color = "!text-zinc-500";
  }

  return (
    <Link href={`/posts/${post.chatpost.chatPostId}`}>
      <div
        className={`post-container flex flex-row justify-evenly w-full gap-5 hover:bg-zinc-700 ${styleTransitionColor} rounded-lg px-3 py-3`}
      >
        <h1 className={`${RankH1Color} !text-4xl sm:!text-6xl`}>{index + 1}</h1>
        <div className="w-full flex flex-col justify-evenly gap-1 mt-1">
          <p className="tw-subtitle !text-sm !font-normal sm:!font-bold sm:!text-[1rem] text-left">
            {post.chatpost.chatpostName}
          </p>
          <div className="post-meta flex flex-row items-center justify-start gap-4">
            <div className="flex flex-row items-center gap-2">
              <Image
                className="rounded-full mt-1"
                alt={post.chatpost.user.nickname}
                width={24}
                height={24}
                src={post.chatpost.user.imgUrl}
              />
              <span className="user-nickname text-zinc-400 !font-light sm:!font-normal">
                {post.chatpost.user.nickname}
              </span>
            </div>

            <span className="post-category text-zinc-600 !text-xs !font-normal">
              {post.chatpost.categoryCategoryName}
            </span>
            <div className="h-[55%] w-[1px] bg-zinc-600" />
            <span className="post-date text-zinc-600 !text-xs !font-normal">
              {formatTimeDifference(post.chatpost.createdAt, "ko-KR")}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RankPostDashboard;

export interface DummyUser {
  userId: string;
  nickname: string;
  imgUrl: string;
}

export interface DummyChatPost {
  chatPostId: string;
  chatpostName: string;
  categoryCategoryName: string;
  createdAt: string;
  user: DummyUser;
}

export interface DummyHotThread {
  chatpost: DummyChatPost;
}

export const HOT_THREAD_DUMMY: DummyHotThread[] = [
  {
    chatpost: {
      chatPostId: "231",
      chatpostName: "GANoverflow는 무슨 서비스인가?",
      categoryCategoryName: "아이디어",
      createdAt: "2023-08-25 20:10:37.266",
      user: {
        userId: "71426810-3982-47de-a500-48476a663b7c",
        nickname: "수평",
        imgUrl:
          "https://ebizcap.s3.ap-northeast-2.amazonaws.com/ganoverflow_user_profile/user_red.svg",
      },
    },
  },
  {
    chatpost: {
      chatPostId: "261",
      chatpostName: "2013 수능 영어 35번",
      categoryCategoryName: "번역",
      createdAt: "2023-09-02 12:40:11.374",
      user: {
        userId: "74c4fb64-0bf4-45a1-81e5-9096a1738416",
        nickname: "수능영어개시름",
        imgUrl:
          "https://ebizcap.s3.ap-northeast-2.amazonaws.com/ganoverflow_user_profile/user_yellow.svg",
      },
    },
  },
  {
    chatpost: {
      chatPostId: "193",
      chatpostName: "Say Cutely 시스템 명령 적용 모드",
      categoryCategoryName: "아이디어",
      createdAt: "2023-08-19 19:14:17.229",
      user: {
        userId: "02c160e4-d2f9-476c-9eaa-0bebc21f63cf",
        nickname: "test",
        imgUrl:
          "https://ebizcap.s3.ap-northeast-2.amazonaws.com/ganoverflow_user_profile/user_primary.svg",
      },
    },
  },
];

export const DAILY_PROMPT_GUIDE: DummyHotThread[] = [
  {
    chatpost: {
      chatPostId: "N",
      chatpostName: "프롬프트로 엑셀 더 잘하는 방법",
      categoryCategoryName: "오피스 생산성",
      createdAt: "2023-09-03 20:10:37.266",
      user: {
        userId: "N",
        nickname: "엑셀 전도사",
        imgUrl:
          "https://ebizcap.s3.ap-northeast-2.amazonaws.com/ganoverflow_user_profile/user_white.svg",
      },
    },
  },
  {
    chatpost: {
      chatPostId: "N",
      chatpostName: "블로그 하시나요? GPT와 함께하세요",
      categoryCategoryName: "오피스 생산성",
      createdAt: "2023-09-03 12:40:11.374",
      user: {
        userId: "N",
        nickname: "블로그로 쌀먹",
        imgUrl:
          "https://ebizcap.s3.ap-northeast-2.amazonaws.com/ganoverflow_user_profile/user_blue.svg",
      },
    },
  },
  {
    chatpost: {
      chatPostId: "N",
      chatpostName: "이젠 GPT로 빠르게 MVP 가설검증 하세요",
      categoryCategoryName: "프로그래밍",
      createdAt: "2023-09-2 19:14:17.229",
      user: {
        userId: "N",
        nickname: "노코드가 미래다",
        imgUrl:
          "https://ebizcap.s3.ap-northeast-2.amazonaws.com/ganoverflow_user_profile/user_yellow.svg",
      },
    },
  },
];
