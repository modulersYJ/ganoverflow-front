"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import TERMS from "@/components/terms.json";

import { logout } from "./accounts/login/api/login";

import "@/styles/globals.css";
import { Inter } from "next/font/google";

import {
  RecoilRoot,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";
import { userState } from "@/atoms/user";
import { getSessionStorageItem } from "@/utils/common/sessionStorage";
import { foldersWithChatpostsState } from "@/atoms/folder";
import {
  TLoadChatStatus,
  chatPairsState,
  chatSavedStatusState,
  checkCntState,
  loadChatStatusState,
  questionInputState,
} from "@/atoms/chat";
import { setAccessToken } from "./api/jwt";
import { LoginBoxModal } from "./accounts/login/LoginBoxModal";
import { TIsSigned, isSignedState } from "@/atoms/sign";

const siteTitle = "최고의 머시깽이, GanOverflow";
const siteDescription = "Gan Overflow는 ...입니당. 최고의 경험을 누려보세요!";

const metadata = {
  title: siteTitle,
  description: siteDescription,
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: // offFooter,
// home,
{
  children: React.ReactNode;
  // home: boolean,
  // offFooter: boolean,
}) {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };
  return (
    <html
      lang="en"
      className={`${inter.className} ${
        isDarkMode ? "dark" : ""
      } h-full scroll-smooth antialiased`}
    >
      <CapsulizedHead />
      <RecoilRoot>
        <body className="flex min-h-full flex-col">
          <Header toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />
          <main className="grow pt-[44px] md:pt-[68px] bg-light dark:bg-[#202024] dark:text-slate-100">
            {children}
          </main>
          {/* {!offFooter &&  */}
          {/* <Footer /> */}
          {/* } */}
        </body>
      </RecoilRoot>
    </html>
  );
}

const CapsulizedHead = (): JSX.Element => {
  return (
    <Head>
      <link rel="icon" href="/favicon.ico" />
      <meta name="description" content={siteDescription} />
      <meta
        property="og:image"
        content={`https://og-image.vercel.app/${encodeURI(
          siteTitle
        )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
      />
      <meta name="og:title" content={siteTitle} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content="ganoverflow.vercel.app"></meta>
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={siteDescription} />
      <meta name="twitter:image" content="/images/logo.png" />
    </Head>
  );
};

const Header = ({
  toggleDarkMode,
  isDarkMode,
}: {
  toggleDarkMode: () => void;
  isDarkMode: boolean;
}): JSX.Element => {
  const [isSigned, setIsSigned] = useRecoilState(isSignedState);

  const [isOffCanvasOpen, setIsOffCanvasOpen] = useState(false);
  const [user, setUser] = useRecoilState(userState);

  useEffect(() => {
    const userData = getSessionStorageItem("userData");
    if (userData) {
      setUser(userData);
    }
  }, []);

  const onClickSetLogout = async () => {
    setUser(null);
    setIsSigned(TIsSigned.unknown);
  };
  console.log("userData: ", user);

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
  }, [isOffCanvasOpen, user]);

  return (
    <header>
      {isSigned === TIsSigned.F && <LoginBoxModal />}
      <nav className="header-nav shadow-headerBox fixed w-full top-0 z-50">
        <div className="mx-auto px-6 py-1 flex justify-between">
          <div className="flex items-center col-span-1">
            <Link href="/" passHref>
              <Image
                src={isDarkMode ? "/gof-logo-dark.svg" : "/gof-logo-light.svg"}
                alt="Gan Overflow Logo"
                width={150}
                height={31.55}
                priority
              />
            </Link>
          </div>
          <div className="col-sapn-1 self-center">
            <div className="hidden md:flex items-center">
              <Link
                href="/chat"
                className="text-[#404040] hover:text-black dark:text-[#AEAEB2] dark:hover:text-[#7A7A7C] font-notoSansKR text-xs px-4 py-5 font-medium transition-colors duration-200"
                passHref
              >
                채팅
              </Link>
              <Link
                href="/posts"
                className="text-[#404040] hover:text-black dark:text-[#AEAEB2] dark:hover:text-[#7A7A7C] font-notoSansKR text-xs px-4 py-5 font-medium transition-colors duration-200"
                passHref
              >
                게시판
              </Link>
              <Link
                href="/"
                className="text-[#404040] hover:text-black dark:text-[#AEAEB2] dark:hover:text-[#7A7A7C] font-notoSansKR text-xs px-4 py-5 font-medium transition-colors duration-200"
                passHref
              >
                기타
              </Link>
              <a
                className="text-[#333336] hover:text-[#111112] dark:text-[#AEAEB2] dark:hover:text-[#7A7A7C] font-notoSansKR text-xs px-4 py-5 font-medium transition-colors duration-200"
                target="_blank"
                href="https://github.com/modulersYJ"
                rel="noopener noreferrer"
              >
                modulers
              </a>
            </div>
          </div>
          <div className="flex flex-row col-sapn-1 self-center gap-6">
            <button className="text-xs" onClick={toggleDarkMode}>
              {isDarkMode === true ? "Light" : "Dark"}
            </button>
            <div className="self-center">
              <div className="hidden md:flex font-bold hover:text-gray-400">
                {user === null ? (
                  <Link href="/accounts/login" passHref>
                    로그인
                  </Link>
                ) : (
                  <div className="">
                    <UserDropdownButton
                      userData={user}
                      onClickSetLogout={onClickSetLogout}
                    />
                  </div>
                )}
              </div>
              <HamburgerButton onClickButton={onClickHamburger} />
              <SideCanvas
                isOffCanvasOpen={isOffCanvasOpen}
                onClickClose={onClickHamburger}
                user={user}
              />
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

const UserDropdownButton = ({
  userData,
  onClickSetLogout,
}: {
  userData: { id: string; nickname: string };
  onClickSetLogout: () => void;
}) => {
  const setChatPairs = useSetRecoilState(chatPairsState);
  const setCheckCnt = useSetRecoilState(checkCntState);
  const setChatSavedStatus = useSetRecoilState(chatSavedStatusState);
  const setQuestionInput = useSetRecoilState(questionInputState);
  const setFoldersData = useSetRecoilState(foldersWithChatpostsState);
  const setLoadChatStatus = useSetRecoilState(loadChatStatusState);

  const router = useRouter();

  const onClickLogOut = async () => {
    console.log("유저아이디:", userData.id);
    const response = await logout(userData.id);

    onClickSetLogout();
    setAccessToken(null);
    setFoldersData([]);
    setChatPairs([]);
    setCheckCnt(0);
    setChatSavedStatus("F");
    setQuestionInput("");
    setLoadChatStatus({ status: TLoadChatStatus.F, loadedMeta: undefined });

    return response;
  };

  return (
    <div className="relative 2xl:mr-10 flex flex-row justify-center group py-4">
      <Link href="/" passHref>
        <button className="font-bold hover:text-gray-400">
          {userData?.nickname}
          <span className="text-xs">님</span>
        </button>
      </Link>

      <div className="w-30 hidden !text-sm group-hover:block hover:block fixed top-[46px] bg-zinc-100 dark:bg-gray-700 py-2 rounded-md shadow-lg !font-normal">
        <Link href="/accounts/my-page" passHref>
          <span className="block w-full px-4 py-2 hover:bg-gray-200 text-gray-600 dark:text-gray-300">
            마이페이지
          </span>
        </Link>
        <button onClick={onClickLogOut} className="w-full">
          <span className="!font-normal !text-sm block px-4 py-2 hover:bg-gray-200 text-gray-600 dark:text-gray-300">
            로그아웃
          </span>
        </button>
      </div>
    </div>
  );
};

const Footer = () => {
  return (
    <footer className="doc-footer">
      <div className="inner_footer ">
        <section className="section_service-list"></section>
        <section className="section_address"></section>
        <section className="section_terms-wrapper">
          {TERMS.map((term, idx) => (
            <a
              key={idx}
              href={term.dest}
              role="button"
              aria-expanded="false"
              className="terms"
            >
              {term.name}
            </a>
          ))}
        </section>
        <ul className="section_social"></ul>
        <small className="txt_copyright">
          © <a href="https://www.ganoverflow.com">GanOverflow</a> All rights
          reserved.
        </small>
      </div>
    </footer>
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
const HamburgerButton = ({ onClickButton }: any): JSX.Element => {
  return (
    <button
      type="button"
      className="md:hidden my-2 focus:outline-none"
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
