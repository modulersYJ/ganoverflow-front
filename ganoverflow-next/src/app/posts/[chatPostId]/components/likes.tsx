"use client";

import { getSessionStorageItem } from "@/utils/common/sessionStorage";
import { getStars, postStar } from "@/app/posts/api/chatposts";
import { useState, useEffect } from "react";
import Error from "next/error";
import { usePathname } from "next/navigation";
import { useSignedCheck } from "@/hooks/useSignedCheck";
import { styleTransitionColor } from "../../layout";

export const LikeBox = ({ chatPostId }: { chatPostId: string }) => {
  const checkUserSigned = useSignedCheck();

  const userData = getSessionStorageItem("userData");

  const [starCount, setStarCount] = useState(0);
  const [userDidLike, setUserDidLike] = useState<number>(0);

  const [isShareBoxOpen, setIsShareBoxOpen] = useState<boolean>(false);

  // ^ stars fetch (GET) : 처음에 한번
  useEffect(() => {
    getStars(chatPostId).then((res) => {
      setStarCount(res.count);
      const filteredStar = res.stars.filter(
        (star: { user: { id: string }; value: number }) =>
          star?.user?.id === userData?.id
      );
      setUserDidLike(filteredStar.length === 0 ? 0 : filteredStar[0].value);
    });
  }, []);

  const handleLike = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!checkUserSigned()) return;

    let value = 0;

    const { name } = e.target as HTMLButtonElement;
    // ! 한번도 안눌렀거나 따봉 / 붐따 취소해서 userDidLiked가 0인 경우
    if (userDidLike === 0) {
      if (name === "up") {
        value = 1;
      } else if (name === "down") {
        value = -1;
      }
    } else {
      // ! 따봉 / 붐따를 기존에 누른 경우
      // ^ 같은 버튼 두번 누르면 취소
      if (
        (name === "up" && userDidLike === 1) ||
        (name === "down" && userDidLike === -1)
      ) {
        value = 0;
        // ^ 붐따 후 따봉
      } else if (name === "up") {
        value = 1;
        // ^ 따봉 후 붐따
      } else if (name === "down") {
        value = -1;
      }
    }

    const res = await postStar({
      chatPostId: chatPostId,
      value: value,
    });
    if (res.status === 201) {
      setStarCount(res.data.count);
      setUserDidLike(value);
    } else {
      console.log("등록 실패: ", res);
    }
  };

  return (
    <>
      <div className="post-likes w-full h-32 flex flex-col justify-center rounded bg-slate-400 my-6">
        <div className="flex justify-center items-center">
          <button
            name="up"
            className={`rounded-lg p-2 mx-8 h-12 bg-slate-300 hover:bg-slate-50 ${styleTransitionColor}`}
            onClick={handleLike}
          >
            {userDidLike === 1 ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="1em"
                viewBox="0 0 512 512"
                style={{
                  fill: "rgb(18 215 97)",
                  width: "25px",
                  height: "25px",
                  fontSize: "2rem",
                  pointerEvents: "none",
                }}
              >
                <path d="M313.4 32.9c26 5.2 42.9 30.5 37.7 56.5l-2.3 11.4c-5.3 26.7-15.1 52.1-28.8 75.2H464c26.5 0 48 21.5 48 48c0 18.5-10.5 34.6-25.9 42.6C497 275.4 504 288.9 504 304c0 23.4-16.8 42.9-38.9 47.1c4.4 7.3 6.9 15.8 6.9 24.9c0 21.3-13.9 39.4-33.1 45.6c.7 3.3 1.1 6.8 1.1 10.4c0 26.5-21.5 48-48 48H294.5c-19 0-37.5-5.6-53.3-16.1l-38.5-25.7C176 420.4 160 390.4 160 358.3V320 272 247.1c0-29.2 13.3-56.7 36-75l7.4-5.9c26.5-21.2 44.6-51 51.2-84.2l2.3-11.4c5.2-26 30.5-42.9 56.5-37.7zM32 192H96c17.7 0 32 14.3 32 32V448c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32V224c0-17.7 14.3-32 32-32z" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="1em"
                viewBox="0 0 512 512"
                style={{
                  fill: "gray",
                  width: "25px",
                  height: "25px",
                  fontSize: "2rem",
                  pointerEvents: "none",
                }}
              >
                <path d="M313.4 32.9c26 5.2 42.9 30.5 37.7 56.5l-2.3 11.4c-5.3 26.7-15.1 52.1-28.8 75.2H464c26.5 0 48 21.5 48 48c0 18.5-10.5 34.6-25.9 42.6C497 275.4 504 288.9 504 304c0 23.4-16.8 42.9-38.9 47.1c4.4 7.3 6.9 15.8 6.9 24.9c0 21.3-13.9 39.4-33.1 45.6c.7 3.3 1.1 6.8 1.1 10.4c0 26.5-21.5 48-48 48H294.5c-19 0-37.5-5.6-53.3-16.1l-38.5-25.7C176 420.4 160 390.4 160 358.3V320 272 247.1c0-29.2 13.3-56.7 36-75l7.4-5.9c26.5-21.2 44.6-51 51.2-84.2l2.3-11.4c5.2-26 30.5-42.9 56.5-37.7zM32 192H96c17.7 0 32 14.3 32 32V448c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32V224c0-17.7 14.3-32 32-32z" />
              </svg>
            )}
          </button>
          <div>
            <span>{starCount}</span> &nbsp;
            <span>likes</span>
          </div>
          <button
            name="down"
            className={`bg-slate-300 rounded-lg p-2 mx-8 h-12 hover:bg-slate-50`}
            onClick={handleLike}
          >
            {userDidLike === -1 ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="1em"
                viewBox="0 0 512 512"
                style={{
                  fill: "rgb(18 215 97)",
                  width: "25px",
                  height: "25px",
                  fontSize: "2rem",
                  pointerEvents: "none",
                }}
              >
                <path d="M313.4 479.1c26-5.2 42.9-30.5 37.7-56.5l-2.3-11.4c-5.3-26.7-15.1-52.1-28.8-75.2H464c26.5 0 48-21.5 48-48c0-18.5-10.5-34.6-25.9-42.6C497 236.6 504 223.1 504 208c0-23.4-16.8-42.9-38.9-47.1c4.4-7.3 6.9-15.8 6.9-24.9c0-21.3-13.9-39.4-33.1-45.6c.7-3.3 1.1-6.8 1.1-10.4c0-26.5-21.5-48-48-48H294.5c-19 0-37.5 5.6-53.3 16.1L202.7 73.8C176 91.6 160 121.6 160 153.7V192v48 24.9c0 29.2 13.3 56.7 36 75l7.4 5.9c26.5 21.2 44.6 51 51.2 84.2l2.3 11.4c5.2 26 30.5 42.9 56.5 37.7zM32 384H96c17.7 0 32-14.3 32-32V128c0-17.7-14.3-32-32-32H32C14.3 96 0 110.3 0 128V352c0 17.7 14.3 32 32 32z" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="1em"
                viewBox="0 0 512 512"
                style={{
                  fill: "gray",
                  width: "25px",
                  height: "25px",
                  fontSize: "2rem",
                  pointerEvents: "none",
                }}
              >
                <path d="M313.4 479.1c26-5.2 42.9-30.5 37.7-56.5l-2.3-11.4c-5.3-26.7-15.1-52.1-28.8-75.2H464c26.5 0 48-21.5 48-48c0-18.5-10.5-34.6-25.9-42.6C497 236.6 504 223.1 504 208c0-23.4-16.8-42.9-38.9-47.1c4.4-7.3 6.9-15.8 6.9-24.9c0-21.3-13.9-39.4-33.1-45.6c.7-3.3 1.1-6.8 1.1-10.4c0-26.5-21.5-48-48-48H294.5c-19 0-37.5 5.6-53.3 16.1L202.7 73.8C176 91.6 160 121.6 160 153.7V192v48 24.9c0 29.2 13.3 56.7 36 75l7.4 5.9c26.5 21.2 44.6 51 51.2 84.2l2.3 11.4c5.2 26 30.5 42.9 56.5 37.7zM32 384H96c17.7 0 32-14.3 32-32V128c0-17.7-14.3-32-32-32H32C14.3 96 0 110.3 0 128V352c0 17.7 14.3 32 32 32z" />
              </svg>
            )}
          </button>
        </div>
        <div className="likes-share pt-2">
          <button
            className="share-button text-white"
            onClick={() => setIsShareBoxOpen(!isShareBoxOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="2em"
              viewBox="0 0 576 512"
              fill="rgb(200,200,200)"
            >
              <path d="M352 224H305.5c-45 0-81.5 36.5-81.5 81.5c0 22.3 10.3 34.3 19.2 40.5c6.8 4.7 12.8 12 12.8 20.3c0 9.8-8 17.8-17.8 17.8h-2.5c-2.4 0-4.8-.4-7.1-1.4C210.8 374.8 128 333.4 128 240c0-79.5 64.5-144 144-144h80V34.7C352 15.5 367.5 0 386.7 0c8.6 0 16.8 3.2 23.2 8.9L548.1 133.3c7.6 6.8 11.9 16.5 11.9 26.7s-4.3 19.9-11.9 26.7l-139 125.1c-5.9 5.3-13.5 8.2-21.4 8.2H384c-17.7 0-32-14.3-32-32V224zM80 96c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16H400c8.8 0 16-7.2 16-16V384c0-17.7 14.3-32 32-32s32 14.3 32 32v48c0 44.2-35.8 80-80 80H80c-44.2 0-80-35.8-80-80V112C0 67.8 35.8 32 80 32h48c17.7 0 32 14.3 32 32s-14.3 32-32 32H80z" />
            </svg>
            공유
          </button>
        </div>
        {isShareBoxOpen === true ? (
          <ShareBox setIsShareBoxOpen={setIsShareBoxOpen} />
        ) : (
          ""
        )}
      </div>
    </>
  );
};

const ShareBox = ({
  setIsShareBoxOpen,
}: {
  setIsShareBoxOpen: (prev: boolean) => void;
}) => {
  const url = usePathname();

  const handleCopyClipBoard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      alert("클립보드에 링크가 복사되었습니다.");
    } catch (e) {
      alert("복사에 실패하였습니다");
    }
  };

  return (
    <div className="absolute left-1/4 bottom-1/4 z-10  border-2 border-primary">
      <div className="flex flex-row w-full justify-between bg-primary p-2">
        <h3 className="text-white text-xl">공유하기</h3>
        <button
          className="dark:text-black"
          onClick={() => setIsShareBoxOpen(false)}
        >
          X
        </button>
      </div>
      <div className="p-2">
        <div className="flex flex-row ">
          <div className="w-80 text-start border border-gray-200 px-2 bg-gray-400 text-gray-100 py-1">
            https://ganoverflow.com{url}
          </div>
          <button
            className="border border-gray-200 hover:bg-secondary hover:text-white px-2 py-1"
            onClick={() => handleCopyClipBoard(`https://ganoverflow.com${url}`)}
          >
            URL 복사
          </button>
        </div>
      </div>
    </div>
  );
};
