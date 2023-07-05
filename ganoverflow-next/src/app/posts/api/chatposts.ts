import { commentAPI } from "@/app/api/axiosInstanceManager";
import { GenerateAuthHeader, IAuthData } from "@/app/api/jwt";
import { GET, POST } from "@/app/api/routeModule";

export const getAllChatPost = async () => {
  const response = await GET("chatposts");
  return response;
};

export const getOneChatPost = async (chatPostId: string) => {
  const response = await GET(`chatposts/public/${chatPostId}`);
  return response;
};

export const postComment = async (
  commentData: string,
  authData: IAuthData,
  chatPostId: string
) => {
  const res = await POST(
    commentAPI,
    `${chatPostId}`,
    commentData,
    GenerateAuthHeader(authData)
  );
  return res;
};

export const getComments = async (chatPostId: string) => {
  const res = await GET(`comments/all/${chatPostId}`);
  return res;
};
