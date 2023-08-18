import Link from "next/link";

export default async function Mypage() {
  return (
    <div className="h-full flex flex-col items-center">
      <div className="mypage-title">
        <h1>마이페이지</h1>
      </div>
      <div className="mypage-box mypage-likes">
        <h3>좋아요 한 게시물</h3>
      </div>
      <div className="mypage-box mypage-favorite-category">
        <h3>관심있을만한 게시물</h3>
      </div>
      <div className="mypage-box mypage-favorite-category">
        <h3>내가 작성한 게시물</h3>
      </div>
      <div className="mypage-myinfo h-20">
        <Link href={"my-info"}>
          <button className=" rounded-lg bg-primary p-4">내 정보 수정</button>
        </Link>
      </div>
    </div>
  );
}
