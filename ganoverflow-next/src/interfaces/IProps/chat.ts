import { ChatGPTMessage } from "@/utils/openAI/chatGPT";

export interface IChatMainProps {
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
  categories: { categoryName: string }[];
  setIsModalOpen: (value: boolean) => void;
}

export interface IPostMetaInput {
  chatpostName: string | undefined;
  category?: string | undefined;
  tags?: string[];
}
