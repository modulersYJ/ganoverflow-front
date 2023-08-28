"use client";
import { useState } from "react";
import { IChatMainProps } from "@/interfaces/IProps/chat";
import { useRecoilValue } from "recoil";
import { TIsSigned, isSignedState } from "@/atoms/sign";

import {
  ChatContent,
  ChatControlsBtns,
  ChatTitle,
  PromptConsole,
  SaveChatModal,
} from "./components";
import { LoginBoxModal } from "@/app/accounts/login/LoginBoxModal";

const ChatMain = ({ onClickNewChatBtn, scrollRef }: IChatMainProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categories, setCategories] = useState<{ categoryName: string }[]>([]);
  const [isNowAnswering, setIsNowAnswering] = useState<boolean>(false);

  const isSigned = useRecoilValue(isSignedState);

  return (
    <div className="flex flex-col h-full ">
      {isModalOpen && (
        <SaveChatModal
          categories={categories}
          setIsModalOpen={setIsModalOpen}
        />
      )}
      <ChatTitle />
      <ChatContent scrollRef={scrollRef} />
      <ChatControlsBtns
        onClickNewChatBtn={onClickNewChatBtn}
        isNowAnswering={isNowAnswering}
        setCategories={setCategories}
        setIsModalOpen={setIsModalOpen}
      />
      <PromptConsole
        isNowAnswering={isNowAnswering}
        setIsNowAnswering={setIsNowAnswering}
        scrollRef={scrollRef}
      />
    </div>
  );
};

export default ChatMain;
