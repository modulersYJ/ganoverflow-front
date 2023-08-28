import { GET } from "@/app/api/routeModule";

export const getMypageData = async () => {
  const response = await GET(`user/my-page`, {
    isAuth: true,
  });
  return response;
};
