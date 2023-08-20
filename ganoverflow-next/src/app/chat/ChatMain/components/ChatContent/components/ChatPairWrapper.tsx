const ChatPairWrapper = ({
  children,
  index,
}: {
  index: number;
  children: React.ReactNode;
}) => {
  return (
    <div
      key={index}
      className={`w-full py-5 ${
        index % 2 === 0
          ? "bg-gray-300 dark:bg-[#2c2c33]"
          : "bg-gray-200 dark:bg-[#202024]" // 홀짝 배경색 변경
      } flex flex-row
		`}
    >
      <div className="chatPairContainer h-full flex flex-col sm:flex-row items-center w-full md:w-2/5 m-auto">
        {children}
      </div>
    </div>
  );
};

export default ChatPairWrapper;
