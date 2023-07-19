import { useDrag } from "react-dnd";
import { useSetRecoilState } from "recoil";
import { chatpostsWithFolderstate } from "@/atoms/folder";
import React from "react";

const style: React.CSSProperties = {
  // border: "1px dashed gray",
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
  const setFoldersWithPosts = useSetRecoilState(chatpostsWithFolderstate);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "chatpost",
    item: chatpost,
    end: (item, monitor) => {
      const dropResult: any = monitor.getDropResult();
      if (item && dropResult) {
        // 소스 폴더 ID와 목적지 폴더 ID가 다른 경우에만 상태 업데이트
        if (item.folderId !== dropResult.folderId) {
          // 폴더 변경 감지 및 업데이트를 위해, dropResult의 folderId는 담아줌다, 하지만 atom의 folderState를 보면 set처리 중 조건판별에만 사용한 이후 실제 저장하지 않도록 처리했음
          setFoldersWithPosts({
            ...item,
            folderId: dropResult.folderId,
          });
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
      className={`w-[calc(100%-8px)] mx-[4px] my-[1px] px-1 text-gray-200 py-1 hover:bg-slate-400  ${
        isDefault ? "pl-1" : "pl-5"
      }`}
      style={{ ...style, opacity }}
    >
      <div className="flex flex-row pb-1">
        <div className="w-2/12 ">
          {/* <ChatIcon sx={{ fontSize: "17px" }} /> */}
        </div>
        <div className="w-8/12 px-1 pt-[3px] text-left text-sm">
          {postData.chatpostName}
        </div>
      </div>
    </div>
  );
};
