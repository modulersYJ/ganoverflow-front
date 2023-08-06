import { useDrag } from "react-dnd";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  chatpostsWithFolderstate,
  foldersWithChatpostsState,
} from "@/atoms/folder";
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import ChatIcon from "@mui/icons-material/Chat";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import {
  IChatPair,
  IChatPostBasicInfo,
  IFolderWithPostsDTO,
  TLoadThisChatHandler,
} from "@/interfaces/chat";
import TitleEdit from "@/components/ui/Chat/TitleEdit";
import { getSessionStorageItem } from "@/utils/common/sessionStorage";
import { getOneChatPostById, updateChatpostName } from "../../api/chat";
import { accessTokenState } from "@/atoms/jwt";
import { IAuthData } from "@/app/api/jwt";
import useDidMountEffect from "@/hooks/useDidMountEffect";
import { isLoadedChatState } from "@/atoms/chat";

const style: React.CSSProperties = {
  cursor: "move",
  float: "left",
};

export const Chatpost = function Chatpost({
  curChatpost,
  isDefault,
  curFolderId,
  loadThisChatHandler,
}: {
  curChatpost: IChatPostBasicInfo;
  curFolderId: IFolderWithPostsDTO["folderId"];
  isDefault: boolean;
  loadThisChatHandler: TLoadThisChatHandler;
}) {
  const setFoldersWithPostsByDnd = useSetRecoilState(chatpostsWithFolderstate);
  const [foldersWithPosts, setFoldersWithPosts] = useRecoilState(
    foldersWithChatpostsState
  );

  const [chatpostName, setChatpostName] = useState<string>(
    curChatpost.chatpostName
  );
  const [loadedChatPairs, setLoadedChatPairs] = useState<IChatPair[]>([]);
  const [isLoadedChat, setIsLodedChat] = useRecoilState(isLoadedChatState);

  // 클릭된 해당 포스트의 채팅을 로드
  useDidMountEffect(() => {
    loadThisChatHandler(loadedChatPairs);
  }, [loadedChatPairs]);

  const userData = getSessionStorageItem("userData");
  const accessToken = useRecoilValue(accessTokenState);
  const authData = {
    accessToken,
    userId: userData.id,
  };

  const handleUpdatePostName = async (newName: string) => {
    setChatpostName(newName);
    const newFoldersWithPost = await updateChatpostName(
      curChatpost.chatPostId,
      newName,
      userData.id,
      curFolderId,
      authData as IAuthData
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

  const onClickLoadThisPost = async () => {
    const LoadedPost = await getOneChatPostById(
      curChatpost.chatPostId,
      authData as IAuthData
    );

    setIsLodedChat(true);
    setLoadedChatPairs(LoadedPost.chatPair);
  };

  return (
    <div ref={drag} style={{ opacity }} data-testid={`chatpost`}>
      <PostUnit
        onClickLoadBtn={onClickLoadThisPost}
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
  onClickLoadBtn: any;
  handleUpdatePostName: any;
}> = ({
  postData,
  isDefault,
  style,
  opacity,
  onClickDeleteBtn,
  onClickLoadBtn,
  handleUpdatePostName,
}) => {
  return (
    <div
      className={`postUnit w-[calc(100%-8px)] mx-[4px] my-[1px] px-1 text-gray-200 py-1 hover:bg-slate-600  ${
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
          <div onClick={onClickLoadBtn} className="w-full">
            <TitleEdit
              initialName={postData.chatpostName}
              onSave={handleUpdatePostName}
            />
          </div>
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
