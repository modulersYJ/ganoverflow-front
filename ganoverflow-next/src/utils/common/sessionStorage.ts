// 로컬 스토리지에 데이터 SET

export type TUserData = {
  id: string;
  nickname: string;
};

export function setSessionStorageItem(key: string, value: TUserData | null) {
  if (typeof window !== "undefined") {
    // sessionStorage에 접근하는 코드는 브라우저에서만 실행 : SSR시 NEXT 서버에서 실행 X
    sessionStorage.setItem(key, JSON.stringify(value));
  }
}

// 로컬 스토리지에서 GET
export function getSessionStorageItem(key: string) {
  if (typeof window !== "undefined") {
    const value: any = sessionStorage.getItem(key);
    return JSON.parse(value);
  }
}

//
export function removeUserData() {
  setSessionStorageItem("userData", null);
}
