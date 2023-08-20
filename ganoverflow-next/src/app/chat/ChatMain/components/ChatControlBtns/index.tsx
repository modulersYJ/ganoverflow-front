import {
  TLoadChatStatus,
  chatPairsState,
  chatSavedStatusState,
  checkCntState,
  loadChatStatusState,
  questionInputState,
} from "@/atoms/chat";
import { BtnSubmitSaveChat } from "./BtnSubmitSaveChat";
import { useRecoilState, useSetRecoilState } from "recoil";
import { GetHandleContinueChat, GetHandleSaveChatpostInit } from "./handlers";
import { Dispatch, SetStateAction } from "react";

const ChatControlsBtns = ({
  onClickNewChatBtn,
  isNowAnswering,
  setCategories,
  setIsModalOpen,
}: {
  onClickNewChatBtn: (e: React.MouseEvent<Element, MouseEvent>) => void;
  isNowAnswering: boolean;
  setCategories: Dispatch<
    SetStateAction<
      {
        categoryName: string;
      }[]
    >
  >;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const [chatSavedStatus, setChatSavedStatus] =
    useRecoilState(chatSavedStatusState);
  const [loadChatStatus, setLoadChatStatus] =
    useRecoilState(loadChatStatusState);
  const [checkCnt, setCheckCnt] = useRecoilState(checkCntState);
  const chatPairs = useSetRecoilState(chatPairsState);
  const setQuestionInput = useSetRecoilState(questionInputState);

  const onClickSaveChatpostInit = GetHandleSaveChatpostInit(
    isNowAnswering,
    setChatSavedStatus
  );
  const onClickContinueChat = GetHandleContinueChat(
    loadChatStatus,
    chatPairs,
    setLoadChatStatus,
    setCheckCnt,
    setChatSavedStatus,
    setQuestionInput
  );

  return (
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
        <button
          className="w-36 h-12 bg-gray-700 text-white font-bold text-md rounded-3xl"
          onClick={onClickNewChatBtn}
        >
          새 채팅 시작
        </button>
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
  );
};

export default ChatControlsBtns;
