import { putChatPost, sendChatPost } from "@/app/chat/api/chat";
import { TLoadChatStatus } from "@/atoms/chat";
import { useSignedCheck } from "@/hooks/useSignedCheck";
import { IPostMetaInput } from "@/interfaces/IProps/chat";
import { ChatSavedStatus, IChatPair } from "@/interfaces/chat";
import { Dispatch, SetStateAction } from "react";
import { SetterOrUpdater } from "recoil";

export const GetOnChangePostMetaInput = (
  postMetaInput: IPostMetaInput,
  setPostMetaInput: Dispatch<SetStateAction<IPostMetaInput>>
) => {
  return (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    console.log(e.target.value, e.target.name);
    setPostMetaInput({
      ...postMetaInput,
      [e.target.name]: e.target.value,
    });
  };
};

export const GetHandleSaveChatpostExec = (
  chatPairs: IChatPair[],
  loadChatStatus: any,
  postMetaInput: IPostMetaInput,
  setLoadChatStatus: SetterOrUpdater<any>,
  setChatSavedStatus: SetterOrUpdater<ChatSavedStatus>
) => {
  const checkUserSigned = useSignedCheck();

  return async (e: React.MouseEvent) => {
    const selectedPairs = chatPairs.filter((aPair) => {
      return aPair.isChecked === true;
    });
    const chatPostBody = {
      chatpostName: postMetaInput?.chatpostName,
      categoryName: postMetaInput?.category,
      tags: postMetaInput?.tags,
      chatPair: selectedPairs,
    };

    const isUserSignedIn = await checkUserSigned();

    if (!isUserSignedIn) {
      console.log("로그인이 필요합니다.");
      return;
    }

    if (loadChatStatus.status === TLoadChatStatus.UPDATING) {
      const chatpostName =
        postMetaInput?.chatpostName === ""
          ? loadChatStatus.loadedMeta?.title
          : postMetaInput?.chatpostName;
      const categoryName =
        postMetaInput?.category === ""
          ? loadChatStatus.loadedMeta?.category
          : postMetaInput?.category;
      const tags =
        postMetaInput?.tags?.length === 0
          ? loadChatStatus.loadedMeta?.tags
          : postMetaInput?.tags;

      const putChatPostBody = {
        ...chatPostBody,
        chatpostName,
        categoryName,
        tags,
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
