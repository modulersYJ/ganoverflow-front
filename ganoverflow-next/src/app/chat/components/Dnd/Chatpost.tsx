import { useDrag } from "react-dnd";
import { useSetRecoilState } from "recoil";
import { chatpostWithFolderstate } from "./atom/recoilState";
import React from "react";
import ChatIcon from "@mui/icons-material/ChatBubble";

const style: React.CSSProperties = {
  border: "1px dashed gray",

  cursor: "move",
  float: "left",
};

export const Chatpost = function Chatpost({
  chatpost,
  isDefault,
}: {
  chatpost: any;
  isDefault: boolean;
}) {
  const setChatpost = useSetRecoilState(chatpostWithFolderstate);
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "chatpost",
    item: chatpost,
    end: (item, monitor) => {
      const dropResult: any = monitor.getDropResult();
      if (item && dropResult) {
        // 소스 폴더 ID와 목적지 폴더 ID가 다른 경우에만 상태 업데이트
        if (item.folderId !== dropResult.folderId) {
          setChatpost({ ...item, folderId: dropResult.folderId });
        }
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    }),
  }));

  const opacity = isDragging ? 0.4 : 1;

  return (
    // <div ref={drag} style={{ ...style, opacity }} data-testid={`chatpost`}>
    //   {chatpost.chatpostName}
    // </div>
    <div ref={drag} style={{ opacity }} data-testid={`chatpost`}>
      <PostUnit
        postData={chatpost}
        isDefault={isDefault}
        style={style}
        opacity={opacity}
      />
    </div>
  );
};

const PostUnit: React.FC<{
  postData: any;
  isDefault: boolean;
  style: any;
  opacity: any;
}> = ({ postData, isDefault, style, opacity }) => {
  return (
    <div
      className={`w-[calc(100%-8px)] mx-[4px] my-[1px] px-1 bg-emerald-400 text-black border-gray-900 border py-1 hover:bg-slate-400 ${
        isDefault ? "pl-1" : "pl-5"
      }`}
      style={{ ...style, opacity }}
    >
      <div className="flex flex-row pb-1">
        <div className="w-2/12 ">
          <ChatIcon sx={{ fontSize: "17px" }} />
        </div>
        <div className="w-8/12 px-1 pt-[3px] text-left text-sm">
          {postData.chatpostName}
        </div>
      </div>
    </div>
  );
};
