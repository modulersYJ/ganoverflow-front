export interface IChat {
  prompt: string;
}

export interface IChatMessage {
  question: string;
  answer: string;
  isUser: boolean;
  isChecked: boolean;
}
