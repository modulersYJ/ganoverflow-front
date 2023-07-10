import { useRecoilState, useSetRecoilState } from "recoil";
import {
  chatSavedStatusState,
  questionInputState,
  chatPairsState,
  checkCntState,
  formDataState,
} from "../../../atoms/chat";

export const useNewChatStatesHook = () => {
  const [chatSavedStatus, setChatSavedStatus] = useRecoilState(chatSavedStatusState);
  const [questionInput, setQuestionInput] = useRecoilState(questionInputState);
  const [chatPairs, setChatPairs] = useRecoilState(chatPairsState);
  const [checkCnt, setCheckCnt] = useRecoilState(checkCntState);
  const [formData, setFormData] = useRecoilState(formDataState);

  return {
    chatSavedStatus,
    setChatSavedStatus,
    setQuestionInput,
    setChatPairs,
    setCheckCnt,
    setFormData,
  };
};
