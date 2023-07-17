import { AxiosInstance } from "axios";

export async function POST(
  API: AxiosInstance,
  endPoint: string,
  body?: any,
  authHeaders?: any
): Promise<any> {
  const response = await API.post(endPoint, body, authHeaders);

  if (response.status !== 201 && response.status !== 204) {
    return `${response.status}: 오류좀보소`;
  }
  console.log("IN POST", response);
  return response;
}

export async function PUT(
  API: AxiosInstance,
  endPoint: string,
  body?: any,
  authHeaders?: any,
  params?: string
): Promise<any> {
  const url = params ? `${endPoint}/${params}` : endPoint;
  const response = await API.put(url, body, authHeaders);

  if (response.status !== 200 && response.status !== 204) {
    return `${response.status}: 오류좀보소`;
  }
  console.log("IN PUT", response);
  return response;
}

export async function GET(
  endPoint: string,
  {
    params = "",
    headers = {},
    revalidateTime = 10,
  }: {
    params?: string | null;
    headers?: Object;
    revalidateTime?: number;
  } = {
    params: "",
    headers: {},
    revalidateTime: 10,
  }
): Promise<any> {
  console.log("GET authHeaders", headers);

  const reqPath = params
    ? `${process.env.NEXT_PUBLIC_HOST}/${endPoint}/${params}`
    : `${process.env.NEXT_PUBLIC_HOST}/${endPoint}`;

  const res = await fetch(reqPath, {
    method: "GET",
    ...headers,
    next: { revalidate: revalidateTime },
  });
  const data = await res.json();
  return data;
}
