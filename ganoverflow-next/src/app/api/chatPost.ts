import axios, { AxiosInstance, AxiosResponse } from "axios";

import { HOST } from "./env/HOST";
import { IChatMessage } from "@/interfaces/chat";

const API: AxiosInstance = axios.create({
  baseURL: `${HOST}/chatposts`,
  withCredentials: true, // 쿠키를 보내기 위해 설정
});

export const sendChatPost = async (
  selectedPairs: IChatMessage[]
): Promise<{ msg: string }> => {
  const response = await API.post("/", selectedPairs);
  return response.data;
};
