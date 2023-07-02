import { AuthPOST } from "@/app/api/routeModule";
import { GET } from "@/app/api/routeModule";

import { IChat, IChatPostSend } from "@/interfaces/chat";
import { chatAPI as API } from "@/app/api/axiosInstanceManager";
import { chatPostAPI } from "@/app/api/axiosInstanceManager";
import { IAuthData } from "@/app/api/jwt";

export const chat = async (userData: IChat): Promise<{ bot: string }> => {
  const response = await API.post("/", userData);
  return response.data;
};

export const sendChatPost = async (
  chatPostBody: IChatPostSend,
  authData: IAuthData
) => {
  const response = await AuthPOST(chatPostAPI, "", chatPostBody, authData);

  return response;
};

export const getAllChatPosts = async () => {
  const response = await GET("chatposts");

  return response;
};

export const getChatPostsByUser = async (userId: string) => {
  const response = await GET("chatposts", { userId });

  return response;
};

// export const getOneChatPost = async () => {
//   const response = await GET("chatposts");

//   return response;
// };
