import { Lottie_NatureFriendly } from "./components";

const Section5 = () => {
  return (
    <section className="sec-5 h-[90vh] w-full">
      <div className="h-full flex flex-col md:flex-row justify-between ">
        <div className="h-full flex flex-col gap-12">
          <div className="sec-title flex flex-col gap-3">
            <h1 className="text-left !text-3xl sm:!text-5xl md:!text-6xl">
              <div className="block lg:inline-block text-left">
                <span className="!text-secondary">환경</span>과<span> </span>
                <span className="!text-fuchsia-500">AI 기술이 </span>
                <span>공존하는 </span>
                세상을 고민합니다
              </div>{" "}
            </h1>
          </div>
          <div>
            <p className="tw-subtitle text-left !text-lg sm:!text-xl">
              잘 알려진 문제, 동료들이 앞서 겪었던 동일하거나 매우 유사한
              케이스에 대해 수많은 AI에 대한 중복질의를 발생시키지 않도록
              유도하여 즉각적으로 그리고 장기적으로 환경적, 에너지 절약 면에서
              세상에 큰 도움을 줄 수 있습니다.
            </p>
          </div>
        </div>

        <Lottie_NatureFriendly />
      </div>
    </section>
  );
};

export default Section5;
