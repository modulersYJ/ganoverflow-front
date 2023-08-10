"use client";

import { useState, FormEvent, useRef, useEffect } from "react";
import {
  ChatSavedStatus,
  IChatPair,
  IFolderWithPostsDTO,
  TLoadThisChatHandler,
} from "@/interfaces/chat";
import { useAuthDataHook } from "@/hooks/jwtHooks/getNewAccessToken";
import { getFoldersByUser, putChatPost, sendChatPost } from "./api/chat";
import { ChatMain } from "./components/chatMain";
import { accessTokenState } from "@/atoms/jwt";
import { useRecoilValue, useRecoilState } from "recoil";
import { getSessionStorageItem } from "@/utils/common/sessionStorage";
import { IAuthData } from "../api/jwt";
import ChatSideBar from "./components/chatSideBar";
import {
  IFetchStreamAnswerProps,
  ITitleAndCategory,
} from "@/interfaces/IProps/chat";
import { foldersWithChatpostsState } from "@/atoms/folder";
import { TLoadChatStatus, loadChatStatusState } from "@/atoms/chat";
import { useRouter } from "next/navigation";

export default function ChatPage() {
  useAuthDataHook();
  const accessToken = useRecoilValue(accessTokenState);
  const [authData, setAuthData] = useState<IAuthData>();

  const scrollRef = useRef<HTMLDivElement>(null); // 스크롤 제어 ref
  const [titleAndCategory, setTitleAndCategory] = useState<ITitleAndCategory>({
    chatpostName: "",
    category: "",
  });

  const [isNowAnswering, setIsNowAnswering] = useState(false);
  const [chatSavedStatus, setChatSavedStatus] = useState<ChatSavedStatus>("F");
  const [questionInput, setQuestionInput] = useState("");
  const [chatPairs, setChatPairs] = useState<IChatPair[]>([]);
  const [checkCnt, setCheckCnt] = useState(0);
  const [foldersData, setFoldersData] = useRecoilState<IFolderWithPostsDTO[]>(
    foldersWithChatpostsState
  );

  const [currStream, setCurrStream] = useState<string>("");
  const [loadChatStatus, setLoadChatStatus] =
    useRecoilState(loadChatStatusState);

  // chat 첫 마운트 시, loadChatStatus 초기화
  useEffect(() => {
    console.log("loadChatStatus 초기화");
    setLoadChatStatus({ status: TLoadChatStatus.F, loadedMeta: undefined });
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

  const onChangeTitleAndCategory = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    console.log(e.target.value, e.target.name);
    setTitleAndCategory({
      ...titleAndCategory,
      [e.target.name]: e.target.value,
    });
  };

  const onClickSaveChatpostExec = async (e: React.MouseEvent) => {
    const selectedPairs = chatPairs.filter((aPair) => {
      return aPair.isChecked === true;
    });
    const chatPostBody = {
      chatpostName: titleAndCategory?.chatpostName,
      categoryName: titleAndCategory?.category,
      chatPair: selectedPairs,
    };
    if (loadChatStatus.status === TLoadChatStatus.UPDATING) {
      const chatpostName =
        titleAndCategory?.chatpostName === ""
          ? loadChatStatus.loadedMeta?.title
          : titleAndCategory?.chatpostName;
      const categoryName =
        titleAndCategory?.category === ""
          ? loadChatStatus.loadedMeta?.category
          : titleAndCategory?.category;

      const putChatPostBody = {
        ...chatPostBody,
        chatpostName,
        categoryName,
        folderId: loadChatStatus.loadedMeta?.folderId,
      };
      console.log("putChatPostBody", putChatPostBody);

      await putChatPost(
        loadChatStatus.loadedMeta?.chatPostId,
        putChatPostBody,
        authData
      );

      setLoadChatStatus({ status: TLoadChatStatus.F, loadedMeta: undefined });
      setChatSavedStatus("T");
      return;
    }

    await sendChatPost(chatPostBody, authData);
    setChatSavedStatus("T");
    return;
  };

  const onClickNewChatBtn = async (e: React.MouseEvent) => {
    setLoadChatStatus({ status: TLoadChatStatus.F });
    setChatPairs([]);
    setCheckCnt(0);
    setChatSavedStatus("F");
    setQuestionInput("");
  };

  const loadThisChatHandler: TLoadThisChatHandler = async (
    chatPairs: IChatPair[],
    folderId: number | undefined
  ) => {
    setLoadChatStatus({
      ...loadChatStatus,
      loadedMeta: {
        folderId: folderId,
        chatPostId: loadChatStatus.loadedMeta?.chatPostId,
        title: loadChatStatus.loadedMeta?.title,
        category: loadChatStatus.loadedMeta?.category,
      },
    });
    setChatPairs(chatPairs as IChatPair[]);
    setChatSavedStatus("T");
    setQuestionInput("");
  };

  const onClickContinueChat = (e: React.MouseEvent) => {
    setLoadChatStatus({
      status: TLoadChatStatus.UPDATING,
      loadedMeta: {
        folderId: loadChatStatus.loadedMeta?.folderId,
        chatPostId: loadChatStatus.loadedMeta?.chatPostId,
        title: loadChatStatus.loadedMeta?.title,
        category: loadChatStatus.loadedMeta?.category,
      },
    });

    setCheckCnt(chatPairs.length);
    setChatSavedStatus("F");
    setQuestionInput("");
  };

  return (
    <>
      <ChatMain
        onChangeTitleAndCategory={onChangeTitleAndCategory}
        onChangeMessage={onChangeMessage}
        onClickSaveChatpostInit={onClickSaveChatpostInit}
        onClickSaveChatpostExec={onClickSaveChatpostExec}
        onClickNewChatBtn={onClickNewChatBtn}
        onClickContinueChat={onClickContinueChat}
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
        loadThisChatHandler={loadThisChatHandler}
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
  console.log("fetched FolderData! - 요청 후 정합성", chatFoldersByUser);
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
