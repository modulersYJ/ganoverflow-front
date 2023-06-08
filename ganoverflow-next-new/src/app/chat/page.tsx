"use client";

import {
  useState,
  ChangeEvent,
  FormEvent,
  useRef,
  useEffect,
  ReactElement,
} from "react";

type ChatMessage = {
  message: string;
  isUser: boolean;
};

const Chat = () => {
  const [message, setMessage] = useState<string>("");
  const [chat, setChat] = useState<ChatMessage[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null); // 스크롤 제어 ref

  const submitMessage = (e: FormEvent) => {
    e.preventDefault();
    setChat((prevChat) => [...prevChat, { message, isUser: true }]);
    setMessage("");
  };

  const onMessageChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
    }
  }, [chat]); // 채팅이 업데이트될 때마다 스크롤을 맨 아래로 내림

  return (
    <div className="flex flex-col h-full">
      <div className="fixed right-32 bottom-28">
        <BtnSubmitSaveChat checkCnt={1} />
      </div>
      <div className="chatCont flex-grow overflow-y-auto flex justify-center mb-[96px]">
        <div className="chatBox w-full" ref={scrollRef}>
          {chat.map((chatLine, index) => (
            <div
              className={`w-full py-5 ${
                index % 2 === 0 ? "bg-gray-700" : "bg-gray-800" // 홀짝 배경색 변경
              }`}
            >
              <div className="chatPairBox w-1/3 flex flex-col justify-center self-center m-auto">
                <div
                  key={index}
                  className={`msgBox p-4 max-w-sm text-xs ${
                    chatLine.isUser
                      ? "bg-blue-500 text-white self-end rounded-chat-question" //사용자 질문
                      : "bg-gray-500 self-start rounded-chat-answer" //GPT 답변
                  } inline-block`}
                >
                  {chatLine.message}
                </div>
                <div className="msgBox p-4 max-w-sm text-xs bg-gray-500 self-start rounded-chat-answer mt-4">
                  답변이요
                  {}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="promptConsole h-24 fixed bottom-0 w-full bg-gray-700 flex items-center justify-center">
        <form
          onSubmit={submitMessage}
          className="w-full max-w-[45%] flex items-center"
        >
          <input
            value={message}
            onChange={onMessageChange}
            className="rounded-full bg-gray-500 flex-grow mr-4 p-2"
            placeholder="메시지를 입력하새우"
          />
          <button
            type="submit"
            className="rounded-full bg-blue-500 text-white p-2"
          >
            제출
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;

const BtnSubmitSaveChat = ({ checkCnt }: { checkCnt: number }) => {
  return (
    <button className="rounded-full w-[195px] h-14 bg-indigo-800 flex flex-col justify-center">
      <div className="m-6 flex flex-row">
        <div className="rounded-full bg-white w-9 h-7 text-indigo-700 text-md">
          {}
          <div className="ml-[2px] mt-[1px]">+{checkCnt}</div>
        </div>
        <div className="mt-[2px] ml-2">채팅 저장하기</div>
      </div>
    </button>
  );
};
