import { AxiosInstance } from "axios";
import { handleAuthentication } from "./jwt";

export async function GET(
  endPoint: string,
  {
    params = "",
    isAuth = false,
    revalidateTime = 10,
  }: {
    params?: string | null | undefined;
    isAuth?: boolean;
    revalidateTime?: number;
  } = {
    params: "",
    isAuth: false,
    revalidateTime: 10,
  }
): Promise<any> {
  const headers = await handleAuthentication(isAuth);

  const reqPath = params
    ? `${process.env.NEXT_PUBLIC_HOST}/${endPoint}/${params}`
    : `${process.env.NEXT_PUBLIC_HOST}/${endPoint}`;

  const res = await fetch(reqPath, {
    method: "GET",
    headers,
    next: { revalidate: revalidateTime },
  });
  const data = await res.json();
  return data;
}

interface IPostReqProps {
  API: AxiosInstance;
  endPoint: string;
  isAuth?: boolean;
  body?: any;
}

interface IUpdateReqProps extends IPostReqProps {
  params?: string | null | undefined;
  query?: string;
}

export function POST({
  API,
  endPoint,
  isAuth = false,
  body,
}: IPostReqProps): Promise<any> {
  return REQUEST({ API, method: "POST", endPoint, isAuth, body });
}

export function PUT({
  API,
  endPoint,
  isAuth = false,
  body,
  params,
  query,
}: IUpdateReqProps): Promise<any> {
  return REQUEST({
    API,
    method: "PUT",
    endPoint,
    body,
    isAuth,
    params,
    query,
  });
}

export function PATCH({
  API,
  endPoint,
  isAuth = false,
  body,
  params,
}: IUpdateReqProps): Promise<any> {
  return REQUEST({ API, method: "PATCH", endPoint, body, isAuth, params });
}

export function DELETE({
  API,
  endPoint,
  isAuth = false,
  body,
  params,
}: IUpdateReqProps): Promise<any> {
  return REQUEST({
    API,
    method: "DELETE",
    endPoint,
    body,
    isAuth,
    params,
  });
}

// POST, PUT, PATCH의 평가부 추상화
async function REQUEST({
  API,
  method,
  endPoint,
  isAuth,
  body,
  params,
  query,
}: {
  API: AxiosInstance;
  method: "POST" | "PUT" | "PATCH" | "DELETE";
  endPoint: string;
  isAuth: boolean;
  body?: any;
  params?: string | undefined | null;
  query?: string;
}): Promise<any> {
  const headers = await handleAuthentication(isAuth);

  const cleanedEndPoint = endPoint.endsWith("/")
    ? endPoint.slice(0, -1)
    : endPoint;
  let url = params ? `${cleanedEndPoint}/${params}` : cleanedEndPoint;

  if (query) {
    url = `${url}?${query}`;
  }

  const response = await API.request({
    url,
    method,
    data: body,
    headers,
  });

  const acceptedStatus = [200, 201, 204];

  if (!acceptedStatus.includes(response.status)) {
    return `${response.status}: 오류좀보소`;
  }

  console.log(`IN ${method}`, response);
  return response;
}
