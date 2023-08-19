import { IAuthData } from "@/app/api/jwt";
import { ChatSavedStatus, IChatPair, TLoadThisChatHandler } from "../chat";
import { ChatGPTAgent, ChatGPTMessage } from "@/utils/openAI/openAIStream";

export interface IChatMainProps {
  authData: IAuthData | undefined;
  onClickNewChatBtn: (e: React.MouseEvent) => void;
  scrollRef: React.RefObject<HTMLDivElement>;
}

export interface IChatSideBarProps {
  onClickNewChatBtn: (e: React.MouseEvent) => void;
}

export enum TPromptRole {
  user = "user",
  assistant = "assistant",
  system = "system",
}

export interface IFetchStreamAnswerProps {
  prompts: ChatGPTMessage[];
  currStream: string;
  setCurrStream: any;
  setIsNowAnswering: any;
}

export interface ISaveChatModalProps {
  authData: IAuthData | undefined;
  categories: { categoryName: string }[];
  setIsModalOpen: (value: boolean) => void;
}

export interface ITitleAndCategory {
  chatpostName: string | undefined;
  category?: string | undefined;
}
