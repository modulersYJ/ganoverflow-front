import { SetterOrUpdater } from "recoil";
import { IChatPair } from "@/interfaces/chat";

export const GetHandleCheckBox = (
  chatPairs: IChatPair[],
  setChatPairs: SetterOrUpdater<IChatPair[]>,
  setCheckCnt: SetterOrUpdater<number>
) => {
  return (index: number) => {
    setChatPairs((prevChatPairs) => {
      const newChatPairs = [...prevChatPairs];
      newChatPairs[index] = {
        ...newChatPairs[index],
        isChecked: !newChatPairs[index].isChecked,
      };
      return newChatPairs;
    });
    setCheckCnt(
      (prevCheckCnt) => prevCheckCnt + (chatPairs[index].isChecked ? -1 : 1)
    );
  };
};