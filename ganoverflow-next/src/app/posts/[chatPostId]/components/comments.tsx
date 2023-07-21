"use client";

import React, { ChangeEvent, useEffect, useState } from "react";
import { getComments, postComment } from "../../api/chatposts";
import { useAuthDataHook } from "@/utils/jwtHooks/getNewAccessToken";
import { useRouter } from "next/navigation";
import { parseDate, parseDateWithSeconds } from "@/utils/parseDate";

export function CommentBox({
  chatPostId,
  comments,
}: {
  chatPostId: string;
  comments: {
    commentId: number;
    content: string;
    createdAt: string;
    delYn: string;
    user: { username: string; nickname: string };
  }[];
}) {
  console.log("🚀 ~ file: comments.tsx:22 ~ comments:", comments);
  const authData = useAuthDataHook();
  const router = useRouter();
  const commentCount = comments?.length;
  const [commentData, setCommentData] = useState("");

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setCommentData(e.target.value);
    console.log(e.target.value);
  };

  const handleSubmit = async () => {
    if (commentData === "") {
      alert("댓글을 입력하세요");
      return;
    }
    const res = await postComment(
      { content: commentData },
      await authData,
      chatPostId
    );
    if (res.status === 201) {
      setCommentData("");
      alert("등록이 완료되었습니다.");
      router.refresh();
    } else {
      console.log("res ", res);
      alert("등록 실패");
    }
  };

  return (
    <>
      <div className="comments-totalcount">{`전체 댓글 ${commentCount}개`}</div>
      <div className="comments-commentbox border border-stone-500">
        {comments?.map((comment, idx) => {
          return (
            <div
              key={idx}
              className="flex flex-row border-b-2 border-stone-500"
            >
              <div className="w-1/5 text-left px-4 py-2">
                {comment.user.nickname}
              </div>
              <div className="w-full text-left py-2">
                {comment.content
                  .split("\n")
                  .map((word: string, idx: number) => (
                    <React.Fragment key={idx}>
                      {word}
                      <br />
                    </React.Fragment>
                  ))}
              </div>
              <div className="w-1/4 text-right p-2">
                {parseDateWithSeconds(comment.createdAt)}
              </div>
            </div>
          );
        })}
      </div>
      <div className="comments-write-box flex flex-col">
        <textarea
          name="comment"
          onChange={handleChange}
          value={commentData}
          className="border border-gray-300 w-full h-40 p-2 my-3 bg-gray-600"
          placeholder="댓글을 입력해 주세요"
        />
        <div className="flex justify-end">
          <button
            className="comment-submit w-32 h-8 bg-indigo-400 rounded-xl"
            onClick={handleSubmit}
          >
            등록
          </button>
        </div>
      </div>
    </>
  );
}
