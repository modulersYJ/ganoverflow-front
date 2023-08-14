import { isSignedState } from "@/atoms/sign";
import LoginBox from "./LoginComp";
import { useRecoilState } from "recoil";

export const LoginBoxModal = () => {
  const [isSigned, setIsSigned] = useRecoilState(isSignedState);

  return (
    <div className="LoginBoxModal z-30 fixed w-full">
      <div className="z-30 relative w-full">
        <LoginBox />
      </div>
      <div className="z-20 fixed inset-0 bg-black opacity-40" />
    </div>
  );
};
