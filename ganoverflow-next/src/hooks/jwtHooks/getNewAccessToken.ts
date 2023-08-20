// hooks/useAccessToken.js
import { useRecoilState } from "recoil";
import { useEffect } from "react";

import { IAuthData, fetchAccessToken } from "@/app/api/jwt";

import { accessTokenState } from "@/atoms/jwt";
import { getSessionStorageItem } from "../../utils/common/sessionStorage";

export const GetNewAccessTokenHook = async () => {
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);

  useEffect(() => {
    const callFetchAccessToken = async () => {
      const userId = getSessionStorageItem("userData")
        ? getSessionStorageItem("userData").id
        : null;

      if (!userId) {
        console.log("사용자 ID를 찾을 수 없습니다!");
        return;
      }

      const newAT = await fetchAccessToken(userId);
      setAccessToken(newAT);
    };
    console.log("refreshed accessToken!");
    callFetchAccessToken();
  }, []);

  return accessToken;
};

export const useAuthDataHook = async (): Promise<IAuthData> => {
  const accessToken = await GetNewAccessTokenHook();
  const user = await getSessionStorageItem("userData");

  if (user === null || user === undefined) {
    return { accessToken: null, userId: null };
  }
  return { accessToken: accessToken, userId: user.id };
};
