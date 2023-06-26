import axios, { AxiosInstance, AxiosResponse } from "axios";
import Cookies from "js-cookie";
import { HOST } from "./env/HOST";
import { IChat, IChatMessage } from "@/interfaces/chat";

const API: AxiosInstance = axios.create({
  baseURL: `${HOST}/chatbot`,
  withCredentials: true, // 쿠키를 보내기 위해 설정
});

export const chat = async (userData: IChat): Promise<{ bot: string }> => {
  const response = await API.post("/", userData);
  return response.data;
};
