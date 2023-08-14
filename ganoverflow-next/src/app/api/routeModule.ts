import { AxiosInstance, Method } from "axios";

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

interface IPostReqProps {
  API: AxiosInstance;
  endPoint: string;
  authHeaders?: any;
  body?: any;
}

interface IUpdateReqProps extends IPostReqProps {
  params?: string;
  query?: string;
}

export function POST({
  API,
  endPoint,
  authHeaders,
  body,
}: IPostReqProps): Promise<any> {
  return REQUEST({ API, method: "POST", endPoint, authHeaders, body });
}

export function PUT({
  API,
  endPoint,
  authHeaders,
  body,
  params,
  query,
}: IUpdateReqProps): Promise<any> {
  return REQUEST({
    API,
    method: "PUT",
    endPoint,
    body,
    authHeaders,
    params,
    query,
  });
}

export function PATCH({
  API,
  endPoint,
  authHeaders,
  body,
  params,
}: IUpdateReqProps): Promise<any> {
  return REQUEST({ API, method: "PATCH", endPoint, body, authHeaders, params });
}

// POST, PUT, PATCH의 평가부 추상화
async function REQUEST({
  API,
  method,
  endPoint,
  authHeaders,
  body,
  params,
  query,
}: {
  API: AxiosInstance;
  method: "POST" | "PUT" | "PATCH";
  endPoint: string;
  authHeaders?: any;
  body?: any;
  params?: string;
  query?: string;
}): Promise<any> {
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
    ...authHeaders,
  });

  const acceptedStatus = [200, 201, 204];

  if (!acceptedStatus.includes(response.status)) {
    return `${response.status}: 오류좀보소`;
  }

  console.log(`IN ${method}`, response);
  return response;
}
