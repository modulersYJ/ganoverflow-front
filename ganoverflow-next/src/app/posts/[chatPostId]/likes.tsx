"use client";

import { getLocalStorageItem } from "@/app/utils/common/localStorage";
import { postStar } from "../api/chatposts";
import { useAuthDataHook } from "@/app/utils/jwtHooks/getNewAccessToken";
import { useRouter } from "next/navigation";

export const LikeBox = ({
  stars,
  chatPostId,
}: {
  stars: { starId: number; value: number; user: { id: string } }[];
  chatPostId: string;
}) => {
  const userData = getLocalStorageItem("userData");
  const authData = useAuthDataHook();

  const router = useRouter();

  const handleLike = async (e: React.MouseEvent<HTMLButtonElement>) => {
    let value = 0;

    const filteredStar = stars.filter((star) => star.user.id === userData?.id);
    console.log(
      "🚀 ~ file: likes.tsx:16 ~ handleLike ~ filteredStar:",
      filteredStar
    );

    if (filteredStar.length === 0) {
      // ! 한번도 안눌렀을때
      if (e.currentTarget.name === "up") {
        value = 1;
        console.log(value, "따봉");
      }
      if (e.currentTarget.name === "down") {
        value = -1;
      }

      const res = await postStar({
        chatPostId: chatPostId,
        authData: await authData,
        value: value,
      });
      console.log("🚀 ~ file: likes.tsx:43 ~ handleLike ~ res:", res);
      if (res.status === 201 || res.status === 204) {
        router.refresh();
      }
    } else {
      // ! 두번째 누를때!
      if (filteredStar[0].value !== 0) {
        console.log("따봉/붐따 취소 : 0으로 업데이트");
        value = 0;
        await postStar({
          chatPostId: chatPostId,
          authData: await authData,
          value: value,
        });
        return;
      } else {
        // ! 두번째 + value 0
        console.log("value가 0일때 -> 다시 따봉/붐따");
        if (e.currentTarget.name === "up") {
          value = 1;
          console.log(value, "따봉");
        }
        if (e.currentTarget.name === "down") {
          value = -1;
        }

        const res = await postStar({
          chatPostId: chatPostId,
          authData: await authData,
          value: value,
        });
        console.log("🚀 ~ file: likes.tsx:43 ~ handleLike ~ res:", res);
        if (res.status === 201 || res.status === 204) {
          router.refresh();
        }
      }
    }
  };
  return (
    <>
      <div className="flex justify-center my-6">
        <div className="post-likes w-1/2 h-32 flex justify-center items-center border">
          <button
            name="up"
            className="border rounded-lg p-2 mx-8 h-12 hover:bg-slate-500"
            onClick={handleLike}
          >
            따봉
          </button>
          <div>
            <span>따봉수</span>
            <span>{stars.length}</span>
          </div>
          <button
            name="down"
            className="border rounded-lg p-2 mx-8 h-12 hover:bg-slate-500"
            onClick={handleLike}
          >
            붐따
          </button>
        </div>
      </div>
    </>
  );
};
