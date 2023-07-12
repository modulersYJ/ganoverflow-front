import { POST } from "@/app/api/routeModule";
import { GET } from "@/app/api/routeModule";

import { IChat, IChatPostSendDTO } from "@/interfaces/chat";
import { chatAPI as API } from "@/app/api/axiosInstanceManager";
import { chatPostAPI } from "@/app/api/axiosInstanceManager";
import { GenerateAuthHeader, IAuthData } from "@/app/api/jwt";

export const sendChatPost = async (
  chatPostBody: IChatPostSendDTO,
  authData: IAuthData | undefined
) => {
  if (authData === undefined) {
    throw new Error("authData is undefined");
  }
  const response = await POST(
    chatPostAPI,
    "/",
    chatPostBody,
    GenerateAuthHeader(authData)
  );

  return response;
};

export const getAllChatPostsByUserId = async (
  userId: string,
  authData: IAuthData
) => {
  const response = await GET("chatposts/my-chats", {
    params: userId,
    headers: GenerateAuthHeader(authData),
  });
  return response;
};

export const getFoldersByUser = async (userId: string, authData: IAuthData) => {
  console.log("getFoldersByUser authData:", authData);

  if (authData === undefined) {
    throw new Error("authData is undefined");
  }
  const response = await GET("folders", {
    params: userId,
    headers: GenerateAuthHeader(authData),
    revalidateTime: NaN,
  });

  return response;
};
