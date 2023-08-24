export enum ChatGPTAgent {
  user = "user",
  assistant = "assistant",
  system = "system",
}

export interface ChatGPTMessage {
  role: ChatGPTAgent;
  content: string;
}

export class ChatGPTMessageChain {
  private messages: ChatGPTMessage[];

  constructor(messages: ChatGPTMessage[] = []) {
    // 배열을 직접 복사하여 외부에서의 변경 방지
    this.messages = [...messages];
  }

  appendSystemCommands(systemCmds: string[]): ChatGPTMessageChain {
    const newMessages = systemCmds.map((cmd) => ({
      role: ChatGPTAgent.system,
      content: cmd,
    }));
    return new ChatGPTMessageChain([...this.messages, ...newMessages]);
  }

  pushChatPairs(userMsg: string, assistantMsg: string): ChatGPTMessageChain {
    const newUserMessage = {
      role: ChatGPTAgent.user,
      content: userMsg,
    };
    const newAssistantMessage = {
      role: ChatGPTAgent.assistant,
      content: assistantMsg,
    };
    return new ChatGPTMessageChain([
      ...this.messages,
      newUserMessage,
      newAssistantMessage,
    ]);
  }

  pushChat(role: ChatGPTAgent, content: string): ChatGPTMessageChain {
    const newMessage = {
      role: role,
      content: content,
    };
    return new ChatGPTMessageChain([...this.messages, newMessage]);
  }

  get(): ChatGPTMessage[] {
    // 배열을 직접 복사하여 외부에서의 변경 방지
    return [...this.messages];
  }
}
