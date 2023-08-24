import { POST, PUT, PATCH, DELETE } from "@/app/api/routeModule";
import { GET } from "@/app/api/routeModule";

import {
  IChatPostPutDTO,
  IChatPostSendDTO,
  IFolderWithPostsDTO,
} from "@/interfaces/chat";
import { chatPostAPI, userAPI } from "@/app/api/axiosInstanceManager";
import { IFetchStreamAnswerProps } from "@/interfaces/IProps/chat";
import {
  TUserData,
  getSessionStorageItem,
} from "@/utils/common/sessionStorage";

export const sendChatPost = async (chatPostBody: IChatPostSendDTO) => {
  const response = await POST({
    API: chatPostAPI,
    endPoint: "/",
    body: chatPostBody,
    isAuth: true,
  });

  return response.data;
};

export const putChatPost = async (
  chatPostId: string | undefined,
  chatPostBody: IChatPostPutDTO
) => {
  const response = await PUT({
    API: chatPostAPI,
    endPoint: "/",
    params: chatPostId,
    body: chatPostBody,
    isAuth: true,
  });

  return response.data;
};

export const getAllChatPostsByUserId = async (
  userId: TUserData["id"] | null
) => {
  const response = await GET("chatposts/my-chats", {
    params: userId,
    isAuth: true,
  });
  return response;
};

export const getOneChatPostById = async (chatpostId: string) => {
  const response = await GET("chatposts", {
    params: chatpostId,
    isAuth: true,
  });
  return response;
};

export const getFoldersByUser = async (userId: TUserData["id"] | null) => {
  try {
    const response = await GET("user/folders", {
      params: userId,
      isAuth: true,

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
  userId: TUserData["id"] | null | undefined,
  newFoldersWithPosts: IFolderWithPostsDTO[]
): Promise<IFolderWithPostsDTO[]> => {
  try {
    const updatedFoldersWithPosts = await PUT({
      API: userAPI,
      endPoint: "folders",
      body: newFoldersWithPosts,
      isAuth: true,
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
  userId,
  chatpostId,
}: {
  userId: TUserData["id"] | null;
  chatpostId: string;
}): Promise<any> => {
  try {
    const updatedFolders = await DELETE({
      API: chatPostAPI,
      endPoint: "",
      params: chatpostId,
      body: { userId: userId },
      isAuth: true,
    });

    return updatedFolders.data;
  } catch (error: any) {
    throw new Error(`Failed to delete chatpost: ${error.message}`);
  }
};

export const deleteChatpostsByFolder = async ({
  folderId,
  userId,
}: {
  folderId: IFolderWithPostsDTO["folderId"];
  userId: TUserData["id"];
}) => {
  try {
    const updatedFolders = await DELETE({
      API: chatPostAPI,
      endPoint: "removeAllByFolderId",
      body: { folderId, userId: userId },
      isAuth: true,
    });
    return updatedFolders.data;
  } catch (error: any) {
    throw new Error(`Failed to delete chatposts: ${error.message}`);
  }
};

export const updateChatpostName = async (
  chatpostId: string,
  chatpostName: string,
  userId: TUserData["id"] | null,
  folderId: number
): Promise<IFolderWithPostsDTO[]> => {
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
    isAuth: true,
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

export const fetchFolderData = async (setFoldersData: any) => {
  const user = await getSessionStorageItem("userData");

  const chatFoldersByUser = await getFoldersByUser(user?.id);
  console.log("fetched FolderData! - 요청 후 정합성", chatFoldersByUser);
  setFoldersData(chatFoldersByUser);
};
