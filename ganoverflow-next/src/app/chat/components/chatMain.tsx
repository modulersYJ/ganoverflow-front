"use client";
import { useState } from "react";
import CircularCheckbox from "@/components/common/CheckBox/CircularCheckBox";
import { IChatMainProps } from "@/interfaces/IProps/chat";

export const ChatMain = ({
  onChangeTitle,
  onChangeMessage,
  onChangeCheckBox,
  onClickNewChatBtn,
  onClickSaveChatpostInit,
  onClickSaveChatpostExec,
  onClickSubmitMsg,
  questionInput,
  chatSavedStatus,
  checkCnt,
  chatPairs,
  scrollRef,
}: IChatMainProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
              onClick={(e) => {
                onClickSaveChatpostExec(e);
                setIsModalOpen(false);
              }}
              className="mx-auto px-5 py-2 w-1/3 bg-blue-400 outline-none rounded-md"
            >
              저장
            </button>
            <button
              onClick={() => {
                setIsModalOpen(false);
              }}
              className="mx-auto px-5 py-2 w-1/3  bg-blue-200 outline-none rounded-md"
            >
              취소
            </button>
          </dialog>
        </div>
      ) : (
        <></>
      )}
      <div className="fixed right-36 bottom-24 z-10 hidden lg:block">
        {chatSavedStatus === "T" ? (
          <>
            <button
              className="w-36 h-12 bg-blue-500 text-white rounded-lg"
              onClick={onClickNewChatBtn}
            >
              새 채팅 시작
            </button>
          </>
        ) : (
          <BtnSubmitSaveChat
            checkCnt={checkCnt}
            onClickHandler={(e) => {
              onClickSaveChatpostInit(e);
              setIsModalOpen(true);
            }}
          />
        )}
      </div>
      <div className="chatCont flex-grow overflow-y-auto flex justify-center mb-[96px]">
        <div className="chatBox w-full" ref={scrollRef}>
          {chatPairs.map((chatLine, index) => (
            <div
              key={index}
              className={`w-full py-5 ${
                index % 2 === 0 ? "bg-gray-700" : "bg-gray-800" // 홀짝 배경색 변경
              } flex flex-row`}
            >
              <div className="chatPairContainer h-full flex flex-col sm:flex-row items-center w-3/5 md:w-2/5 m-auto">
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
                      isDisabled={chatSavedStatus}
                      isChecked={chatLine.isChecked}
                      onChangeCheckBox={() => onChangeCheckBox(index)}
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
          onSubmit={onClickSubmitMsg}
          className="w-full max-w-[40%] mr-12 md:mr-0 flex items-center "
        >
          {chatSavedStatus === "T" ? (
            <input
              onChange={onChangeMessage}
              className="rounded-full bg-gray-500 flex-grow mr-4 p-2 text-xs text-gray-300"
              value={"새 채팅을 시작하세요"}
              disabled
            />
          ) : (
            <input
              value={questionInput}
              onChange={onChangeMessage}
              className="rounded-full bg-gray-500 flex-grow mr-4 p-2 text-xs"
              placeholder={"메시지를 입력하새우"}
            />
          )}
          <button
            type="submit"
            className={`rounded-xl text-white p-2 text-xs min-w-[50px] ${
              questionInput ? "bg-blue-500" : "bg-gray-500"
            }`}
          >
            제출
          </button>
        </form>
      </div>
    </div>
  );
};

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
        <button
          className="rounded-xl border-b-4 border-violet-800 h-14 flex flex-col justify-center opacity-85 "
          onClick={onClickHandler}
        >
          <div className="m-4 flex flex-row">
            <div className="rounded-full w-8 h-7 text-indigo-700 text-sm font-bold bg-violet-700">
              <div className="mt-1 text-white">+{checkCnt}</div>
            </div>
            <div className="mt-1 ml-3 text-sm font-semibold">채팅 저장하기</div>
          </div>
        </button>
      ) : (
        <div></div>
      )}
    </div>
  );
};
