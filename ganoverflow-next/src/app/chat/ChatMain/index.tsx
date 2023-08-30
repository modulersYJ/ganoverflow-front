"use client";
import { useState } from "react";
import { IChatMainProps } from "@/interfaces/IProps/chat";

import {
  ChatContent,
  ChatControlsBtns,
  ChatTitle,
  PromptConsole,
  SaveChatModal,
} from "./components";

const ChatMain = ({ onClickNewChatBtn, scrollRef }: IChatMainProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categories, setCategories] = useState<{ categoryName: string }[]>([]);
  const [isNowAnswering, setIsNowAnswering] = useState<boolean>(false);

  return (
    <div className="flex flex-col h-full " ref={scrollRef}>
      {isModalOpen && (
        <SaveChatModal
          categories={categories}
          setIsModalOpen={setIsModalOpen}
        />
      )}
      <ChatTitle />
      <ChatContent />
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
