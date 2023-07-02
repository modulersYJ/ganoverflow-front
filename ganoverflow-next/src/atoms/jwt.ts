import { atom } from "recoil";

export interface IAccessTokenState {
  access_token: string | null | undefined;
}

export const accessTokenState = atom<string | null | undefined>({
  key: "accessTokenState",
  default: null,
});

// //로그인 상태 => useAccessTokenRefresh 커스텀 훅 사용 시,
// //  로그인 상태 확인을 위해 사용
// export const isLoggedInState = atom<boolean>({
//   key: "isLoggedInState",
//   default: false,
// });
