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

export const getAllChatPostsByUserId = async () => {
  const response = await GET("chatposts/my-chats");
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

export const getAllCategories = async () => {
  const response = await GET("categories");
  return response;
};
