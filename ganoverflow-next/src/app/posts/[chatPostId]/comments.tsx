"use client";

import { ChangeEvent, InputHTMLAttributes, useState } from "react";

export function CommentBox({ comments }: { comments: any }) {
  const commentCount = comments?.length;
  const [commentData, setCommentData] = useState<string>("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommentData(e.target.value);
  };
  return (
    <>
      <div className="comments-totalcount">{`전체 댓글 ${commentCount}개`}</div>
      <div className="comments-commentbox border border-stone-500">
        {comments}
      </div>
      <div className="comments-write-box flex flex-col">
        <input
          name="comment"
          onChange={handleChange}
          value={commentData}
          className="border border-gray-300 w-full h-40 p-2 my-3 bg-gray-600"
          placeholder="댓글을 입력해 주세요"
        />
        <div className="flex justify-end">
          <button className="comment-submit w-32 h-8 bg-indigo-400 rounded-xl">
            등록
          </button>
        </div>
      </div>
    </>
  );
}
