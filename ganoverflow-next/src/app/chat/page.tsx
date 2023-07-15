"use client";

import { useState, FormEvent, useRef, useEffect } from "react";
import {
  ChatSavedStatus,
  IChat,
  IChatPair,
  IFolderWithPostsDTO,
} from "@/interfaces/chat";
import { useAuthDataHook } from "../utils/jwtHooks/getNewAccessToken";
import { getFoldersByUser, sendChatPost } from "./api/chat";
import { ChatMain } from "./components/chatMain";
import { accessTokenState } from "@/atoms/jwt";
import { useRecoilValue, useRecoilState } from "recoil";
import { getSessionStorageItem } from "../utils/common/sessionStorage";
import { IAuthData } from "../api/jwt";
import ChatSideBar from "./components/chatSideBar";
import { IFetchStreamAnswerProps } from "@/interfaces/IProps/chat";
import { FolderFileNoOrderDND } from "./components/Dnd";
import { foldersWithChatpostsState } from "@/atoms/folder";

export default function ChatPage() {
  useAuthDataHook();
  const accessToken = useRecoilValue(accessTokenState);
  const [authData, setAuthData] = useState<IAuthData>();

  const scrollRef = useRef<HTMLDivElement>(null); // 스크롤 제어 ref
  const [chatpostName, setChatpostName] = useState("");

  const [isNowAnswering, setIsNowAnswering] = useState(false);
  const [chatSavedStatus, setChatSavedStatus] = useState<ChatSavedStatus>("F");
  const [questionInput, setQuestionInput] = useState("");
  const [chatPairs, setChatPairs] = useState<IChatPair[]>([]);
  const [checkCnt, setCheckCnt] = useState(0);
  // const [foldersData, setFoldersData] = useState<IFolderWithPostsDTO[]>([]);
  const [foldersData, setFoldersData] = useRecoilState<IFolderWithPostsDTO[]>(
    foldersWithChatpostsState
  );
  const [currStream, setCurrStream] = useState<string>("");

  // foldersData - case 1)
  useEffect(() => {
    if (accessToken) {
      fetchFolderData(accessToken, setFoldersData, setAuthData);
      console.log("foldersData: ", foldersData, accessToken);
    }
  }, [accessToken]);

  // foldersData - case 2)
  useEffect(() => {
    if (chatSavedStatus === "T" && accessToken) {
      fetchFolderData(accessToken, setFoldersData, setAuthData);
      console.log("foldersData: ", foldersData);
    }
  }, [chatSavedStatus, accessToken]);

  // checkCnt
  useEffect(() => {
    console.log(checkCnt);
  }, [checkCnt]);

  // UPDATE states, using streaming answer
  useEffect(() => {
    if (isNowAnswering) {
      setChatPairs((prevChats) => {
        let newChat = [...prevChats];
        newChat[newChat.length - 1] = {
          ...newChat[newChat.length - 1],
          answer: currStream,
        };
        scrollDown(scrollRef);
        return newChat;
      });
    }
  }, [currStream, isNowAnswering]);

  // 함수 정의 chat페이지 생명주기별 나열
  const onChangeMessage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuestionInput(e.target.value);
  };

  const onClickSubmitMsg = async (e: FormEvent, prompt: string) => {
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
    setQuestionInput("");
    setCurrStream(""); // 초기화

    // 사용자 질문만 업데이트 및 마운트
    setChatPairs((prevChat: any) => [
      ...prevChat,
      {
        question: questionInput,
        answer: "",
        isUser: true,
        isChecked: false,
      },
    ]);
    await fetchUpdateStreamAnswer({
      prompt,
      currStream,
      setCurrStream,
      setIsNowAnswering,
    });
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
    setChatpostName(e.target.value);
  };

  const onClickSaveChatpostExec = async (e: React.MouseEvent) => {
    const selectedPairs = chatPairs.filter((aPair) => {
      return aPair.isChecked === true;
    });
    const chatPostBody = {
      chatpostName: chatpostName,
      chatPair: selectedPairs,
    };
    await sendChatPost(chatPostBody, authData);
    setChatSavedStatus("T");
  };

  const onClickNewChatBtn = async (e: React.MouseEvent) => {
    setChatPairs([]);
    setCheckCnt(0);
    setChatSavedStatus("F");
    setQuestionInput("");
  };
  //

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
        // foldersData={foldersData}
      />
    </>
  );
}

const fetchFolderData = async (
  accessToken: string,
  setFoldersData: any,
  setAuthData: any
) => {
  const user = await getSessionStorageItem("userData");

  const authData: IAuthData = {
    accessToken: accessToken,
    userId: user.id,
  };
  setAuthData(authData);
  const chatFoldersByUser = await getFoldersByUser(user.id, authData);
  setFoldersData(chatFoldersByUser);
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

// No need to cache
const fetchUpdateStreamAnswer = async ({
  prompt,
  currStream,
  setCurrStream,
  setIsNowAnswering,
}: IFetchStreamAnswerProps) => {
  const response = await fetch("/chat/api", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prompt,
    }),
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const data = response.body;
  if (!data) {
    return;
  }

  const reader = data.getReader();
  const decoder = new TextDecoder();
  let done = false;
  while (!done) {
    const { value, done: doneReading } = await reader.read();
    done = doneReading;
    const chunkValue = decoder.decode(value);

    setCurrStream((prev: string) => prev + chunkValue);
    console.log("currStream 1: ", currStream);
  }
  setIsNowAnswering(false);
};
