import { getAllCategories } from "../../../api/chat";

export const BtnSubmitSaveChat = ({
  checkCnt,
  onClickHandler,
  setCategories,
}: {
  checkCnt: number;
  onClickHandler: React.MouseEventHandler;
  setCategories: (value: any) => void;
}) => {
  return (
    <div>
      {checkCnt > 0 ? (
        <button
          className="rounded-3xl animate-popIn origin-bottom bg-gray-100 dark:bg-gray-700 h-14 flex flex-col justify-center opacity-85 "
          onClick={async (e) => {
            onClickHandler(e);
            setCategories(await getAllCategories());
          }}
        >
          <div className="m-4 flex flex-row">
            <div className="rounded-full w-8 h-7 text-sm font-bold bg-primary dark:bg-gray-600">
              <div className="mt-1 text-white">+{checkCnt}</div>
            </div>
            <div className="mt-1 ml-3 text-sm font-semibold">채팅 저장하기</div>
          </div>
        </button>
      ) : (
        <div></div>
      )}
    </div>
  );
};
