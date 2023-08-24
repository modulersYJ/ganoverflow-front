import {
  chatPairsState,
  chatSavedStatusState,
  questionInputState,
} from "@/atoms/chat";
import {
  Dispatch,
  RefObject,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { GetHandleQuestionInput, GetHandleSubmitMsg } from "./handlers";
import scrollDown from "@/utils/scrollDown";

const PromptConsole = ({
  isNowAnswering,
  setIsNowAnswering,
  scrollRef,
}: {
  isNowAnswering: boolean;
  setIsNowAnswering: Dispatch<SetStateAction<boolean>>;
  scrollRef: RefObject<HTMLDivElement>;
}): JSX.Element => {
  const [currStream, setCurrStream] = useState<string>("");

  const [questionInput, setQuestionInput] = useRecoilState(questionInputState);
  const chatSavedStatus = useRecoilValue(chatSavedStatusState);
  const setChatPairs = useSetRecoilState(chatPairsState);

  const onClickSubmitMsg = GetHandleSubmitMsg({
    isNowAnswering,
    currStream,
    setIsNowAnswering,
    setCurrStream,
  });

  const onChangeQuestionInput = GetHandleQuestionInput(setQuestionInput);

  const adjustTextareaHeight = (target: HTMLTextAreaElement) => {
    target.style.height = "32px";
    const maxHeight = 64;
    const minHeight = 32;
    const scrollHeight = target.scrollHeight;

    if (scrollHeight > minHeight) {
      target.style.height = Math.min(scrollHeight, maxHeight) + "px";
    } else {
      target.style.height = minHeight + "px";
    }
  };
  const onChangeQuestionInputWithTextareaSize = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    adjustTextareaHeight(event.target);
    onChangeQuestionInput(event);
  };

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

  return (
    <div className="promptConsole h-20 fixed bottom-0 w-full flex items-center justify-center opacity-95 backdrop-blur-sm backdrop-saturate-100 bg-vert-light-gradient dark:bg-transparent dark:bg-vert-dark-gradient">
      <form
        onSubmit={(e) => {
          onClickSubmitMsg({ e, prompt: questionInput, isContextMode: false });
        }}
        className="w-full max-w-[90%] sm:max-w-[70%] md:max-w-[40%] flex items-center "
      >
        {chatSavedStatus === "T" ? (
          <input
            className="rounded-full bg-white dark:bg-gray-500 flex-grow mr-4 p-2 text-xs text-gray-500 dark:text-gray-300"
            value={"새 채팅을 시작하세요"}
            disabled
          />
        ) : (
          <textarea
            value={questionInput}
            onChange={onChangeQuestionInputWithTextareaSize}
            className="rounded-full resize-none bg-white dark:bg-gray-500 text-black dark:text-gray-100 flex-grow mr-4 p-2 text-xs h-[32px] overflow-hidden outline-secondary"
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
  );
};

export default PromptConsole;
