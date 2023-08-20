export enum ChatGPTAgent {
  user = "user",
  assistant = "assistant",
  system = "system",
}

export interface ChatGPTMessage {
  role: ChatGPTAgent;
  content: string;
}

// 함수형 기반 구현
export class ChatGPTMessageChain {
  constructor(private messages: ChatGPTMessage[] = []) {}

  appendSystemCommands(systemCmds: string[]): ChatGPTMessageChain {
    systemCmds.forEach((cmd) => {
      this.messages.push({
        role: ChatGPTAgent.system,
        content: cmd,
      });
    });
    return this;
  }

  pushChatPairs(userMsg: string, assistantMsg: string): ChatGPTMessageChain {
    this.messages.push({
      role: ChatGPTAgent.user,
      content: userMsg,
    });
    this.messages.push({
      role: ChatGPTAgent.assistant,
      content: assistantMsg,
    });
    return this;
  }

  pushChat(role: ChatGPTAgent, content: string): ChatGPTMessageChain {
    this.messages.push({
      role: role,
      content: content,
    });
    return this;
  }

  get(): ChatGPTMessage[] {
    return this.messages;
  }
}
