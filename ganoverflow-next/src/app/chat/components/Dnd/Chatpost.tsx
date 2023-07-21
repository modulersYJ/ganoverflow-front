import { useDrag } from "react-dnd";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  chatpostsWithFolderstate,
  foldersWithChatpostsState,
} from "@/atoms/folder";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import ChatIcon from "@mui/icons-material/Chat";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { IChatPostBasicInfo, IFolderWithPostsDTO } from "@/interfaces/chat";
import TitleEdit from "@/components/ui/Chat/TitleEdit";
import { getSessionStorageItem } from "@/utils/common/sessionStorage";
import { updateChatpostName } from "../../api/chat";
import { accessTokenState } from "@/atoms/jwt";
import { IAuthData } from "@/app/api/jwt";

const style: React.CSSProperties = {
  cursor: "move",
  float: "left",
};

export const Chatpost = function Chatpost({
  curChatpost,
  isDefault,
  curFolderId,
}: {
  curChatpost: IChatPostBasicInfo;
  curFolderId: IFolderWithPostsDTO["folderId"];
  isDefault: boolean;
}) {
  const setFoldersWithPostsByDnd = useSetRecoilState(chatpostsWithFolderstate);
  const [foldersWithPosts, setFoldersWithPosts] = useRecoilState(
    foldersWithChatpostsState
  );

  const [chatpostName, setChatpostName] = useState<string>(
    curChatpost.chatpostName
  );

  const userData = getSessionStorageItem("userData");
  const accessToken = useRecoilValue(accessTokenState);

  const handleUpdatePostName = async (newName: string) => {
    setChatpostName(newName);
    const newFoldersWithPost = await updateChatpostName(
      curChatpost.chatPostId,
      newName,
      userData.id,
      curFolderId,
      {
        accessToken,
        userId: userData.id,
      } as IAuthData
    );

    setFoldersWithPosts(newFoldersWithPost);

    return newFoldersWithPost;
  };

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "chatpost", // ref={drag}로 받는 컴포넌트의 data-testid와 대응관계
    item: curChatpost,
    end: (item, monitor) => {
      const dropResult: any = monitor.getDropResult();
      if (item && dropResult) {
        if (curFolderId !== dropResult.folderId) {
          setFoldersWithPostsByDnd({
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

  const onClickDeleteChatpostBtn = () => {
    setFoldersWithPosts([
      ...foldersWithPosts.map((folder) =>
        folder.folderId === curFolderId
          ? {
              ...folder,
              chatposts: folder.chatposts.filter(
                (chatpost) => curChatpost.chatPostId !== chatpost.chatPostId
              ),
            }
          : { ...folder }
      ),
    ]);
    curChatpost.chatPostId;
  };
  return (
    <div ref={drag} style={{ opacity }} data-testid={`chatpost`}>
      <PostUnit
        onClickDeleteBtn={onClickDeleteChatpostBtn}
        postData={curChatpost}
        isDefault={isDefault}
        style={style}
        opacity={opacity}
        handleUpdatePostName={handleUpdatePostName}
      />
    </div>
  );
};

const PostUnit: React.FC<{
  postData: IChatPostBasicInfo;
  isDefault: boolean;
  style: any;
  opacity: any;
  onClickDeleteBtn: any;
  handleUpdatePostName: any;
}> = ({
  postData,
  isDefault,
  style,
  opacity,
  onClickDeleteBtn,
  handleUpdatePostName,
}) => {
  return (
    <div
      className={`postUnit w-[calc(100%-8px)] mx-[4px] my-[1px] px-1 text-gray-200 py-1 hover:bg-slate-400  ${
        isDefault ? "pl-1" : "pl-5"
      } cursor-pointer`}
      style={{ ...style, opacity }}
    >
      <Box
        sx={{
          "&:hover": {
            cursor: "pointer",
            "& .deleteIcon": {
              opacity: "1",
            },
          },
        }}
      >
        <div className="flex flex-row pb-1">
          <div className="w-2/12 ">
            <ChatIcon sx={{ fontSize: "17px" }} />
          </div>

          <TitleEdit
            initialName={postData.chatpostName}
            onSave={handleUpdatePostName}
          />

          <button className="w-2/12" onClick={onClickDeleteBtn}>
            <DeleteOutlineIcon
              className="deleteIcon"
              sx={{
                fontSize: "14px",
                color: "white",
                opacity: "0",
                transition: "opacity 0.2s ease",
              }}
            />
          </button>
        </div>
      </Box>
    </div>
  );
};
