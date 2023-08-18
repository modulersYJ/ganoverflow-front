"use client";

import { useRecoilValue } from "recoil";
import { LoginBoxModal } from "../login/LoginBoxModal";
import { userState } from "@/atoms/user";

export function LoginWrapper() {
  // TODO : 모달로그인 완성 되면 고쳐주세요~~
  const isConfirmed = useRecoilValue(userState);
  console.log(
    "🚀 ~ file: (login-wrapper).tsx:9 ~ LoginWrapper ~ isConfirmed:",
    isConfirmed
  );

  return (
    <>
      {!isConfirmed ? (
        <>
          로그인하세요
          <LoginBoxModal />
        </>
      ) : (
        <>정보 수정하기</>
      )}
    </>
  );
}
