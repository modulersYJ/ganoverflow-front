"use client";

import { getSessionStorageItem } from "@/utils/common/sessionStorage";
import { getStars, postStar } from "@/app/posts/api/chatposts";
import { useAuthDataHook } from "@/hooks/jwtHooks/getNewAccessToken";
import { useState, useEffect } from "react";

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

    const res = await postStar({
      chatPostId: chatPostId,
      authData: await authData,
      value: value,
    });
    if (res.status === 201) {
      setStarCount(res.data.count);
      setUserDidLike(value);
    }
  };

  return (
    <>
      <div className="flex justify-center my-6">
        <div className="post-likes w-1/2 h-32 flex justify-center items-center border">
          <button
            name="up"
            className={`border rounded-lg p-2 mx-8 h-12 hover:bg-slate-500 ${
              userDidLike === 1 ? "text-5xl" : ""
            }`}
            onClick={(e) => handleLike(e)}
          >
            따봉
          </button>
          <div>
            <span>따봉수</span>
            <span>{starCount}</span>
          </div>
          <button
            name="down"
            className={`border rounded-lg p-2 mx-8 h-12 hover:bg-slate-500 ${
              userDidLike === -1 ? "text-5xl" : ""
            }`}
            onClick={(e) => handleLike(e)}
          >
            붐따
          </button>
        </div>
      </div>
    </>
  );
};
