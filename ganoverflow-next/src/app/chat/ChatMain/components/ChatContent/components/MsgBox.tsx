const MsgBox = ({ children, isQuestion }: any) => {
  const styleClass = isQuestion
    ? "rounded-chat-question bg-primary text-white self-end"
    : "rounded-chat-answer bg-gray-500 text-white self-start";
  return (
    <div className={`msgBox mt-4 p-5 max-w-sm text-xs ${styleClass}`}>
      {children}
    </div>
  );
};

export default MsgBox;
