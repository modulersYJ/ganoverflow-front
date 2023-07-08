import { POST } from "@/app/api/routeModule";
import { GET } from "@/app/api/routeModule";

import { IChat, IChatPostSendDTO } from "@/interfaces/chat";
import { chatAPI as API } from "@/app/api/axiosInstanceManager";
import { chatPostAPI } from "@/app/api/axiosInstanceManager";
import { GenerateAuthHeader, IAuthData } from "@/app/api/jwt";

export const sendChat = async (userData: IChat) => {
  const response = await POST(API, "/", userData, null);
  return response.data;
};

export const sendChatPost = async (
  chatPostBody: IChatPostSendDTO,
  authData: IAuthData
) => {
  const response = await POST(
    chatPostAPI,
    "/",
    chatPostBody,
    GenerateAuthHeader(authData)
  );

  return response;
};

export const getAllChatPosts = async () => {
  const response = await GET("chatposts");
  return response;
};

export const getFoldersByUser = async (userId: string, authData: IAuthData) => {
  console.log("getFoldersByUser authData:", authData);

  const response = await GET(
    "folders",
    userId,
    await GenerateAuthHeader(authData)
  );

  return response;
};

// export const getOneChatPost = async () => {
//   const response = await GET("chatposts");

//   return response;
// };
