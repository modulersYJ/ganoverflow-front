import { loadChatStatusState } from "@/atoms/chat";
import { ISaveChatModalProps } from "@/interfaces/IProps/chat";
import { useRecoilState } from "recoil";

export const SaveChatModal = ({
  onChangeTitleAndCategory,
  categories,
  setIsModalOpen,
  onClickSaveChatpostExec,
}: ISaveChatModalProps) => {
  const [loadChatStatus, setLoadChatStatus] =
    useRecoilState(loadChatStatusState);

  return (
    <div>
      <div className="fixed inset-0 bg-black opacity-50 z-20"></div>
      <dialog className="flex flex-col w-1/3 justify-between gap-1 px-20 py-10 mt-60 outline-none text-lg font-semibold backdrop:bg-black backdrop:opacity-90 rounded-md z-30">
        <input
          className="h-11 w-full"
          onChange={onChangeTitleAndCategory}
          defaultValue={loadChatStatus.loadedMeta?.title}
          placeholder="저장할 대화 제목을 입력해주세요"
          name="chatpostName"
        />
        <label>
          카테고리를 선택하세요
          <select
            name="category"
            onChange={onChangeTitleAndCategory}
            defaultValue={loadChatStatus.loadedMeta?.category}
          >
            <option value={""}>없음</option>
            {categories.map((category, idx: number) => (
              <option key={idx}>{category.categoryName}</option>
            ))}
          </select>
        </label>
        <div className="flex flex-row gap-1">
          <button
            onClick={(e) => {
              onClickSaveChatpostExec(e);
              setIsModalOpen(false);
            }}
            className="mx-auto px-5 py-2 w-1/3 bg-blue-400 outline-none rounded-md"
          >
            저장
          </button>
          <button
            onClick={() => {
              setIsModalOpen(false);
            }}
            className="mx-auto px-5 py-2 w-1/3  bg-blue-200 outline-none rounded-md"
          >
            취소
          </button>
        </div>
      </dialog>
    </div>
  );
};
