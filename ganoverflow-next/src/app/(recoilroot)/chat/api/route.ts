import { chat } from "@/app/api/chat";
import { POST } from "@/app/api/routeModule";
import { GET } from "@/app/api/routeModule";
import { IChatPost } from "@/interfaces/chat";

export const sendChatPost = async (chatPostBody: IChatPost) => {
  const response = await POST("chatposts", chatPostBody);
  console.log("server res", response);
  return response;
};

export const getChatPosts = async () => {
  const response = await GET("chatposts");
  console.log("server res", response);
  console.log("server res", response.data);
  return response;
};
