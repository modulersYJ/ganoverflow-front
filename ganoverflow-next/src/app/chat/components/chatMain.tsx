"use client";
import { useState } from "react";
import CircularCheckbox from "@/components/common/CheckBox/CircularCheckBox";
import { IChatMainProps } from "@/interfaces/IProps/chat";
import { getAllCategories } from "../api/chat";
import { SaveChatModal } from "./SaveChatModal";
import { useRecoilState } from "recoil";
import { TLoadChatStatus, loadChatStatusState } from "@/atoms/chat";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

// light용
// import { solarizedlight } from "react-syntax-highlighter/dist/esm/styles/prism"; // best
// import { prism } from "react-syntax-highlighter/dist/esm/styles/prism";

//dark 테마용 후보
// import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";
// import { okaidia } from "react-syntax-highlighter/dist/esm/styles/prism";
import { gruvboxDark } from "react-syntax-highlighter/dist/esm/styles/prism"; // best

export const ChatMain = ({
  onChangeTitleAndCategory,
  onChangeMessage,
  onChangeCheckBox,
  onClickNewChatBtn,
  onClickContinueChat,
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
  const [categories, setCategories] = useState<{ categoryName: string }[]>([]);
  const [loadChatStatus, setLoadChatStatus] =
    useRecoilState(loadChatStatusState);

  return (
    <div className="flex flex-col h-full">
      {isModalOpen ? (
        <SaveChatModal
          categories={categories}
          onChangeTitleAndCategory={onChangeTitleAndCategory}
          onClickSaveChatpostExec={onClickSaveChatpostExec}
          setIsModalOpen={setIsModalOpen}
        />
      ) : (
        <></>
      )}
      <div className="fixed right-36 bottom-24 z-10 hidden lg:block">
        {loadChatStatus.status === TLoadChatStatus.SHOWING && (
          <div className="mb-4">
            <button
              className="w-36 h-12 bg-black !text-white dark:bg-white dark:!text-black font-bold text-md rounded-3xl"

              onClick={onClickContinueChat}
            >
              채팅 이어하기
            </button>
          </div>
        )}
        {chatSavedStatus === "T" ? (
          <>
            <button
              className="w-36 h-12 bg-gray-700 text-white font-bold text-md rounded-3xl"
              onClick={onClickNewChatBtn}
            >
              새 채팅 시작
            </button>
          </>
        ) : (
          <BtnSubmitSaveChat
            checkCnt={checkCnt}
            setCategories={setCategories}
            onClickHandler={async (e) => {
              const willOpen = onClickSaveChatpostInit(e);

              setIsModalOpen(await willOpen);
            }}
          />
        )}
      </div>
      <div className="chatmain-title h-10 flex flex-col justify-center border-b-solid border-b-[1px] border-b-gray-400">
        <p className="font-normal text-md text-gray-500">
          {loadChatStatus.loadedMeta?.title
            ? loadChatStatus.loadedMeta?.title
            : `새로운 채팅 시작`}
        </p>
      </div>
      <div className="chatCont flex-grow overflow-y-auto flex justify-center mb-[96px]">
        <div className="chatBox w-full" ref={scrollRef}>
          {chatPairs?.map((chatLine, index) => (
            <div
              key={index}
              className={`w-full py-5 ${
                index % 2 === 0
                  ? "bg-gray-300 dark:bg-[#2c2c33]"
                  : "bg-gray-200 dark:bg-[#202024]" // 홀짝 배경색 변경
              } flex flex-row
              `}
            >
              <div className="chatPairContainer h-full flex flex-col sm:flex-row items-center w-full md:w-2/5 m-auto">
                <div className="chatPairBox w-full flex flex-col justify-center self-center">
                  {chatLine.question && (
                    <div
                      key={index}
                      className={`msgBox p-5 max-w-sm text-xs ${"bg-primary text-white self-end rounded-chat-question"} inline-block`}
                    >
                      {chatLine.question}
                    </div>
                  )}

                  {chatLine.answer && (
                    <div className="msgBox p-5 max-w-sm text-xs bg-gray-500 self-start rounded-chat-answer mt-4 text-white">
                      <div className="overflow-auto max-w-full rounded-md">
                        <ReactMarkdown
                          components={{
                            p({ node, children }: any) {
                              return <p className="answer-p">{children}</p>;
                            },
                            code({
                              node,
                              inline,
                              className,
                              children,
                              ...props
                            }: any) {
                              const match = /language-(\w+)/.exec(
                                className || ""
                              );
                              const language = match ? match[1] : null;

                              if (!inline) {
                                return (
                                  <SyntaxHighlighter
                                    style={
                                      gruvboxDark as {
                                        [key: string]: React.CSSProperties;
                                      }
                                    }
                                    language={language || "javascript"}
                                    PreTag="div"
                                    {...props}
                                  >
                                    {String(children).replace(/\n$/, "")}
                                  </SyntaxHighlighter>
                                );
                              } else {
                                return (
                                  <code className={className} {...props}>
                                    {children}
                                  </code>
                                );
                              }
                            },
                          }}
                        >
                          {chatLine.answer}
                        </ReactMarkdown>
                      </div>
                    </div>
                  )}
                </div>
                {!(loadChatStatus.status === TLoadChatStatus.SHOWING) ? (
                  <div className="checkboxContainer ml-12 w-full sm:w-3 sm:h-full">
                    <div className="flex flex-row justify-end w-full h-full">
                      <CircularCheckbox
                        isDisabled={chatSavedStatus}
                        isChecked={!!chatLine.isChecked}
                        onChangeCheckBox={() => onChangeCheckBox(index)}
                      />
                    </div>
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div
        className="promptConsole h-20 fixed bottom-0 w-full flex items-center justify-center
       opacity-95 backdrop-blur-sm backdrop-saturate-100 bg-vert-light-gradient
       dark:bg-transparent
       dark:bg-vert-dark-gradient"
      >
        <form
          onSubmit={(e) => {
            onClickSubmitMsg(e, questionInput);
          }}
          className="w-full max-w-[40%] mr-12 md:mr-0 flex items-center "
        >
          {chatSavedStatus === "T" ? (
            <input
              onChange={onChangeMessage}
              className="rounded-full bg-white dark:bg-gray-500 flex-grow mr-4 p-2 text-xs text-gray-500 dark:text-gray-300"
              value={"새 채팅을 시작하세요"}
              disabled
            />
          ) : (
            <input
              value={questionInput}
              onChange={onChangeMessage}
              className="rounded-full bg-white dark:bg-gray-500 text-black dark:text-gray-100 flex-grow mr-4 p-2 text-xs"
              placeholder={"메시지를 입력하새우"}
            />
          )}
          <button
            type="submit"
            disabled={chatSavedStatus === "T"}
            className={`rounded-2xl font-bold text-white py-2.5 px-5 text-xs !min-w-[60px]
            dark:
            ${questionInput ? "bg-primary" : "bg-gray-500"}`}
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
  setCategories,
}: {
  checkCnt: number;
  onClickHandler: React.MouseEventHandler;
  setCategories: (value: any) => void;
}) => {
  return (
    <div>
      {checkCnt > 0 ? (
        <button
          className="rounded-3xl bg-gray-100 dark:bg-gray-700 h-14 flex flex-col justify-center opacity-85 "
          onClick={async (e) => {
            onClickHandler(e);
            setCategories(await getAllCategories());
          }}
        >
          <div className="m-4 flex flex-row">
            <div className="rounded-full w-8 h-7 text-indigo-700 text-sm font-bold bg-primary dark:bg-gray-600">
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
