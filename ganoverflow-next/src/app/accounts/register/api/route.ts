import { POST } from "@/app/api/routeModule";
import { IRegister } from "@/interfaces/accounts";
import { userAPI as API } from "@/app/api/axiosInstanceManager";

export const register = async (userData: IRegister): Promise<any> => {
  const res = await POST(API, "register", userData);
  return res;
};
