"use client";
import { logout } from "@/app/api/accounts";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function HeaderRight() {
  const [isOffCanvasOpen, setIsOffCanvasOpen] = useState(false);
  // const user = useRecoilValue(userState);

  const onClickHamburger = () => {
    setIsOffCanvasOpen(!isOffCanvasOpen);
  };

  useEffect(() => {
    const closeMenuOnClickOutside = (event: any) => {
      if (
        !event.target.closest(".side-canvas") &&
        !event.target.closest("button")
      ) {
        setIsOffCanvasOpen(false);
      }
    };

    if (isOffCanvasOpen) {
      document.addEventListener("click", closeMenuOnClickOutside);
    } else {
      document.removeEventListener("click", closeMenuOnClickOutside);
    }
    return () => {
      document.removeEventListener("click", closeMenuOnClickOutside);
    };
  }, [
    isOffCanvasOpen,
    // user
  ]);

  return (
    <>
      <div>
        {
          // user === null
          true ? (
            <Link href="/accounts/login" passHref>
              로그인
            </Link>
          ) : (
            // <Link href="/" passHref>
            //   {user?.nickname}
            //   <span className="text-xs">님</span>
            // </Link>
            <UserDropdownButton
              nickname={
                "need to fix"
                // user.nickname
              }
            />
          )
        }
      </div>
      <HamburgerButton onClickButton={onClickHamburger} />
      <SideCanvas
        isOffCanvasOpen={isOffCanvasOpen}
        onClickClose={onClickHamburger}
        user={
          // user
          "need to fix"
        }
      />
    </>
  );
}

const UserDropdownButton = ({ nickname }: { nickname: string }) => {
  const router = useRouter();
  // const setUser = useSetRecoilState(userState);

  const onClickLogOut = async () => {
    const response = await logout();
    // setUser(null); // Recoil 유저 상태 업데이트
    router.push("/");
  };

  return (
    <div className="relative">
      <Link href="/" passHref>
        <button className="text-white font-bold hover:text-gray-400">
          {nickname}
          <span className="text-xs">님</span>
        </button>
      </Link>
      <div className="absolute top-10 right-0 bg-white py-2 rounded-md shadow-lg">
        <Link href="/accounts/my-page" passHref>
          <span className="block px-4 py-2 hover:bg-gray-200">마이페이지</span>
        </Link>
        <button onClick={onClickLogOut}>
          <span className="block px-4 py-2 hover:bg-gray-200">로그아웃</span>
        </button>
      </div>
    </div>
  );
};

const HamburgerButton = ({ onClickButton }: any): JSX.Element => {
  return (
    <button
      type="button"
      className="md:hidden text-white focus:outline-none"
      aria-label="Toggle menu"
      onClick={onClickButton}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        className="h-6 w-6 "
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M4 6h16M4 12h16M4 18h16"
        />
      </svg>
    </button>
  );
};

const SideCanvas = ({ onClickClose, isOffCanvasOpen, user }: any) => {
  return (
    <div className={`side-canvas ${isOffCanvasOpen ? "open" : ""}`}>
      <button className="text-white" onClick={onClickClose}>
        닫기
      </button>
      {user === null ? (
        <div>
          {" "}
          <Link
            href="/"
            className="block px-4 py-2 text-white font-inter text-sm"
            passHref
          >
            로그인
          </Link>
          <Link
            href="/"
            className="block px-4 py-2 text-white font-inter text-sm"
            passHref
          >
            회원가입
          </Link>
        </div>
      ) : (
        <Link
          href="/"
          passHref
          className="block px-4 py-2 text-white font-inter text-sm"
        >
          {user?.nickname}
        </Link>
      )}
    </div>
  );
};
