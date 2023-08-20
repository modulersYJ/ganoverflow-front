import { loadChatStatusState } from "@/atoms/chat";
import { useRecoilValue } from "recoil";

const ChatTitle = () => {
  const loadChatStatus = useRecoilValue(loadChatStatusState);

  return (
    <div className="chatmain-title h-10 flex flex-col justify-center border-b-solid border-b-[1px] border-b-gray-400">
      <p className="font-normal text-md text-gray-500">
        {loadChatStatus.loadedMeta?.title
          ? loadChatStatus.loadedMeta?.title
          : `새로운 채팅 시작`}
      </p>
    </div>
  );
};

export default ChatTitle;
