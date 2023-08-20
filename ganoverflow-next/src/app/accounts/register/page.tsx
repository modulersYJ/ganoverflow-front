"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { register } from "../login/api/login";
import { IRegister } from "@/interfaces/accounts";
import { TIsSigned, isSignedState } from "@/atoms/sign";
import { useRecoilValue } from "recoil";

const RegisterPage = () => {
  const isSigned = useRecoilValue(isSignedState);
  const router = useRouter();

  if (isSigned === TIsSigned.T) {
    // 로그인 후 back이 회원가입 페이지인 경우, 뒤로가기 2번하여 기존 페이지로 돌아가기
    window.history.go(-2);
  }

  const [formData, setFormData] = useState<IRegister>({
    username: "",
    password: "",
    nickname: "",
    gender: "N",
    birth_date: "",
    // phone_num: "",
    svc_use_pcy_agmt: "N",
    ps_info_proc_agmt: "N",
    mkt_info_recv_agmt: "N",
  });
  const [checkAll, setCheckAll] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData({ ...formData, [name]: checked ? "Y" : "N" });
  };

  const handleCheckAll = (e: ChangeEvent<HTMLInputElement>) => {
    setCheckAll(e.target.checked);
    setFormData({
      ...formData,
      svc_use_pcy_agmt: e.target.checked ? "Y" : "N",
      ps_info_proc_agmt: e.target.checked ? "Y" : "N",
      mkt_info_recv_agmt: e.target.checked ? "Y" : "N",
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const formattedData = {
        ...formData,
        // phone_num: formData.phone_num.replace(/^0/, "+82-"),
      };
      const res = await register(formattedData);
      router.push("/accounts/login");
      return res;
    } catch (error: any) {
      alert(`회원가입 실패!, ${error}`);
      throw error;
    }
  };

  return (
    // <div className="w-full max-w-xs mx-auto mt-8">
    <div className="mt-8 mx-auto w-full max-w-md">
      <div className="bg-white dark:bg-black py-8 shadow rounded-lg px-10">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="tw-subtitle">GOF에 가입하세요</h2>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col gap-2 mt-5">
            <label className="text-sm text-left">아이디</label>
            <input
              className="h-11 w-full border-2px border-white rounded-md bg-zinc-100 dark:bg-[#121212] px-2 py-1 font-normal"
              type="text"
              name="username"
              autoFocus
              autoComplete="off"
              value={formData.username}
              placeholder="아이디를 입력해주세요"
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col gap-2 mt-5">
            <label className="text-sm text-left">비밀번호</label>
            <input
              className="h-11 w-full border-2px border-white rounded-md bg-zinc-100 dark:bg-[#121212] px-2 py-1 font-normal"
              type="password"
              name="password"
              value={formData.password}
              placeholder="비밀번호를 입력해주세요"
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col gap-2 mt-5">
            <label className="text-sm text-left">닉네임</label>
            <input
              className="h-11 w-full border-2px border-white rounded-md bg-zinc-100 dark:bg-[#121212] px-2 py-1 font-normal"
              type="text"
              name="nickname"
              autoComplete="off"
              value={formData.nickname}
              placeholder="닉네임을 입력해주세요"
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col gap-2 mt-5">
            <label className="text-sm text-left">성별</label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleSelectChange}
              required
              className="h-11 w-full border-2px border-white rounded-md bg-zinc-100 dark:bg-[#121212] px-2 py-1 font-normal"
            >
              <option value="">선택</option>
              <option value="M">남자</option>
              <option value="F">여자</option>
              <option value="N">무응답</option>
            </select>
          </div>
          <div className="flex flex-col gap-2 mt-5">
            <label className="text-sm text-left">생년월일</label>
            <input
              className="h-11 w-full border-2px border-white rounded-md bg-zinc-100 dark:bg-[#121212] px-2 py-1 font-normal"
              type="date"
              name="birth_date"
              value={formData.birth_date}
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center mt-4">
            <input
              id="check_all"
              type="checkbox"
              name="check_all"
              checked={checkAll}
              onChange={handleCheckAll}
              className="form-checkbox h-4 w-4 accent-dark-primary text-white"
            />
            <label htmlFor="check_all" className="ml-2 text-sm">
              모두 동의하기
            </label>
          </div>

          <div className="flex items-center mt-4">
            <input
              id="svc_use_pcy_agmt"
              type="checkbox"
              name="svc_use_pcy_agmt"
              checked={formData.svc_use_pcy_agmt === "Y"}
              onChange={handleCheckboxChange}
              className="form-checkbox h-4 w-4 accent-primary text-white"
              required
            />
            <label htmlFor="svc_use_pcy_agmt" className="ml-2 text-sm">
              서비스 이용약관 동의
            </label>
          </div>

          <div className="flex items-center mt-4">
            <input
              id="ps_info_proc_agmt"
              type="checkbox"
              name="ps_info_proc_agmt"
              checked={formData.ps_info_proc_agmt === "Y"}
              onChange={handleCheckboxChange}
              className="form-checkbox h-4 w-4 accent-primary text-white"
              required
            />
            <label htmlFor="ps_info_proc_agmt" className="ml-2 text-sm">
              개인정보처리방침 동의
            </label>
          </div>

          <div className="flex items-center mt-4">
            <input
              id="mkt_info_recv_agmt"
              type="checkbox"
              name="mkt_info_recv_agmt"
              checked={formData.mkt_info_recv_agmt === "Y"}
              onChange={handleCheckboxChange}
              className="form-checkbox h-4 w-4 accent-primary text-white"
            />
            <label htmlFor="mkt_info_recv_agmt" className="ml-2 text-sm">
              마케팅 정보 수신 동의
            </label>
          </div>
          <button
            type="submit"
            className="w-full py-2 mt-6 text-white rounded-md bg-primary"
          >
            회원가입
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
