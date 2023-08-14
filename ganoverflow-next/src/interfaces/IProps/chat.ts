import { ChatSavedStatus, IChatPair, TLoadThisChatHandler } from "../chat";

export interface IChatMainProps {
  onChangeTitleAndCategory: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  onChangeMessage: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeCheckBox: (index: number) => void;
  onClickNewChatBtn: (e: React.MouseEvent) => void;
  onClickContinueChat: (e: React.MouseEvent) => void;

  onClickSaveChatpostInit: (e: React.MouseEvent) => Promise<boolean>;

  onClickSaveChatpostExec: (e: React.MouseEvent) => void;
  onClickSubmitMsg: (e: React.FormEvent, prompt: string) => void;
  questionInput: string;
  chatSavedStatus: ChatSavedStatus;
  checkCnt: number;
  chatPairs: IChatPair[];
  scrollRef: React.RefObject<HTMLDivElement>;
}

export interface IChatSideBarProps {
  onClickNewChatBtn: (e: React.MouseEvent) => void;
  chatSavedStatus: ChatSavedStatus;
  loadThisChatHandler: TLoadThisChatHandler;
}

export interface IFetchStreamAnswerProps {
  prompt: string;
  currStream: string;
  setCurrStream: any;
  setIsNowAnswering: any;
}

export interface ISaveChatModalProps {
  onClickSaveChatpostExec: (e: React.MouseEvent) => void;
  onChangeTitleAndCategory: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  categories: { categoryName: string }[];
  setIsModalOpen: (value: boolean) => void;
}

export interface ITitleAndCategory {
  chatpostName: string | undefined;
  category?: string | undefined;
}
