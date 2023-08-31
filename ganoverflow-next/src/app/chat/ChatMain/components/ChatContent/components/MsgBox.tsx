const MsgBox = ({ children, isQuestion }: any) => {
  const styleClass = isQuestion
    ? "rounded-chat-question bg-primary text-white self-end origin-bottom-right"
    : "rounded-chat-answer bg-gray-500 text-white self-start origin-bottom-left";
  return (
    <div
      className={`msgBox mt-7 p-5 max-w-md text-xs animate-popIn ${styleClass}`}
    >
      {children}
    </div>
  );
};

export default MsgBox;
