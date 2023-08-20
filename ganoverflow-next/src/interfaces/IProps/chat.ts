import { IAuthData } from "@/app/api/jwt";
import { ChatSavedStatus, IChatPair, TLoadThisChatHandler } from "../chat";

export interface IChatMainProps {
  authData: IAuthData | undefined;
  onClickNewChatBtn: (e: React.MouseEvent) => void;
  scrollRef: React.RefObject<HTMLDivElement>;
}

export interface IChatSideBarProps {
  onClickNewChatBtn: (e: React.MouseEvent) => void;
}

export interface IFetchStreamAnswerProps {
  prompt: string;
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
