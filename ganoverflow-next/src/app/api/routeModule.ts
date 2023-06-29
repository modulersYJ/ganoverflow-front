import { NextResponse } from "next/server";
import { HOST } from "./env/HOST";
import axios, { AxiosInstance } from "axios";

const API: AxiosInstance = axios.create({
  baseURL: `${HOST}/`,
  withCredentials: true, // 쿠키를 보내기 위해 설정
});

export async function POST(endPoint: string, body: any): Promise<string> {
  const response = API.post(endPoint, body);

  const res = await response;
  if (res.status !== 201) {
    console.log(res);
    return `${res.status}: 오류좀보소`;
  }
  console.log(res);
  return `${res}`;
}

export async function GET(endPoint: string) {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  const apiKey = process.env.DATA_API_KEY;

  if (apiKey) {
    headers["API-Key"] = apiKey;
  }

  const res = await fetch(`${HOST}/${endPoint}`, {
    headers,
    next: { revalidate: 60 },
  });
  const data = await res.json();
  console.log("@@@@@@@@@@@@@@@ GET ROOT", data);
  return data;
}
