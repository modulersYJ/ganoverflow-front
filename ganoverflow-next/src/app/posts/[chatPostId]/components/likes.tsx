"use client";

import { getSessionStorageItem } from "@/utils/common/sessionStorage";
import { getStars, postStar } from "@/app/posts/api/chatposts";
import { useAuthDataHook } from "@/hooks/jwtHooks/getNewAccessToken";
import { useState, useEffect } from "react";
import Error from "next/error";

export const LikeBox = ({ chatPostId }: { chatPostId: string }) => {
  const userData = getSessionStorageItem("userData");
  const authData = useAuthDataHook();

  const [starCount, setStarCount] = useState(0);
  const [userDidLike, setUserDidLike] = useState<number>(0);

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
    // TODO 로그인 안돼있으면 에러처리 (alert)
    if (
      !(await authData) ||
      (await authData).accessToken === "토큰 갱신에 실패했습니다."
    ) {
      alert("로그인을 해주세요");
      return;
    }

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

    try {
      const res = await postStar({
        chatPostId: chatPostId,
        authData: await authData,
        value: value,
      });
      if (res.status === 201) {
        setStarCount(res.data.count);
        setUserDidLike(value);
      }
    } catch (e: any) {
      console.log(e);
      if (e?.response?.status === 401) {
        alert("로그인이 필요합니다");
      }
    }
  };

  return (
    <>
      <div className="flex justify-center my-6">
        <div className="post-likes w-full h-32 flex justify-center items-center rounded bg-slate-400">
          <button
            name="up"
            className={`rounded-lg p-2 mx-8 h-12 bg-slate-300 hover:bg-slate-50`}
            onClickCapture={handleLike}
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
            onClick={(e) => handleLike(e)}
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
      </div>
    </>
  );
};
