import { useDrag } from "react-dnd";
import { getOneChatPostById, updateChatpostName } from "@/app/chat/api/chat";
import { IAuthData } from "@/app/api/jwt";
import { TLoadChatStatus } from "@/atoms/chat";
import {
  IChatPair,
  IChatPostBasicInfo,
  IFolderWithPostsDTO,
} from "@/interfaces/chat";
import { SetterOrUpdater } from "recoil";

/* 참조투명한 함수형 컴포넌트 구성요소로 분해/결합 */
const useChatpostDrag = (
  setFoldersWithPostsByDnd: SetterOrUpdater<any>,
  curChatpost: IChatPostBasicInfo,
  curFolderId: IFolderWithPostsDTO["folderId"]
) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "chatpost",
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

  return { isDragging, drag };
};

const getHandleUpdateChatpostName =
  (
    chatpost: IChatPostBasicInfo,
    folderId: IFolderWithPostsDTO["folderId"],
    authData: IAuthData,
    setName: React.Dispatch<React.SetStateAction<string>>,
    setFolders: React.Dispatch<React.SetStateAction<IFolderWithPostsDTO[]>>
  ) =>
  async (newName: string) => {
    setName(newName);
    const newFoldersWithPost = await updateChatpostName(
      chatpost.chatPostId,
      newName,
      authData.userId,
      folderId,
      authData
    );
    setFolders(newFoldersWithPost);
    return newFoldersWithPost;
  };

const getHandleDeleteChatpost =
  (
    curChatpost: IChatPostBasicInfo,
    folderId: IFolderWithPostsDTO["folderId"],
    folders: IFolderWithPostsDTO[],
    setFolders: React.Dispatch<React.SetStateAction<IFolderWithPostsDTO[]>>
  ) =>
  () => {
    setFolders(
      folders.map((folder) =>
        folder.folderId === folderId
          ? {
              ...folder,
              chatposts: folder.chatposts.filter(
                (chatpost) => curChatpost.chatPostId !== chatpost.chatPostId
              ),
            }
          : { ...folder }
      )
    );
  };

const getHandleLoadThisPost =
  (
    chatpost: IChatPostBasicInfo,
    authData: IAuthData,
    setStatus: any,
    setPairs: React.Dispatch<React.SetStateAction<IChatPair[]>>
  ) =>
  async () => {
    const LoadedPost = await getOneChatPostById(chatpost.chatPostId, authData);
    setStatus({
      status: TLoadChatStatus.SHOWING,
      loadedMeta: {
        folderId: LoadedPost.folderId,
        chatPostId: chatpost.chatPostId,
        title: LoadedPost.chatpostName,
        category: LoadedPost.categoryName?.categoryName,
      },
    });
    setPairs(LoadedPost.chatPair);
  };

export {
  useChatpostDrag,
  getHandleUpdateChatpostName,
  getHandleDeleteChatpost,
  getHandleLoadThisPost,
};
