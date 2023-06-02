import { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/router";
import { register } from "@/pages/api/accounts";
import { IRegister } from "@/interfaces/accounts";
import InputField from "@/components/ui/Accounts/InputField";
import Checkbox from "@/components/ui/Accounts/Checkbox";

const RegisterPage = () => {
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
  const router = useRouter();

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
      await register(formattedData);
      router.push("/accounts/login");
    } catch (error: any) {
      alert(`회원가입 실패!, ${error}`);
    }
  };

  return (
    <div className="w-full max-w-xs mx-auto mt-8">
      <h1 className="mb-6 text-2xl font-bold text-center">회원가입</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <InputField
          label="계정명"
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
        <InputField
          label="비밀번호"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        <InputField
          label="닉네임"
          type="text"
          name="nickname"
          value={formData.nickname}
          onChange={handleChange}
        />
        <div>
          <label
            htmlFor="gender"
            className="block text-sm font-medium text-gray-700"
          >
            성별
          </label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleSelectChange}
            required
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="">선택</option>
            <option value="M">남자</option>
            <option value="F">여자</option>
            <option value="N">무응답</option>
          </select>
        </div>
        <InputField
          label="생년월일"
          type="date"
          name="birth_date"
          value={formData.birth_date}
          onChange={handleChange}
        />
        {/* <InputField
          label="휴대폰번호"
          type="tel"
          name="phone_num"
          value={formData.phone_num}
          placeholder="010-xxxx-xxxx"
          onChange={handleChange}
        /> */}

        <Checkbox
          id="check_all"
          name="check_all"
          checked={checkAll}
          onChange={handleCheckAll}
          label="모두 동의하기"
        />
        <Checkbox
          id="svc_use_pcy_agmt"
          name="svc_use_pcy_agmt"
          checked={formData.svc_use_pcy_agmt === "Y"}
          onChange={handleCheckboxChange}
          label="서비스 이용약관 동의"
          required
        />
        <Checkbox
          id="ps_info_proc_agmt"
          name="ps_info_proc_agmt"
          checked={formData.ps_info_proc_agmt === "Y"}
          onChange={handleCheckboxChange}
          label="개인정보처리방침 동의"
          required
        />
        <Checkbox
          id="mkt_info_recv_agmt"
          name="mkt_info_recv_agmt"
          checked={formData.mkt_info_recv_agmt === "Y"}
          onChange={handleCheckboxChange}
          label="마케팅 정보 수신 동의"
        />
        <button
          type="submit"
          className="w-full py-2 mt-6 text-white bg-blue-500 rounded hover:bg-blue-400"
        >
          회원가입
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
