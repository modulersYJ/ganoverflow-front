import { logout } from "../accounts/login/api/login";

import { POST } from "@/app/api/routeModule";
import { authAPI as API } from "./axiosInstanceManager";

export interface IAuthData {
  accessToken: string | null | undefined;
  userId: string | null;
}

export const GenerateAuthHeader = (authData: IAuthData | undefined) => {
  return {
    headers: {
      Authorization: `Bearer ${authData?.accessToken}`,
    },
  };
};

export const fetchAccessToken = async (
  userId: string | null
): Promise<string> => {
  try {
    const response = await POST({
      API,
      endPoint: "refresh",
    });
    const newAccessToken: string = response.data;
    return newAccessToken;
  } catch (error: any) {
    if (error.response && error.response.data === "Expired token") {
      // Refresh 토큰이 만료된 경우
      // 사용자 데이터를 가져와서 로그아웃 함수를 호출합니다.
      if (userId) {
        await logout(userId);
        return "토큰 만료로 로그아웃됩니다.";
      } else {
        return "유저 데이터를 찾을 수 없습니다.";
      }
    }
    return "토큰 갱신에 실패했습니다.";
  }
};
