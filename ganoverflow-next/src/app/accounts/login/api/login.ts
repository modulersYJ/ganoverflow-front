import Cookies from "js-cookie";
import { ILogIn } from "@/interfaces/accounts";
import { IRegister } from "@/interfaces/accounts";
import { POST } from "@/app/api/routeModule";
import {
  removeUserData,
  setLocalStorageItem,
} from "@/app/utils/common/localStorage";
import { authAPI as API } from "@/app/api/axiosInstanceManager";
import { userAPI } from "@/app/api/axiosInstanceManager";

// response interceptor 추가
API.interceptors.response.use(
  (response) => {
    // JWT access 토큰이 있으면 응답 본문에서 받아와서 저장
    if (
      response.config.url === "/login" ||
      response.config.url === "/refresh"
    ) {
      const accessToken = response.data.accessToken;
      if (accessToken) {
        Cookies.set("access_token", accessToken);
      }
    }
    return response;
  },
  (error) => {
    // error handling
    return Promise.reject(error);
  }
);

export const login = async (
  userData: ILogIn
): Promise<{
  nickname: string;
  id: string;
  access_token: string;
}> => {
  const response = await POST(API, "login", userData, null);
  // const response = await API.post("/login", userData);

  setLocalStorageItem("userData", {
    id: response.data.id,
    nickname: response.data.nickname,
  });

  return response.data;
};

export const register = async (userData: IRegister) => {
  const res = await POST(userAPI, "register", userData, null);
  return res;
};

export const refreshAccessToken = async () => {
  await POST(userAPI, "refresh", null, null);
};

export const logout = async (userId: string): Promise<void> => {
  const response = await POST(
    API,
    "logout",
    { userId: userId },
    {
      headers: {
        Authorization: `Bearer ${Cookies.get("refresh_token")}`,
      },
    }
  );
  removeUserData();
  Cookies.remove("refresh_token");
  return response;
};
