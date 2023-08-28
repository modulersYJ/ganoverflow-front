"use client";

import React, { ChangeEvent, useEffect, useState } from "react";
import { postComment } from "../../api/chatposts";
import { useRouter } from "next/navigation";
import { parseDate, parseDateWithSeconds } from "@/utils/parseDate";
import { useSignedCheck } from "@/hooks/useSignedCheck";
import { CommentRow } from "./commentRow";

export function CommentBox({
  chatPostId,
  comments,
}: {
  chatPostId: string;
  comments: TComments[];
}) {
  const checkUserSigned = useSignedCheck();

  const router = useRouter();
  const commentCount = comments?.length;
  const [commentData, setCommentData] = useState("");
  const [reCommentOpen, setReCommentOpen] = useState<number | false>(false);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setCommentData(e.target.value);
    console.log(e.target.value);
  };

  const handleSubmit = async () => {
    if (!checkUserSigned()) return;

    if (commentData === "") {
      alert("댓글을 입력하세요");
      return;
    }

    const res = await postComment({ content: commentData }, chatPostId);
    if (res.status === 201) {
      setCommentData("");
      router.refresh();
    } else {
      console.log("등록 실패: ", res);
    }
  };

  const handleReCommentOpen = (idx: number) => {
    if (reCommentOpen === idx) {
      setReCommentOpen(false);
    } else setReCommentOpen(idx);
  };

  return (
    <>
      <div className="comments-totalcount">{`전체 댓글 ${commentCount}개`}</div>
      <div className="comments-commentbox border border-stone-500">
        {comments?.map((comment, idx) => {
          return (
            <>
              <CommentRow
                key={idx}
                idx={idx}
                comment={comment}
                handleReCommentOpen={handleReCommentOpen}
              />
              {reCommentOpen === idx ? (
                <textarea
                  name="comment"
                  onChange={handleChange}
                  value={commentData}
                  className="border border-gray-300 w-11/12 h-40 p-1 m-3 bg-gray-100 dark:bg-gray-600 text-white text-lg text-left"
                  placeholder="댓글을 입력해 주세요"
                />
              ) : (
                <></>
              )}
            </>
          );
        })}
      </div>
      <div className="comments-write-box flex flex-col">
        <textarea
          name="comment"
          onChange={handleChange}
          value={commentData}
          className="border border-gray-300 w-full h-40 p-2 my-3 bg-gray-100 dark:bg-gray-600 text-white text-lg text-left"
          placeholder="댓글을 입력해 주세요"
        />
        <div className="flex justify-end">
          <button
            className="comment-submit w-32 h-8 bg-secondary hover:bg-primary hover:text-white rounded-xl"
            onClick={handleSubmit}
          >
            등록
          </button>
        </div>
      </div>
    </>
  );
}

export type TComments = {
  commentId: number;
  content: string;
  createdAt: string;
  delYn: string;
  user: { username: string; nickname: string };
  stars?: number;
};
