import { userAPI } from "@/app/api/axiosInstanceManager";
import { POST } from "@/app/api/routeModule";
import { IRegister } from "@/interfaces/accounts";

export const register = async (userData: IRegister) => {
  const res = await POST({
    API: userAPI,
    endPoint: "register",
    body: userData,
  });
  return res;
};
