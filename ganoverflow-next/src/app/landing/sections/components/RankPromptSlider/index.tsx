import { useState, useEffect } from "react";
import Link from "next/link";

interface DataArrProps {
  dataArr: {
    id: number;
    title: string;
    link: string;
  }[];
}

const RankPromptSlider: React.FC<DataArrProps> = ({ dataArr }) => {
  const [activeCardIndex, setActiveCardIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCardIndex((prevIndex) => (prevIndex + 1) % dataArr.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="rank-prompt pt-3 gap-2 w-full md:gap-3 md:w-5/6 flex flex-col">
      {dataArr.map((data, index) => (
        <div
          key={index}
          className={`rank-prompt-card text-[9px] sm:text-sm  border-white rounded-xl  p-[0.5px]
          
          ${
            index === activeCardIndex
              ? "bg-slate-600 transform scale-110 z-10 text-white"
              : "bg-black text-slate-400"
          } transition-all duration-500`}
        >
          <Link
            href={data.link}
            className="card-container"
            passHref
            target="_blank"
            rel="noreferrer"
            prefetch={false}
          >
            <div key={data.id} className="">
              <div className="card-content">
                <h3>{data.title}</h3>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default RankPromptSlider;
