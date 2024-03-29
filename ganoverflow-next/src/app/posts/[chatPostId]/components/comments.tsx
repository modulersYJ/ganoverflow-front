"use client";

import React, { ChangeEvent, useEffect, useState } from "react";
import { postComment, postReComment } from "../../api/chatposts";
import { useRouter } from "next/navigation";
import { useSignedCheck } from "@/hooks/useSignedCheck";
import {
  TUserData,
  getSessionStorageItem,
} from "@/utils/common/sessionStorage";
import dynamic from "next/dynamic";

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
  const [reCommentData, setReCommentData] = useState("");
  const [reCommentOpen, setReCommentOpen] = useState<number | false>(false);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setCommentData(e.target.value);
    console.log(e.target.value);
  };

  const handleReCommentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setReCommentData(e.target.value);
    console.log(e.target.value);
  };

  // 댓글 등록
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

  // 대댓글 등록
  const handleReCommentSubmit = async (parent: number) => {
    if (!checkUserSigned()) return;
    if (reCommentData === "") {
      alert("댓글을 입력하세요");
      return;
    }
    const res = await postReComment(
      { content: reCommentData, parent: parent },
      chatPostId
    );
    if (res.status === 201) {
      setReCommentData("");
      router.refresh();
    } else {
      console.log("등록 실패: ", res);
    }
    setReCommentOpen(false);
  };

  // 대댓글열기
  const handleReCommentOpen = (idx: number) => {
    if (reCommentOpen === idx) {
      setReCommentOpen(false);
    } else setReCommentOpen(idx);
  };

  const userData = getSessionStorageItem("userData");

  const CommentRow = dynamic(() => import("./commentRow"), { ssr: false });

  return (
    <>
      <div className="comments-totalcount mt-12 mb-3 w-full items-start dark:text-gray-400">{`전체 댓글 ${commentCount}개`}</div>
      <div className="comments-commentbox border-0 dark:border rounded-lg bg-gray-200 dark:bg-transparent border-stone-500 whitespace-nowrap  px-4 py-2">
        {comments?.map((comment, idx) => {
          return (
            <div key={idx}>
              {comment?.parent ? (
                <></>
              ) : (
                <CommentRow
                  idx={comment.commentId}
                  comment={comment}
                  handleReCommentOpen={handleReCommentOpen}
                  userDidLike={
                    comment?.userLikes?.filter(
                      (user) => user?.id === userData?.id
                    ).length === 1
                  }
                />
              )}
              {reCommentOpen === comment.commentId ? (
                <div className="">
                  <textarea
                    name="comment"
                    key={`textarea-${comment.commentId}`}
                    onChange={handleReCommentChange}
                    value={reCommentData}
                    className="border border-gray-300 w-11/12 h-40 p-1 m-3 bg-gray-100 dark:bg-gray-600  text-lg text-left"
                    placeholder="댓글을 입력해 주세요"
                  />
                  <div className="flex justify-end pr-2">
                    <button
                      className="comment-submit w-32 h-8 mb-3 bg-secondary hover:bg-primary hover:text-white rounded-xl"
                      onClick={() => handleReCommentSubmit(comment.commentId)}
                    >
                      등록
                    </button>
                  </div>
                </div>
              ) : (
                <></>
              )}
              {comment?.childComments.length > 0 ? (
                comment.childComments.map((child, i) => (
                  <>
                    <div
                      className="w-full flex flex-row pl-8 border-l-4 border-gray-300"
                      key={child.commentId}
                    >
                      <CommentRow
                        idx={child.commentId}
                        comment={child}
                        handleReCommentOpen={handleReCommentOpen}
                        userDidLike={
                          child?.userLikes?.filter(
                            (user) => user.id === userData?.id
                          ).length === 1
                        }
                      />
                    </div>

                    {reCommentOpen === child.commentId ? (
                      <div className="">
                        <textarea
                          name="comment"
                          key={`textarea-${child.commentId}`}
                          onChange={handleReCommentChange}
                          value={reCommentData}
                          className="border border-gray-300 w-11/12 h-40 p-1 m-3 bg-gray-100 dark:bg-gray-600 text-lg text-left"
                          placeholder="댓글을 입력해 주세요"
                        />
                        <div className="flex justify-end pr-2">
                          <button
                            className="comment-submit w-32 h-8 mb-3 bg-secondary hover:bg-primary hover:text-white rounded-xl"
                            onClick={() =>
                              handleReCommentSubmit(child.commentId)
                            }
                          >
                            등록
                          </button>
                        </div>
                      </div>
                    ) : (
                      <></>
                    )}
                  </>
                ))
              ) : (
                <></>
              )}
            </div>
          );
        })}
      </div>
      <div className="comments-write-box flex flex-col">
        <textarea
          name="comment"
          onChange={handleChange}
          value={commentData}
          className="border border-gray-300 w-full h-40 p-2 my-3 bg-gray-100 dark:bg-gray-600 text-lg text-left"
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
  user: TUserData;
  userLikes: any[];
  parent?: TComments;
  childComments: TComments[];
};
