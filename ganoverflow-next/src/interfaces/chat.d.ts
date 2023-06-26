export interface IChat {
  prompt: string;
}

export interface IChatMessage {
  userMessage: string;
  botMessage: string;
  isUser: boolean;
  isChecked: boolean;
}
