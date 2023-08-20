"use client";
import { useState, useRef, useEffect } from "react";
import { IFolderWithPostsDTO } from "@/interfaces/chat";
import { useAuthDataHook } from "@/hooks/jwtHooks/getNewAccessToken";
import { fetchFolderData } from "./api/chat";

import { accessTokenState } from "@/atoms/jwt";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { IAuthData } from "../api/jwt";
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

export default function ChatPage() {
  useAuthDataHook();

  const accessToken = useRecoilValue(accessTokenState);
  const [authData, setAuthData] = useState<IAuthData>();

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
  const setIsSigned = useSetRecoilState(isSignedState);

  // chat 첫 마운트 시, loadChatStatus 초기화
  useEffect(() => {
    console.log("loadChatStatus 초기화");
    setLoadChatStatus({ status: TLoadChatStatus.F, loadedMeta: undefined });
    setIsSigned(TIsSigned.unknown);
  }, []);

  // foldersData - case 1)
  useEffect(() => {
    if (accessToken) {
      console.log("useEffect foldersData - case 1)");
      fetchFolderData(accessToken, setFoldersData, setAuthData);
    }
  }, [accessToken]);

  // foldersData - case 2)
  useEffect(() => {
    if (chatSavedStatus === "T" && accessToken) {
      console.log("useEffect foldersData - case 2)");
      fetchFolderData(accessToken, setFoldersData, setAuthData);
    }
  }, [chatSavedStatus, accessToken]);

  const onClickNewChatBtn = async (e: React.MouseEvent) => {
    setLoadChatStatus({ status: TLoadChatStatus.F });
    setChatPairs([]);
    setCheckCnt(0);
    setChatSavedStatus("F");
    setQuestionInput("");
  };

  return (
    <>
      <ChatMain
        authData={authData}
        onClickNewChatBtn={onClickNewChatBtn}
        scrollRef={scrollRef}
      />
      <ChatSideBar onClickNewChatBtn={onClickNewChatBtn} />
    </>
  );
}
