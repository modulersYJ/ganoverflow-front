import { TIsSigned, isSignedState } from "@/atoms/sign";
import LoginBox from "./LoginBox";
import { useSetRecoilState } from "recoil";

export const LoginBoxModal = () => {
  const setIsSigned = useSetRecoilState(isSignedState);

  return (
    <div className="LoginBoxModal z-30 fixed inset-0 flex justify-center items-center">
      <div className="z-30 relative max-w-lg">
        <LoginBox modalType />
      </div>
      <div
        className="z-20 fixed inset-0 bg-black opacity-40"
        onClick={() => setIsSigned(TIsSigned.unknown)}
      />
    </div>
  );
};
