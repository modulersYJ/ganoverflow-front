const isTokenValid = (token: string): boolean => {
  try {
    const payload = token.split(".")[1];
    const decodedPayload = JSON.parse(atob(payload));
    const currentTime = Math.floor(Date.now() / 1000);

    return decodedPayload.exp > currentTime;
  } catch (e) {
    console.error("Error while checking token:", e);
    return false; // 토큰이 유효하지 않거나 파싱 중 오류 시
  }
};

export { isTokenValid };
