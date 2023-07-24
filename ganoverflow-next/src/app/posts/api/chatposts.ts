import { commentAPI, starAPI } from "@/app/api/axiosInstanceManager";
import { GenerateAuthHeader, IAuthData } from "@/app/api/jwt";
import { GET, POST } from "@/app/api/routeModule";

export const getAllChatPost = async ({ page }: { page: number }) => {
  const response = await GET(`chatposts?page=${page}`);
  return response;
};

export const getOneChatPost = async (chatPostId: string) => {
  const response = await GET(`chatposts/public/${chatPostId}`, {
    revalidateTime: 0,
  });
  return response;
};

export const postComment = async (
  commentData: { content: string },
  authData: IAuthData,
  chatPostId: string
) => {
  const res = await POST({
    API: commentAPI,
    endPoint: `${chatPostId}`,
    body: commentData,
    authHeaders: GenerateAuthHeader(authData),
  });
  return res;
};

export const getComments = async (chatPostId: string) => {
  const res = await GET(`comments/all/${chatPostId}`);
  return res;
};

export const getStars = async (chatPostId: string) => {
  const res = await GET(`stars/${chatPostId}`);
  return res;
};

export const postStar = async ({
  chatPostId,
  value,
  authData,
}: {
  chatPostId: string;
  value: number;
  authData: IAuthData;
}) => {
  const body = {
    chatPostId: chatPostId,
    like: value,
  };
  const authHeaders = GenerateAuthHeader(authData);
  const res = await POST({
    API: starAPI,
    endPoint: "",
    authHeaders: authHeaders,
    body,
  });
  return res;
};
