"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/app/api/accounts";
import { ILogIn } from "@/interfaces/accounts";
import SocialLoginButton from "@/components/ui/Accounts/SocialLoginButton";
import InputField from "@/components/ui/Accounts/InputField";

import { useSetRecoilState } from "recoil";
import { userState } from "@/atoms/user";
import Link from "next/link";

const Login = () => {
  const setUser = useSetRecoilState(userState);

  const [formData, setFormData] = useState<ILogIn>({
    username: "",
    password: "",
  });
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await login(formData);
      setUser(response); // Recoil 유저 상태 업데이트
      router.push("/");
    } catch (error) {
      alert(`로그인 실패!, ${error}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">
          로그인
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <InputField
                label="아이디"
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
              />
            </div>

            <div>
              <InputField
                label="비밀번호"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                로그인
              </button>
            </div>
          </form>
          <div className="mt-5 flex justify-evenly">
            <button
              type="button"
              className="text-sm text-gray-500 hover:text-gray-400"
            >
              아이디 찾기
            </button>
            <button
              type="button"
              className="text-sm text-gray-500 hover:text-gray-400"
            >
              비밀번호 재설정
            </button>
            <button
              type="button"
              className="text-sm text-gray-500 hover:text-gray-400"
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
                <span className="px-2 bg-white text-gray-500">
                  다른 방법으로 로그인
                </span>
              </div>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-3">
            <div>
              <SocialLoginButton provider="kakao" />
            </div>

            <div>
              <SocialLoginButton provider="naver" />
            </div>

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
