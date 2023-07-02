// 로컬 스토리지에 데이터 SET
export function setLocalStorageItem(key: string, value: any) {
  if (typeof window !== "undefined") {
    // localStorage에 접근하는 코드는 브라우저에서만 실행 : SSR시 NEXT 서버에서 실행 X
    localStorage.setItem(key, JSON.stringify(value));
  }
}

// 로컬 스토리지에서 GET
export function getLocalStorageItem(key: string) {
  if (typeof window !== "undefined") {
    const value: any = localStorage.getItem(key);
    return JSON.parse(value);
  }
}

//
export function removeUserData() {
  setLocalStorageItem("userData", null);
}
