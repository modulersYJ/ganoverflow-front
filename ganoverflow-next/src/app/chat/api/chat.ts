import { POST, PUT } from "@/app/api/routeModule";
import { GET } from "@/app/api/routeModule";

import {
  IChat,
  IChatPostSendDTO,
  IFolderWithPostsDTO,
} from "@/interfaces/chat";
import { chatAPI as API } from "@/app/api/axiosInstanceManager";
import { chatPostAPI, userAPI } from "@/app/api/axiosInstanceManager";
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
  const response = await GET("user/folders", {
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

// 포스트 소속 변경 or 폴더 추가/제거 시
export const putFoldersByUser = async (
  userId: string,
  newFoldersWithPosts: IFolderWithPostsDTO[],
  authData: IAuthData
): Promise<IFolderWithPostsDTO[]> => {
  if (authData === undefined) {
    throw new Error("authData is undefined");
  }

  const updatedFoldersWithPosts = await PUT(
    userAPI,
    "folders",
    newFoldersWithPosts,
    GenerateAuthHeader(authData),
    userId
  );

  return updatedFoldersWithPosts.data;
};
