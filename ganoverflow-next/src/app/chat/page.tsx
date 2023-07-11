"use client";

import { useState, FormEvent, useRef, useEffect } from "react";
import {
  ChatSavedStatus,
  IChat,
  IChatPair,
  IFolderWithPostsDTO,
} from "@/interfaces/chat";
import { useAuthDataHook } from "../utils/jwtHooks/getNewAccessToken";
import { getFoldersByUser, sendChat, sendChatPost } from "./api/chat";
import { ChatMain } from "./components/chatMain";
import { accessTokenState } from "@/atoms/jwt";
import { useRecoilValue } from "recoil";
import { getLocalStorageItem } from "../utils/common/localStorage";
import { IAuthData } from "../api/jwt";
import ChatSideBar from "./components/chatSideBar";

const fetchFolderData = async (accessToken: string, setFoldersData: any) => {
  const user = await getLocalStorageItem("userData");

  const authData: IAuthData = {
    accessToken: accessToken,
    userId: user.id,
  };
  const chatFoldersByUser = await getFoldersByUser(user.id, authData);
  setFoldersData(chatFoldersByUser);

  console.log("@@@@@@@@@@@@@@@@@SideBar: Folders", chatFoldersByUser);
};

const scrollDown = (scrollRef: any) => {
  if (scrollRef.current) {
    scrollRef.current.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });
  }
};

export const ChatPage = () => {
  useAuthDataHook();
  const accessToken = useRecoilValue(accessTokenState);
  const [authData, setAuthData] = useState<IAuthData>();

  const scrollRef = useRef<HTMLDivElement>(null); // 스크롤 제어 ref
  const [title, setTitle] = useState("");

  const [isNowAnswering, setIsNowAnswering] = useState(false);
  const [chatSavedStatus, setChatSavedStatus] = useState<ChatSavedStatus>("F");
  const [questionInput, setQuestionInput] = useState("");
  const [chatPairs, setChatPairs] = useState<IChatPair[]>([]);
  const [checkCnt, setCheckCnt] = useState(0);
  const [formData, setFormData] = useState<IChat>({ prompt: "" });
  const [foldersData, setFoldersData] = useState<IFolderWithPostsDTO[]>([]);

  // foldersData - case 1)
  useEffect(() => {
    if (accessToken) {
      fetchFolderData(accessToken, setFoldersData);
    }
  }, [accessToken]);

  // foldersData - case 2)
  useEffect(() => {
    if (chatSavedStatus === "T" && accessToken) {
      fetchFolderData(accessToken, setFoldersData);
    }
  }, [chatSavedStatus, accessToken]);

  // checkCnt
  useEffect(() => {
    console.log(checkCnt);
  }, [checkCnt]);

  // 함수 정의 chat페이지 생명주기별 나열
  const onChangeMessage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuestionInput(e.target.value);
  };

  const onClickSubmitMsg = async (e: FormEvent) => {
    e.preventDefault();
    if (isNowAnswering) {
      alert("답변중에는 질문할 수 없습니다!");
      return;
    }
    if (questionInput === "") {
      alert("메시지를 입력하세요.");
      return;
    }
    setIsNowAnswering(true);
    setFormData({ prompt: questionInput });
    setQuestionInput("");
    setChatPairs((prevChat) => [
      ...prevChat,
      {
        question: questionInput,
        answer: "",
        isUser: true,
        isChecked: false,
      },
    ]);
    const response = await sendChat({ prompt: questionInput });
    setChatPairs((prevChat) => {
      let newChat = [...prevChat];
      newChat[newChat.length - 1] = {
        ...newChat[newChat.length - 1],
        answer: response.bot,
      };
      return newChat;
    });
    setIsNowAnswering(false);
    scrollDown(scrollRef);
  };

  const onChangeCheckBox = (index: number) => {
    setChatPairs((prevChatPairs) => {
      const newChatPairs = [...prevChatPairs];
      newChatPairs[index] = {
        ...newChatPairs[index],
        isChecked: !newChatPairs[index].isChecked,
      };
      return newChatPairs;
    });
    setCheckCnt(
      (prevCheckCnt) => prevCheckCnt + (chatPairs[index].isChecked ? -1 : 1)
    );
  };
  const onClickSaveChatpostInit = async (e: React.MouseEvent) => {
    if (isNowAnswering) {
      alert("답변중에는 저장할 수 없습니다!");
      return;
    }
    setChatSavedStatus("ING");
  };

  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const onClickSaveChatpostExec = async (e: React.MouseEvent) => {
    const selectedPairs = chatPairs.filter((aPair) => {
      return aPair.isChecked === true;
    });
    const chatPostBody = {
      title: title,
      chatPair: selectedPairs,
    };
    await sendChatPost(chatPostBody, authData);
    setChatSavedStatus("T");
  };

  const onClickNewChatBtn = async (e: React.MouseEvent) => {
    setChatPairs([]);
    setCheckCnt(0);
    setChatSavedStatus("F");
    setFormData({ prompt: "" });
    setQuestionInput("");
  };

  return (
    <>
      <ChatMain
        onChangeTitle={onChangeTitle}
        onChangeMessage={onChangeMessage}
        onClickSaveChatpostInit={onClickSaveChatpostInit}
        onClickSaveChatpostExec={onClickSaveChatpostExec}
        onClickNewChatBtn={onClickNewChatBtn}
        onChangeCheckBox={onChangeCheckBox}
        chatSavedStatus={chatSavedStatus}
        checkCnt={checkCnt}
        chatPairs={chatPairs}
        questionInput={questionInput}
        scrollRef={scrollRef}
        onClickSubmitMsg={onClickSubmitMsg}
      />
      <ChatSideBar
        onClickNewChatBtn={onClickNewChatBtn}
        chatSavedStatus={chatSavedStatus}
        foldersData={foldersData}
      />
    </>
  );
};

export default ChatPage;
