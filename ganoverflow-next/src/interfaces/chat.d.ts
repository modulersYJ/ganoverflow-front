export interface IChat {
  prompt: string;
}

export interface IChatPair {
  question: string;
  answer: string;
  isUser: boolean;
  isChecked: boolean;
}

export interface IChatPostSend {
  title: string;
  chatPair: IChatPair[];
}
