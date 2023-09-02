import { fetchUpdateStreamAnswer } from "@/app/chat/api/chat";
import { chatPairsState, questionInputState } from "@/atoms/chat";
import { IChatPair } from "@/interfaces/chat";
import { ChatGPTAgent, ChatGPTMessageChain } from "@/utils/openAI/chatGPT";
import { Dispatch, FormEvent, SetStateAction } from "react";
import { useRecoilState } from "recoil";
import _ from "lodash";

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
    setCurrStream("");

    //
    const systemCmds: string[] = ['say friendly']; // 배열에 시스템커맨드 넣어주면 자동적용되어요

    const prompts = _(true) // lodash 체이닝 (true=시작의 의미, 로직영향X)
      .thru(() => getInitialPromptsChain(isContextMode, prompt, chatPairs))
      .thru((chain) => applySystemCommandsIfNotEmpty(chain, systemCmds))
      .value()
      .get();

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

//
const composePromptsForContext = (
  prompt: string,
  chatPairs: IChatPair[]
): ChatGPTMessageChain => {
  let promptsChain = new ChatGPTMessageChain();

  chatPairs.forEach((chatPair) => {
    promptsChain = promptsChain.pushChatPairs(
      chatPair.question,
      chatPair.answer
    );
  });

  promptsChain = promptsChain.pushChat(ChatGPTAgent.user, prompt);

  return promptsChain;
};

const getInitialPromptsChain = (
  isContext: boolean,
  userPrompt: string,
  pairs: IChatPair[]
) =>
  isContext
    ? composePromptsForContext(userPrompt, pairs)
    : new ChatGPTMessageChain().pushChat(ChatGPTAgent.user, userPrompt);

const applySystemCommandsIfNotEmpty = (
  chain: ChatGPTMessageChain,
  cmds: string[]
) => (cmds.length > 0 ? chain.appendSystemCommands(cmds) : chain);
