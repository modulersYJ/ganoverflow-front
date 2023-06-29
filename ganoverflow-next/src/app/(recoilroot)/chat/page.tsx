"use client";

import {
  useState,
  ChangeEvent,
  FormEvent,
  useRef,
  useEffect,
  ReactElement,
} from "react";

import CircularCheckbox from "@/components/common/CheckBox/CircularCheckBox";

import { chat } from "@/app/api/chat";
import { sendChatPost } from "./api/route";
import { IChat } from "@/interfaces/chat";
import { IChatMessage } from "@/interfaces/chat";
// import { useRouter } from "next/navigation";

export type ChatSavedStatus = "F" | "ING" | "T";

const Chat = () => {
  const [isNowAnswering, setIsNowAnswering] = useState<boolean>(false);
  const [isChatSavedStatus, setChatSavedStatus] =
    useState<ChatSavedStatus>("F");

  const [title, setTitle] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [aChat, setAChat] = useState<IChatMessage[]>([]);
  const [checkCnt, setCheckCnt] = useState<number>(0);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const scrollRef = useRef<HTMLDivElement>(null); // 스크롤 제어 ref

  const [formData, setFormData] = useState<IChat>({
    prompt: "",
  });

  const onClickSaveChat = async (e: React.MouseEvent) => {
    if (isNowAnswering) {
      alert("답변중에는 저장할 수 없습니다!");
      return;
    }

    console.log("achat", aChat);

    setChatSavedStatus("ING");
    setIsModalOpen(true);
  };

  const onClickSubmitPost = async (e: React.MouseEvent) => {
    const selectedPairs = aChat.filter((aPair) => {
      return aPair.isChecked === true;
    });

    setIsModalOpen(false);
    const result = await sendChatPost({
      title: title,
      chatPair: selectedPairs,
    });
    console.log("client res", result);

    setChatSavedStatus("T");
  };

  const submitMessage = async (e: FormEvent) => {
    e.preventDefault();
    if (isNowAnswering) {
      alert("답변중에는 질문할 수 없습니다!");
      return;
    }

    if (message === "") {
      alert("메시지를 입력하세요.");
      return;
    }

    setIsNowAnswering(true);
    setFormData({ prompt: message });

    setMessage("");
    setAChat((prevChat) => [
      ...prevChat,
      {
        question: message,
        answer: "",
        isUser: true,
        isChecked: false,
      },
    ]);

    // 서버에 데이터 제출 후, 응답 받기
    const response = await chat({ prompt: message });

    setAChat((prevChat) => {
      let newChat = [...prevChat];
      newChat[newChat.length - 1].answer = response.bot;
      return newChat;
    });

    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
    }
    setIsNowAnswering(false);
  };

  const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const onChangeMessage = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  // 체크박스 카운트 (for )
  const onCheckboxChange = (index: number) => {
    setAChat((prevChat) => {
      const newChat = [...prevChat];
      newChat[index].isChecked = !newChat[index].isChecked;
      return newChat;
    });
    setCheckCnt(
      (prevCheckCnt) => prevCheckCnt + (aChat[index].isChecked ? 1 : -1)
    );
  };

  useEffect(() => {
    console.log(checkCnt);
  }, [checkCnt]);

  return (
    <div className="flex flex-col h-full">
      {isModalOpen ? (
        <div>
          <div className="fixed inset-0 bg-black opacity-50 z-20"></div>
          <dialog className="flex justify-between gap-1 px-20 py-10 mt-60 outline-none text-lg font-semibold backdrop:bg-black backdrop:opacity-90 rounded-md z-30">
            <input
              className="h-11 w-full"
              onChange={onChangeTitle}
              placeholder="저장할 대화 제목을 입력해주세요"
            />
            <button
              onClick={onClickSubmitPost}
              className="mx-auto px-5 py-2 w-1/3 bg-red-400 outline-none rounded-md"
            >
              제출
            </button>
            <button
              onClick={() => {
                setIsModalOpen(false);
              }}
              className="mx-auto px-5 py-2 w-1/3  bg-red-400 outline-none rounded-md"
            >
              취소
            </button>
          </dialog>
        </div>
      ) : (
        <></>
      )}
      <div className="fixed right-36 bottom-24 z-10 hidden lg:block">
        {isChatSavedStatus === "T" ? (
          <>
            <button
              className="w-36 h-12 bg-blue-500 text-white rounded-lg"
              onClick={() => {
                setAChat([]);
                setCheckCnt(0);
                setChatSavedStatus("F");
                setFormData({ prompt: "" });
                setMessage("");
              }}
            >
              새 채팅 시작
            </button>
          </>
        ) : (
          <BtnSubmitSaveChat
            checkCnt={checkCnt}
            onClickHandler={onClickSaveChat}
          />
        )}
      </div>
      <div className="chatCont flex-grow overflow-y-auto flex justify-center mb-[96px]">
        <div className="chatBox w-full" ref={scrollRef}>
          {aChat.map((chatLine, index) => (
            <div
              key={index}
              className={`w-full py-5 ${
                index % 2 === 0 ? "bg-gray-700" : "bg-gray-800" // 홀짝 배경색 변경
              } flex flex-row`}
            >
              <div className="chatPairContainer h-full flex flex-col sm:flex-row items-center w-3/5 lg:w-2/5 m-auto">
                <div className="chatPairBox w-full flex flex-col justify-center self-center">
                  <div
                    key={index}
                    className={`msgBox p-4 max-w-sm text-xs ${
                      chatLine.isUser
                        ? "bg-blue-500 text-white self-end rounded-chat-question" //사용자 질문
                        : "bg-gray-500 self-start rounded-chat-answer" //GPT 답변
                    } inline-block`}
                  >
                    {chatLine.question}
                  </div>
                  <div className="msgBox p-4 max-w-sm text-xs bg-gray-500 self-start rounded-chat-answer mt-4">
                    {chatLine.answer}
                  </div>
                </div>
                <div className="checkboxContainer ml-12 w-full sm:w-3 sm:h-full">
                  <div className="flex flex-row justify-end w-full h-full">
                    <CircularCheckbox
                      isDisabled={isChatSavedStatus}
                      isChecked={chatLine.isChecked}
                      onCheckboxChange={() => onCheckboxChange(index)}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="promptConsole h-24 fixed bottom-0 w-full flex items-center justify-center bg-vert-dark-gradient ">
        <form
          onSubmit={submitMessage}
          className="w-full max-w-[40%] flex items-center"
        >
          {isChatSavedStatus === "T" ? (
            <input
              onChange={onChangeMessage}
              className="rounded-full bg-gray-500 flex-grow mr-4 p-2 text-xs text-gray-300"
              value={"새 채팅을 시작하세요"}
              disabled
            />
          ) : (
            <input
              value={message}
              onChange={onChangeMessage}
              className="rounded-full bg-gray-500 flex-grow mr-4 p-2 text-xs"
              placeholder={"메시지를 입력하새우"}
            />
          )}
          <button
            type="submit"
            className={`rounded-xl text-white p-2 text-xs min-w-[50px] ${
              message ? "bg-blue-500" : "bg-gray-500"
            }`}
          >
            제출
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;

const BtnSubmitSaveChat = ({
  checkCnt,
  onClickHandler,
}: {
  checkCnt: number;
  onClickHandler: React.MouseEventHandler;
}) => {
  return (
    <div>
      {checkCnt > 0 ? (
        <button className="rounded-xl border-b-4 border-violet-800 h-14 flex flex-col justify-center opacity-85 ">
          <div className="m-4 flex flex-row">
            <div className="rounded-full w-8 h-7 text-indigo-700 text-sm font-bold bg-violet-700">
              <div className="mt-1 text-white">+{checkCnt}</div>
            </div>
            <div
              className="mt-1 ml-3 text-sm font-semibold"
              onClick={onClickHandler}
            >
              채팅 저장하기
            </div>
          </div>
        </button>
      ) : (
        <div></div>
      )}
    </div>
  );
};
