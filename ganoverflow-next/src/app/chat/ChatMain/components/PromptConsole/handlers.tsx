import { fetchUpdateStreamAnswer } from "@/app/chat/api/chat";
import { chatPairsState, questionInputState } from "@/atoms/chat";
import { IChatPair } from "@/interfaces/chat";
import { ChatGPTAgent, ChatGPTMessageChain } from "@/utils/openAI/chatGPT";
import { Dispatch, FormEvent, SetStateAction } from "react";
import { useRecoilState } from "recoil";

export const GetHandleQuestionInput = (setQuestionInput: any) => {
  return (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setQuestionInput(e.target.value);
  };
};

export const GetHandleSubmitMsg = ({
  isNowAnswering,
  currStream,
  setIsNowAnswering,
  setCurrStream,
}: {
  isNowAnswering: boolean;
  currStream: string;
  setIsNowAnswering: Dispatch<SetStateAction<boolean>>;
  setCurrStream: Dispatch<SetStateAction<string>>;
}) => {
  const [questionInput, setQuestionInput] = useRecoilState(questionInputState);
  const [chatPairs, setChatPairs] = useRecoilState(chatPairsState);

  return async ({
    e,
    prompt,
    isContextMode,
  }: {
    e: FormEvent;
    prompt: string;
    isContextMode: boolean;
  }) => {
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

    // 맥락모드 에 따른 대화 구성 (함수형 프로그래밍 기반 체이닝 방식 구현)
    const promptsChain = isContextMode
      ? composePromptsForContext(prompt, chatPairs)
      : new ChatGPTMessageChain().pushChat(ChatGPTAgent.user, prompt);

    const cmdTypeCute = "Say cutely";
    const cmdLanguageKorean = "Answer in Korean";
    const systemCmds = []; // system command 적용
    const prompts = promptsChain.get(); // .appendSystemCommands(systemCmds).get();

    // 사용자 질문만 먼저 업데이트 -> view에 마운트
    setChatPairs((prevChat: any) => [
      ...prevChat,
      {
        question: questionInput,
        answer: "",
        isChecked: false,
      },
    ]);

    await fetchUpdateStreamAnswer({
      prompts,
      currStream,
      setCurrStream,
      setIsNowAnswering,
    });
  };
};

const composePromptsForContext = (
  prompt: string,
  chatPairs: IChatPair[]
): ChatGPTMessageChain => {
  const promptsChain = new ChatGPTMessageChain();

  // 사전 대화들을 맥락에 추가
  chatPairs.forEach((chatPair) => {
    promptsChain.pushChatPairs(chatPair.question, chatPair.answer);
  });

  // 마지막으로 주어진 prompt를 user로 추가
  promptsChain.pushChat(ChatGPTAgent.user, prompt);

  console.log("chatPairs!!!: ", chatPairs);
  console.log("prompts!!!: ", ...promptsChain.get());
  return promptsChain;
};
