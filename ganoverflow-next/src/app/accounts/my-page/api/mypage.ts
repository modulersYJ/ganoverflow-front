import { GenerateAuthHeader, IAuthData } from "@/app/api/jwt";
import { GET } from "@/app/api/routeModule";

export const getMypageData = async ({ authData }: { authData: IAuthData }) => {
  const response = await GET(`user/my-page`, {
    headers: GenerateAuthHeader(authData),
  });
  return response;
};
