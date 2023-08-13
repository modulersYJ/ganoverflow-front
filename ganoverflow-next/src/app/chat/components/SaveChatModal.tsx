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
      <div className="fixed inset-0 bg-black opacity-40 z-20"></div>

      <dialog className="fixed bg-gray-100 dark:bg-black top-1/4 flex flex-col w-1/3 justify-between gap-6 px-20 py-10 outline-none text-lg font-semibold rounded-md z-30">
        <h2 className="tw-subtitle">채팅 저장하기</h2>
        <div className="flex flex-col gap-2 mt-5">
          <label className="text-sm text-left">제목</label>
          <input
            className="h-11 w-full border-2px border-white rounded-sm dark:bg-[#121212] px-2 py-1 font-normal"
            onChange={onChangeTitleAndCategory}
            defaultValue={loadChatStatus.loadedMeta?.title}
            placeholder="저장할 대화 제목을 입력해주세요"
            name="chatpostName"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className=" text-sm text-left font-normal">
            카테고리 선택
          </label>
          <select
            name="category"
            className="dark:bg-[#121212] py-3"
            onChange={onChangeTitleAndCategory}
            defaultValue={loadChatStatus.loadedMeta?.category}
          >
            <option value={""}>없음</option>
            {categories.map((category, idx: number) => (
              <option key={idx}>{category.categoryName}</option>
            ))}
          </select>
        </div>
        <div className="flex flex-row mt-5 justify-between">
          <button
            onClick={() => {
              setIsModalOpen(false);
            }}
            className="px-5 py-2 w-1/3 bg-white dark:bg-[#141414] outline-none rounded-md"
          >
            취소
          </button>
          <button
            onClick={(e) => {
              onClickSaveChatpostExec(e);
              setIsModalOpen(false);
            }}
            className="px-5 py-2 w-1/3 bg-secondary outline-none rounded-md !text-black "
          >
            저장
          </button>
        </div>
      </dialog>
    </div>
  );
};
