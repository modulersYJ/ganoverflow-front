import Link from "next/link";
import HeaderRight from "./HeaderRight";

export default function Header(): JSX.Element {
  return (
    <header>
      <nav className="header-nav shadow-headerBox fixed w-full top-0 z-50">
        <div className="container mx-auto px-6 py-1 flex justify-between">
          <div className="flex items-center col-sapn-1">
            <Link href="/" className="flex items-center" passHref>
              {/* <Image
                  src="/images/logo.png"
                  alt="Logo"
                  height={50}
                  width={50}
                  className="h-9 w-9"
                /> */}
              <h1 className="logo-text ml-1 text-xl">Gan Overflow</h1>
            </Link>
          </div>
          <div className="col-sapn-1 self-center">
            <div className="hidden md:flex items-center">
              <Link
                href="/chat"
                className="text-[#AEAEB2] font-inter text-sm px-4 py-5 font-semibold"
                passHref
              >
                채팅
              </Link>
              <Link
                href="/"
                target="_blank"
                rel="noreferrer"
                className="text-[#AEAEB2] font-inter text-sm px-4 py-5 font-semibold"
                passHref
              >
                머시기
              </Link>
              <Link
                href="/"
                className="text-[#AEAEB2] font-inter text-sm px-4 py-5 font-semibold"
                passHref
              >
                커뮤니티
              </Link>
              <Link
                href="/"
                className="text-[#AEAEB2] font-inter text-xs px-4 py-5 font-semibold"
                passHref
              >
                GAN Overflow
              </Link>
              <Link
                href="/"
                className="text-[#AEAEB2]  font-inter text-xs px-4 py-5 font-semibold"
                passHref
              >
                CONTACT
              </Link>
            </div>
          </div>
          <div className="col-sapn-1 self-center">
            <div className="self-center">
              <div className="hidden md:flex text-white font-bold hover:text-gray-400">
                <HeaderRight />
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
