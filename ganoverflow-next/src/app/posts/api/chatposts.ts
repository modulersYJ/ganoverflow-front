import { GET } from "@/app/api/routeModule";

export const getAllChatPost = async () => {
  const response = await GET("chatposts");
  return response;
};
