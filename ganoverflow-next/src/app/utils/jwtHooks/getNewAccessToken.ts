// hooks/useAccessToken.js
import { useRecoilState } from "recoil";
import { useEffect } from "react";

import { IAuthData, fetchAccessToken } from "@/app/api/jwt";

import { accessTokenState } from "@/atoms/jwt";
import { getLocalStorageItem } from "../common/localStorage";

export const getNewAccessTokenHook = async () => {
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);

  useEffect(() => {
    const callFetchAccessToken = async () => {
      const userId = getLocalStorageItem("userData")
        ? getLocalStorageItem("userData").id
        : null;

      if (!userId) {
        throw new Error("User id is not found");
      }

      const newAT = await fetchAccessToken(userId);
      setAccessToken(newAT);
    };

    callFetchAccessToken();
  }, []);

  return accessToken;
};

export const useAuthDataHook = async (): Promise<IAuthData> => {
  const accessToken = await getNewAccessTokenHook();
  const user = await getLocalStorageItem("userData");

  if (user === null) {
    return { accessToken: null, userId: null };
  }
  return { accessToken: accessToken, userId: user.id };
};
