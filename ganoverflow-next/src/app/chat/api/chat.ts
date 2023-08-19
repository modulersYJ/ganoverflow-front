import { POST, PUT, PATCH, DELETE } from "@/app/api/routeModule";
import { GET } from "@/app/api/routeModule";

import {
  IChatPostPutDTO,
  IChatPostSendDTO,
  IFolderWithPostsDTO,
} from "@/interfaces/chat";
import { chatPostAPI, userAPI } from "@/app/api/axiosInstanceManager";
import { GenerateAuthHeader, IAuthData } from "@/app/api/jwt";
import { IFetchStreamAnswerProps } from "@/interfaces/IProps/chat";
import { getSessionStorageItem } from "@/utils/common/sessionStorage";

export const sendChatPost = async (
  chatPostBody: IChatPostSendDTO,
  authData: IAuthData | undefined
) => {
  if (authData === undefined) {
    throw new Error("authData is undefined");
  }
  const response = await POST({
    API: chatPostAPI,
    endPoint: "/",
    body: chatPostBody,
    authHeaders: GenerateAuthHeader(authData),
  });

  return response.data;
};

export const putChatPost = async (
  chatPostId: string | undefined,
  chatPostBody: IChatPostPutDTO,
  authData: IAuthData | undefined
) => {
  if (authData === undefined) {
    throw new Error("authData is undefined");
  }
  const response = await PUT({
    API: chatPostAPI,
    endPoint: "/",
    params: chatPostId,
    body: chatPostBody,
    authHeaders: GenerateAuthHeader(authData),
  });

  return response.data;
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

export const getOneChatPostById = async (
  chatpostId: string,
  authData: IAuthData
) => {
  const response = await GET("chatposts", {
    params: chatpostId,
    headers: GenerateAuthHeader(authData),
  });
  return response;
};

export const getFoldersByUser = async (userId: string, authData: IAuthData) => {
  console.log("getFoldersByUser authData:", authData);

  if (authData === undefined) {
    return { error: "authData is undefined" };
  }

  try {
    const response = await GET("user/folders", {
      params: userId,
      headers: GenerateAuthHeader(authData),
      revalidateTime: NaN,
    });

    return response;
  } catch (error: any) {
    if (error.response && error.response.status === 404) {
      console.log("Error 404: Resource not found");
      return [];
    }
    console.log("Error fetching folders");
    return [];
  }
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
    alert("authData is undefined");
    return [];
  }

  try {
    const updatedFoldersWithPosts = await PUT({
      API: userAPI,
      endPoint: "folders",
      body: newFoldersWithPosts,
      authHeaders: GenerateAuthHeader(authData),
      params: userId,
    });

    return updatedFoldersWithPosts.data;
  } catch (error: any) {
    if (error.response && error.response.status === 404) {
      console.log("Error 404: Resource not found");
      return [];
    }
    throw new Error("Error updating folders - maybe unauthorized sideEffect");
  }
};

//
export const deleteChatpost = async ({
  authData,
  chatpostId,
}: {
  authData: IAuthData;
  chatpostId: string;
}): Promise<any> => {
  if (authData === undefined) {
    throw new Error("authData is undefined");
  }

  try {
    const updatedFolders = await DELETE({
      API: chatPostAPI,
      endPoint: "",
      params: chatpostId,
      body: { userId: authData.userId },
      authHeaders: GenerateAuthHeader(authData),
    });

    return updatedFolders.data;
  } catch (error: any) {
    throw new Error(`Failed to delete chatpost: ${error.message}`);
  }
};

export const deleteChatpostsByFolder = async ({
  authData,
  folderId,
}: {
  authData: IAuthData;
  folderId: IFolderWithPostsDTO["folderId"];
}) => {
  if (authData === undefined) {
    alert("authData is undefined");
    return [];
  }

  try {
    const updatedFolders = await DELETE({
      API: chatPostAPI,
      endPoint: "removeAllByFolderId",
      body: { folderId, userId: authData.userId },
      authHeaders: GenerateAuthHeader(authData),
    });
    return updatedFolders.data;
  } catch (error: any) {
    throw new Error(`Failed to delete chatposts: ${error.message}`);
  }
};

export const updateChatpostName = async (
  chatpostId: string,
  chatpostName: string,
  userId: string | null,
  folderId: number,
  authData: IAuthData
): Promise<IFolderWithPostsDTO[]> => {
  if (authData === undefined) {
    throw new Error("authData is undefined");
  }

  const body = {
    chatpostName,
    userId,
    folderId,
  };

  console.log("updateChatpostName body", body);

  const updatedFoldersWithPosts = await PATCH({
    API: chatPostAPI,
    endPoint: "",
    body,
    authHeaders: GenerateAuthHeader(authData),
    params: chatpostId,
  });
  return updatedFoldersWithPosts.data;
};

// No need to cache
export const fetchUpdateStreamAnswer = async ({
  prompts,
  currStream,
  setCurrStream,
  setIsNowAnswering,
}: IFetchStreamAnswerProps) => {
  const response = await fetch("/chat/api", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prompts,
    }),
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const data = response.body;
  if (!data) {
    return;
  }

  const reader = data.getReader();
  const decoder = new TextDecoder();
  let done = false;
  while (!done) {
    const { value, done: doneReading } = await reader.read();
    done = doneReading;
    const chunkValue = decoder.decode(value);

    setCurrStream((prev: string) => prev + chunkValue);
    console.log("currStream 1: ", currStream);
  }
  setIsNowAnswering(false);
};

export const fetchFolderData = async (
  accessToken: string,
  setFoldersData: any,
  setAuthData: any
) => {
  const user = await getSessionStorageItem("userData");

  const authData: IAuthData = {
    accessToken: accessToken,
    userId: user.id,
  };
  setAuthData(authData);
  const chatFoldersByUser = await getFoldersByUser(user.id, authData);
  console.log("fetched FolderData! - 요청 후 정합성", chatFoldersByUser);
  setFoldersData(chatFoldersByUser);
};
