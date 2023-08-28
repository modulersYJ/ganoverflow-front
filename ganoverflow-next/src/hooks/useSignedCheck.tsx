import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { isSignedState, TIsSigned } from "@/atoms/sign";
import { getSessionStorageItem } from "@/utils/common/sessionStorage";

// 로그인 여부 확인 & 로그인 모달오픈 조건 설정 hook
export const useSignedCheck = () => {
  const setIsSigned = useSetRecoilState(isSignedState);

  const checkUserSession = async () => {
    if (!(await getSessionStorageItem("userData"))) {
      setIsSigned(TIsSigned.F);
      return false;
    }
    return true;
  };

  return checkUserSession;
};
