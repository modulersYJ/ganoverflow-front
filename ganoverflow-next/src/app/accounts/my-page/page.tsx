"use client";
import Link from "next/link";
import { getMypageData } from "./api/mypage";
import { useAuthDataHook } from "@/hooks/jwtHooks/getNewAccessToken";
import { useEffect, useState } from "react";
import { GenerateAuthHeader } from "@/app/api/jwt";
import { useRecoilValue } from "recoil";
import { accessTokenState } from "@/atoms/jwt";
import { getSessionStorageItem } from "@/utils/common/sessionStorage";

export default function Mypage() {
  const accessToken = useRecoilValue(accessTokenState);
  const user = getSessionStorageItem("userData");

  const [mypageData, setMyPageData] = useState({
    hi: "dd",
    myPosts: [
      { chatpostName: "제목1", chatPostId: 1 },
      { chatpostName: "제목2", chatPostId: 2 },
    ],
    favoritePosts: [
      { chatpostName: "제목1", chatPostId: 1 },
      { chatpostName: "제목2", chatPostId: 2 },
    ],
  });
  useEffect(() => {
    getMypageData({
      authData: {
        accessToken: accessToken,
        userId: user?.id,
      },
    }).then((data) => setMyPageData(data));
  }, []);

  return (
    <div className="h-full flex flex-col items-center">
      <div className="mypage-title">
        <h1>{mypageData?.hi} 님, 안녕하세요</h1>
      </div>
      <div className="mypage-myinfo h-20">
        <Link href={"my-info"}>
          <button className=" rounded-lg bg-primary p-4">내 정보 수정</button>
        </Link>
      </div>

      <div className="grid grid-cols-2 w-2/3">
        <div className="mypage-box mypage-likes">
          <h3 className="p-2 text-xl font-bold">좋아요 한 chat</h3>
          <div>
            <ul>
              {mypageData?.favoritePosts?.map((post) => (
                <li className="p-2 w-full border border-slate-100 hover:bg-secondary">
                  <Link href={`/posts/${post?.chatPostId}`}>
                    {post?.chatpostName}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mypage-box mypage-favorite-category ">
          <h3 className="p-2 text-xl font-bold">관심있을만한 chat</h3>
        </div>
        <div className="mypage-box mypage-favorite-category">
          <h3 className="p-2 text-xl font-bold">내가 작성한 chat</h3>
          <div>
            <ul>
              {mypageData?.myPosts?.map((post) => (
                <li className="p-2 w-full border border-slate-100 hover:bg-secondary">
                  <Link href={`/posts/${post?.chatPostId}`} className="">
                    {post?.chatpostName}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}