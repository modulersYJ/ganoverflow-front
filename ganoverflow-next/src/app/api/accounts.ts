
import axios, { AxiosInstance, AxiosResponse } from "axios";
import Cookies from "js-cookie";
import { HOST } from "./env/HOST";
import { IRegister, ILogIn } from "@/interfaces/accounts"; 

const API: AxiosInstance = axios.create({
  baseURL: `${HOST}/accounts`,
  withCredentials: true, // 쿠키를 보내기 위해 설정
});

// response interceptor 추가
API.interceptors.response.use(
  (response) => {
    // JWT access 토큰이 있으면 응답 본문에서 받아와서 저장
    const accessToken = response.data.access;
    if (accessToken) {
      Cookies.set("access", accessToken);
    }

    return response;
  },
  (error) => {
    // error handling
    return Promise.reject(error);
  }
);

export const register = async (userData: IRegister): Promise<void> => {
  await API.post("/register/", userData);
};

export const login = async (
  userData: ILogIn
): Promise<{ nickname: string }> => {
  const response = await API.post("/login/", userData);
  return response.data;
};

export const logout = async (): Promise<void> => {
  // 로그아웃 시점에 토큰 제거

  const response = await API.post("/logout/", null, {
    headers: {
      Authorization: `Bearer ${Cookies.get("access")}`,
    },
  });
  // console.log(response);
  Cookies.remove("access");
};
