import { fetchUpdateStreamAnswer } from "@/app/chat/api/chat";
import { chatPairsState, questionInputState } from "@/atoms/chat";
import { Dispatch, FormEvent, SetStateAction } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";

export const GetHandleQuestionInput = (setQuestionInput: any) => {
  return (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuestionInput(e.target.value);
  };
};

export const GetHandleSubmitMsg = (
  isNowAnswering: boolean,
  currStream: string,
  setIsNowAnswering: Dispatch<SetStateAction<boolean>>,
  setCurrStream: Dispatch<SetStateAction<string>>
) => {
  const [questionInput, setQuestionInput] = useRecoilState(questionInputState);
  const setChatPairs = useSetRecoilState(chatPairsState);

  return async (e: FormEvent, prompt: string) => {
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
};
