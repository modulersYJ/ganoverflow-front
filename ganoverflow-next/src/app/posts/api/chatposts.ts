import { commentAPI, starAPI } from "@/app/api/axiosInstanceManager";
import { GET, POST, PUT } from "@/app/api/routeModule";

export const getAllChatPost = async ({ page }: { page: number }) => {
  const response = await GET(`chatposts?page=${page}`);
  return response;
};

//===============구현중====================
export const getAllChatPostByCategory = async ({
  page,
  category,
  tag,
}: {
  page: number;
  category?: string;
  tag?: string;
}) => {
  const baseUrl = `chatposts/get-by-category?page=${page}`;
  let urlWithFilterQuery = `${baseUrl}`;
  if (category) {
    urlWithFilterQuery = `${baseUrl}&category=${category}`;
  } else if (tag) {
    urlWithFilterQuery = `${baseUrl}&tag=${tag}`;
  }
  console.log("GET EndPoint: ", urlWithFilterQuery);
  const response = await GET(urlWithFilterQuery);
  return response;
};

export const getOneChatPost = async (chatPostId: string) => {
  const response = await GET(`chatposts/public/${chatPostId}`, {
    revalidateTime: 0,
  });
  return response;
};

// 모든 카테고리와 각각에 매치되는 탑5 태그와 그 갯수를 가져옵니다.
export const getCategoriesAndTopTags = async () => {
  const res = await GET("categories/categories-and-top-tags");
  return res;
};

export const postComment = async (
  commentData: { content: string },
  chatPostId: string
) => {
  try {
    const res = await POST({
      API: commentAPI,
      endPoint: `${chatPostId}`,
      body: commentData,
      isAuth: true,
    });
    return res;
  } catch (error: any) {
    if (error.response && error.response.status === 401) {
      console.log("Error 401: 로그인 하세요!");
      return [];
    }
  }
};

export const postReComment = async (
  commentData: { content: string; parent: number },
  chatPostId: string
) => {
  try {
    const res = await POST({
      API: commentAPI,
      endPoint: `recomment/${chatPostId}`,
      body: commentData,
      isAuth: true,
    });
    return res;
  } catch (error: any) {
    if (error.response && error.response.status === 401) {
      console.log("Error 401: 로그인 하세요!");
      return [];
    }
  }
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
  try {
    const res = await POST({
      API: starAPI,
      endPoint: "",
      isAuth: true,
      body,
    });
    return res;
  } catch (error: any) {
    if (error.response && error.response.status === 401) {
      console.log("Error 401: 로그인 하세요!");
      return [];
    }
  }
};

export const putCommentLike = async ({
  commentId,
  didLike,
}: {
  commentId: number;
  didLike: boolean;
}) => {
  const body = {
    didLike: didLike,
  };
  try {
    const res = await PUT({
      API: commentAPI,
      endPoint: `like/${commentId}`,
      isAuth: true,
      body: body,
    });
    return res;
  } catch (e: any) {
    if (e.response && e.response.status === 401) {
      console.log("Error 401 : 로그인 하세요!");
      return [];
    }
  }
};
