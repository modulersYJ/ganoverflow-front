"use client";

import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import { login } from "./api/login";
import { ILogIn } from "@/interfaces/accounts";
import Link from "next/link";
import SocialLoginButton from "@/components/ui/Accounts/SocialLoginButton";
import InputField from "@/components/ui/Accounts/InputField";

import { useRecoilValue, useSetRecoilState } from "recoil";
import { accessTokenState } from "@/atoms/jwt";
import { userState } from "@/atoms/user";
import { getSessionStorageItem } from "@/utils/common/sessionStorage";

const Login = () => {
  const access_token = useRecoilValue(accessTokenState);
  const setAccessToken = useSetRecoilState(accessTokenState);
  const setUserState = useSetRecoilState(userState);

  const [formData, setFormData] = useState<ILogIn>({
    username: "",
    password: "",
  });
  const router = useRouter();

  useEffect(() => {
    console.log(access_token);
  }, [access_token]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onClickLoginSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await login(formData);
      console.log("res login", response);
      setAccessToken(response.access_token); // Recoil 유저 상태 업데이트
      console.log("access_token state", access_token);

      setUserState(getSessionStorageItem("userData"));
      router.push("/");
    } catch (error) {
      alert(`로그인 실패!, ${error}`);
    }
  };

  return (
    <div className="my-12 flex flex-col justify-center sm:px-6 lg:px-8">
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white dark:bg-black py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <h2 className="tw-subtitle">GOF에 로그인하세요</h2>
          </div>
          <form className="space-y-6 mt-8" onSubmit={onClickLoginSubmit}>
            <div className="flex flex-col gap-2 mt-5">
              <label className="text-sm text-left">아이디</label>
              <input
                className="h-11 w-full border-2px border-white rounded-md bg-zinc-100 dark:bg-[#121212] px-2 py-1 font-normal"
                name="username"
                value={formData.username}
                placeholder="이메일을 입력해주세요"
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col gap-2 mt-5">
              <label className="text-sm text-left">비밀번호</label>
              <input
                className="h-11 w-full border-2px border-white rounded-md bg-zinc-100 dark:bg-[#121212] px-2 py-1 font-normal"
                name="password"
                value={formData.password}
                placeholder="비밀번호를 입력해주세요"
                onChange={handleChange}
                type="password"
              />
            </div>
            <div className="!mt-12">
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium bg-secondary hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 !text-black"
              >
                로그인
              </button>
            </div>
          </form>
          <div className="mt-5 flex justify-evenly">
            <button
              type="button"
              className="text-sm !font-light text-gray-500 hover:text-gray-400"
            >
              아이디 찾기
            </button>
            <button
              type="button"
              className="text-sm !font-light text-gray-500 hover:text-gray-400"
            >
              비밀번호 재설정
            </button>
            <button
              type="button"
              className="text-sm !font-light text-gray-500 hover:text-gray-400"
            >
              <Link href="/accounts/register">회원가입</Link>
            </button>
          </div>

          <div className="mt-8">
            <div className="relative">
              <div
                className="absolute inset-0 flex items-center"
                aria-hidden="true"
              >
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white dark:bg-black text-gray-500 dark:text-gray-300">
                  다른 방법으로 로그인
                </span>
              </div>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <div>
              <SocialLoginButton provider="kakao" />
            </div>
            {/* <div>
              <SocialLoginButton provider="naver" />
            </div> */}
            <div>
              <SocialLoginButton provider="google" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
