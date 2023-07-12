import { ChatSavedStatus, IChatPair, IFolderWithPostsDTO } from "../chat";

export interface IChatMainProps {
  onChangeTitle: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeMessage: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeCheckBox: (index: number) => void;
  onClickNewChatBtn: (e: React.MouseEvent) => void;
  onClickSaveChatpostInit: (e: React.MouseEvent) => void;
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
  foldersData: IFolderWithPostsDTO[];
}

export interface IFetchStreamAnswerProps {
  prompt: string;
  currStream: string;
  setCurrStream: any;
  setIsNowAnswering: any;
}
