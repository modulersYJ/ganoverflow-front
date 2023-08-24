"use client";
import { useState, useRef, useEffect } from "react";
import { IFolderWithPostsDTO } from "@/interfaces/chat";
import { fetchFolderData } from "./api/chat";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import ChatSideBar from "@/app/chat/ChatSideBar";
import ChatMain from "@/app/chat/ChatMain";
import { foldersWithChatpostsState } from "@/atoms/folder";
import {
  TLoadChatStatus,
  chatPairsState,
  chatSavedStatusState,
  checkCntState,
  loadChatStatusState,
  questionInputState,
} from "@/atoms/chat";
import { TIsSigned, isSignedState } from "@/atoms/sign";
import { getAccessToken } from "../api/jwt";

export default function ChatPage() {
  const scrollRef = useRef<HTMLDivElement>(null); // 스크롤 제어 ref
  const [chatSavedStatus, setChatSavedStatus] =
    useRecoilState(chatSavedStatusState);
  const setFoldersData = useSetRecoilState<IFolderWithPostsDTO[]>(
    foldersWithChatpostsState
  );
  const setChatPairs = useSetRecoilState(chatPairsState);
  const setCheckCnt = useSetRecoilState(checkCntState);
  const setQuestionInput = useSetRecoilState(questionInputState);
  const setLoadChatStatus = useSetRecoilState(loadChatStatusState);
  const [isSigned, setIsSigned] = useRecoilState(isSignedState);

  // chat 첫 마운트 시, loadChatStatus 초기화
  useEffect(() => {
    console.log("loadChatStatus 초기화");
    setLoadChatStatus({ status: TLoadChatStatus.F, loadedMeta: undefined });
    setIsSigned(TIsSigned.unknown);
  }, []);

  // foldersData - case 1) - accessToken 관리체계 리팩 이후 필요한지 의문(일단킵)
  useEffect(() => {
    if (isSigned) {
      fetchFolderData(setFoldersData);
    }
  }, [isSigned]);

  // foldersData - case 2)
  useEffect(() => {
    if (chatSavedStatus === "T" && isSigned) {
      console.log("useEffect foldersData - case 2)");
      fetchFolderData(setFoldersData);
    }
  }, [chatSavedStatus, isSigned]);

  const onClickNewChatBtn = async (e: React.MouseEvent) => {
    setLoadChatStatus({ status: TLoadChatStatus.F });
    setChatPairs([]);
    setCheckCnt(0);
    setChatSavedStatus("F");
    setQuestionInput("");
  };

  return (
    <>
      <ChatMain onClickNewChatBtn={onClickNewChatBtn} scrollRef={scrollRef} />
      <ChatSideBar onClickNewChatBtn={onClickNewChatBtn} />
    </>
  );
}
