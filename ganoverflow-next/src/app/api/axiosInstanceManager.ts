import axios, { AxiosInstance } from "axios";

// API 인스턴스 생성을 각 페이지로 맡겼을 때, 특정 페이지에서만 initialize 전에 호출한다는 에러가 발생했었음.
//  -> 이는 import, export의 순환참조로 인한 문제였음으로 확인.
//  동일시점의 파일에서 생성하여 뿌려주는 방법으로 순환참조 해결.
//  현재는 인스턴스를 마구 생성하지만, 더 높은 수준의 추상화가 가능할 것으로 보인다.

export const GenerateAPI = (url?: string) => {
  const API: AxiosInstance = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_HOST}/${url}${url ? "/" : ""}`,
    withCredentials: true, // 쿠키를 보내기 위해 설정
  });

  return API;
};

export const chatAPI = GenerateAPI("chatbot");
export const chatPostAPI = GenerateAPI("chatposts");
export const authAPI = GenerateAPI("auth");
export const userAPI = GenerateAPI("user");
export const commentAPI = GenerateAPI("comments");
export const starAPI = GenerateAPI("stars");
