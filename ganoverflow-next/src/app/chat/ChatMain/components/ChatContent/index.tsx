import {
  TLoadChatStatus,
  chatPairsState,
  chatSavedStatusState,
  checkCntState,
  loadChatStatusState,
} from "@/atoms/chat";
import CircularCheckbox from "@/components/common/CheckBox/CircularCheckBox";
import { ChatPairWrapper, MarkdownWrapper, MsgBox } from "./components";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { GetHandleCheckBox } from "./handlers";
import { IChatPair } from "@/interfaces/chat";

const ChatContent = () => {
  const [chatPairs, setChatPairs] = useRecoilState(chatPairsState);
  const setCheckCnt = useSetRecoilState(checkCntState);
  const chatSavedStatus = useRecoilValue(chatSavedStatusState);
  const loadChatStatus = useRecoilValue(loadChatStatusState);

  const onChangeCheckBox = GetHandleCheckBox(
    chatPairs,
    setChatPairs,
    setCheckCnt
  );

  return (
    <div className="chatCont flex-grow overflow-y-auto flex justify-center mb-[96px]">
      <div className="chatBox w-full">
        {chatPairs?.map((chatLine: IChatPair, index: number) => (
          <ChatPairWrapper key={`${index}:${chatLine.question}`} index={index}>
            <div className="chatPairBox w-full flex flex-col justify-center self-center">
              {chatLine.question && (
                <MsgBox isQuestion={true}>{chatLine.question}</MsgBox>
              )}

              {chatLine.answer && (
                <MsgBox isQuestion={false}>
                  <MarkdownWrapper>{chatLine.answer}</MarkdownWrapper>
                </MsgBox>
              )}
            </div>
            {!(loadChatStatus.status === TLoadChatStatus.SHOWING) && (
              <div className="checkboxContainer ml-12 w-full sm:w-3 sm:h-full">
                <div className="flex flex-row justify-end w-full h-full">
                  <CircularCheckbox
                    isDisabled={chatSavedStatus}
                    isChecked={!!chatLine.isChecked}
                    onChangeCheckBox={() => onChangeCheckBox(index)}
                  />
                </div>
              </div>
            )}
          </ChatPairWrapper>
        ))}
      </div>
    </div>
  );
};

export default ChatContent;
