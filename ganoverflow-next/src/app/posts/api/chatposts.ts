import { GET } from "@/app/api/routeModule";

export const getAllChatPost = async () => {
  const response = await GET("chatposts");
  return response;
};

export const getOneChatPost = async (chatPostId: string) => {
  const response = await GET(`chatposts/public/${chatPostId}`);
  return response;
};
