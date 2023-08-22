import { useDrag } from "react-dnd";
import {
  deleteChatpost,
  getOneChatPostById,
  updateChatpostName,
} from "@/app/chat/api/chat";
import { TLoadChatStatus } from "@/atoms/chat";
import {
  IChatPair,
  IChatPostBasicInfo,
  IFolderWithPostsDTO,
} from "@/interfaces/chat";
import { SetterOrUpdater } from "recoil";
import {
  TUserData,
  getSessionStorageItem,
} from "@/utils/common/sessionStorage";

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
  ({
    chatpost,
    folderId,
    userId,
    setName,
    setFolders,
  }: {
    chatpost: IChatPostBasicInfo;
    folderId: IFolderWithPostsDTO["folderId"];
    userId: TUserData["id"];
    setName: React.Dispatch<React.SetStateAction<string>>;
    setFolders: React.Dispatch<React.SetStateAction<IFolderWithPostsDTO[]>>;
  }) =>
  async (newName: string) => {
    setName(newName);
    const newFoldersWithPost = await updateChatpostName(
      chatpost.chatPostId,
      newName,
      userId,
      folderId
    );
    setFolders(newFoldersWithPost);
    return newFoldersWithPost;
  };

const getHandleDeleteChatpost =
  ({
    curChatpost,
    setFolders,
  }: {
    curChatpost: IChatPostBasicInfo;
    setFolders: React.Dispatch<React.SetStateAction<IFolderWithPostsDTO[]>>;
  }) =>
  async () => {
    try {
      const updatedFolders = await deleteChatpost({
        userId: getSessionStorageItem("userData").userId,
        chatpostId: curChatpost.chatPostId,
      });
      setFolders(updatedFolders);
    } catch (error: any) {
      alert(error.message);
    }
  };

const getHandleLoadThisPost =
  (
    chatpost: IChatPostBasicInfo,

    setStatus: any,
    setPairs: React.Dispatch<React.SetStateAction<IChatPair[]>>
  ) =>
  async () => {
    const LoadedPost = await getOneChatPostById(chatpost.chatPostId);
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
