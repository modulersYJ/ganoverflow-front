import { TIsSigned, isSignedState } from "@/atoms/sign";
import LoginBox from "./LoginBox";
import { useSetRecoilState } from "recoil";

export const LoginBoxModal = () => {
  const setIsSigned = useSetRecoilState(isSignedState);

  return (
    <div className="LoginBoxModal z-40 fixed inset-0 flex justify-center items-center">
      <div className="z-40 relative max-w-lg animate-popIn origin-bottom">
        <LoginBox modalType />
      </div>
      <div
        className="z-20 fixed inset-0 bg-black opacity-40"
        onClick={() => setIsSigned(TIsSigned.unknown)}
      />
    </div>
  );
};
