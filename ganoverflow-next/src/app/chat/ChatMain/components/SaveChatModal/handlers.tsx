import { putChatPost, sendChatPost } from "@/app/chat/api/chat";
import { TLoadChatStatus } from "@/atoms/chat";
import { useSignedCheck } from "@/hooks/useSignedCheck";
import { ITitleAndCategory } from "@/interfaces/IProps/chat";
import { ChatSavedStatus, IChatPair } from "@/interfaces/chat";
import { Dispatch, SetStateAction } from "react";
import { SetterOrUpdater } from "recoil";

export const GetHandleChangeTitleAndCategory = (
  titleAndCategory: ITitleAndCategory,
  setTitleAndCategory: Dispatch<SetStateAction<ITitleAndCategory>>
) => {
  return (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    console.log(e.target.value, e.target.name);
    setTitleAndCategory({
      ...titleAndCategory,
      [e.target.name]: e.target.value,
    });
  };
};

export const GetHandleSaveChatpostExec = (
  chatPairs: IChatPair[],
  loadChatStatus: any,
  titleAndCategory: ITitleAndCategory,
  setLoadChatStatus: SetterOrUpdater<any>,
  setChatSavedStatus: SetterOrUpdater<ChatSavedStatus>
) => {
  const checkUserSigned = useSignedCheck();

  return async (e: React.MouseEvent) => {
    const selectedPairs = chatPairs.filter((aPair) => {
      return aPair.isChecked === true;
    });
    const chatPostBody = {
      chatpostName: titleAndCategory?.chatpostName,
      categoryName: titleAndCategory?.category,
      chatPair: selectedPairs,
    };

    const isUserSignedIn = await checkUserSigned();

    if (!isUserSignedIn) {
      console.log("로그인이 필요합니다.");
      return;
    }

    if (loadChatStatus.status === TLoadChatStatus.UPDATING) {
      const chatpostName =
        titleAndCategory?.chatpostName === ""
          ? loadChatStatus.loadedMeta?.title
          : titleAndCategory?.chatpostName;
      const categoryName =
        titleAndCategory?.category === ""
          ? loadChatStatus.loadedMeta?.category
          : titleAndCategory?.category;

      const putChatPostBody = {
        ...chatPostBody,
        chatpostName,
        categoryName,
        folderId: loadChatStatus.loadedMeta?.folderId,
      };
      console.log("putChatPostBody", putChatPostBody);

      await putChatPost(loadChatStatus.loadedMeta?.chatPostId, putChatPostBody);

      setLoadChatStatus({ status: TLoadChatStatus.F, loadedMeta: undefined });
      setChatSavedStatus("T");
      return;
    }

    await sendChatPost(chatPostBody);
    setChatSavedStatus("T");
    return;
  };
};

export const GetHandleSaveWithValidation = ({
  onClickSaveChatpostExec,
  setIsModalOpen,
  setValidationMessage,
}: {
  onClickSaveChatpostExec: (e: React.MouseEvent) => void;
  setIsModalOpen: (value: boolean) => void;
  setValidationMessage: Dispatch<SetStateAction<string>>;
}) => {
  return (e: React.MouseEvent<HTMLButtonElement>) => {
    const inputTitle = (
      document.querySelector("[name='chatpostName']") as HTMLInputElement
    ).value;

    if (inputTitle.length <= 2) {
      setValidationMessage("3글자 이상의 제목을 입력해주세요");
      e.preventDefault();
      return;
    }

    setValidationMessage("");
    onClickSaveChatpostExec(e);
    setIsModalOpen(false);
  };
};
