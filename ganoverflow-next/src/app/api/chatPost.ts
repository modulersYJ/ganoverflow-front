import axios, { AxiosInstance, AxiosResponse } from "axios";

import { HOST } from "./env/HOST";
import { IChatMessage, IChatPost } from "@/interfaces/chat";

const API: AxiosInstance = axios.create({
  baseURL: `${HOST}/chatposts`,
  withCredentials: true, // 쿠키를 보내기 위해 설정
});

export const sendChatPost = async (
  title: string,
  selectedPairs: IChatMessage[]
): Promise<{ msg: string } | null> => {
  if (selectedPairs.length === 0) {
    return null;
  }

  const chatPostBody: IChatPost = {
    title,
    chatPair: selectedPairs,
  };

  const response = await API.post("/", chatPostBody);
  return response.data;
};
