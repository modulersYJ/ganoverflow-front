import { Section1, Section2, Section3, Section4, Section5 } from "./sections";
import "./index.css";

const Landing = () => {
  return (
    <div className="relative w-full h-full flex flex-row justify-center">
      <div className="relative w-full sm:w-11/12 h-full flex flex-col gap-[30vh]">
        <Section1 />
        <Section2 />
        <Section3 />
        <Section4 />
        <Section5 />
      </div>
    </div>
  );
};

export default Landing;
