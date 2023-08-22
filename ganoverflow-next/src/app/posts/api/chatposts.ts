import { commentAPI, starAPI } from "@/app/api/axiosInstanceManager";
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
  chatPostId: string
) => {
  const res = await POST({
    API: commentAPI,
    endPoint: `${chatPostId}`,
    body: commentData,
    isAuth: true,
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
}: {
  chatPostId: string;
  value: number;
}) => {
  const body = {
    chatPostId: chatPostId,
    like: value,
  };
  const res = await POST({
    API: starAPI,
    endPoint: "",
    isAuth: true,
    body,
  });
  return res;
};
