import { AxiosInstance } from "axios";
import { IAuthData, fetchAccessToken } from "@/app/api/jwt";

export async function POST(
  API: AxiosInstance,
  endPoint: string,
  body?: any,
  headers?: any
): Promise<any> {
  const response = await API.post(endPoint, body, headers);

  if (response.status !== 201 && response.status !== 204) {
    return `${response.status}: 오류좀보소`;
  }
  console.log("IN POST", response);
  return response;
}

//Access Token을 헤더에 넣어서 보내는 POST
export async function AuthPOST(
  API: AxiosInstance,
  endPoint: string,
  body: any,
  authData: IAuthData
): Promise<string> {
  try {
    const response = await API.post(endPoint, body, {
      headers: {
        Authorization: `Bearer ${authData.accessToken}`,
      },
    });

    const res = response.data;
    if (res.status !== 201 && res.status !== 204) {
      console.log(res);
      return `${res.status}: 오류좀보소`;
    }
    console.log(res);
    return `${res}`;
  } catch (error: any) {
    if (error.response && error.response.data === "Expired token") {
      // Access 토큰이 만료된 경우, 새로운 Access 토큰을 발급 후 재시도
      const newAccessToken = await fetchAccessToken(authData.userId);
      return AuthPOST(API, endPoint, body, {
        accessToken: newAccessToken,
        userId: authData.userId,
      });
    } else {
      throw error;
    }
  }
}

export async function GET(endPoint: string): Promise<any> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  const apiKey = process.env.DATA_API_KEY;
  if (apiKey) {
    headers["API-Key"] = apiKey;
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/${endPoint}`, {
    headers,
    next: { revalidate: 60 },
    // body: body ? JSON.stringify(body) : null,
  });
  const data = await res.json();
  return data;
}
