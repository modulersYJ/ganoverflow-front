import { loadChatStatusState } from "@/atoms/chat";
import { IPostMetaInput } from "@/interfaces/IProps/chat";
import React, {
  ChangeEvent,
  useState,
  useRef,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";
import { useRecoilValue } from "recoil";

const FieldTagFactory = ({
  postMetaInput,
  setPostMetaInput,
}: {
  postMetaInput: IPostMetaInput;
  setPostMetaInput: Dispatch<SetStateAction<IPostMetaInput>>;
}) => {
  const [inputValue, setInputValue] = useState<string>("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const loadChatStatus = useRecoilValue(loadChatStatusState);

  useEffect(() => {
    if (loadChatStatus.loadedMeta?.tags?.length !== 0) {
      setPostMetaInput((prevState) => ({
        ...prevState,
        tags: loadChatStatus.loadedMeta?.tags,
      }));
    }
  }, [loadChatStatus]);

  const onChange = (e: ChangeEvent<any>) => {
    setInputValue(e.target.value);
  };

  const onKeyDownTagRegisterDelete = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Enter") {
      setPostMetaInput({
        ...postMetaInput,
        tags: postMetaInput?.tags
          ? [...postMetaInput.tags, inputValue]
          : [inputValue],
      });

      setInputValue("");
      return;
    }

    if (e.key === "Backspace" && inputValue === "") {
      setPostMetaInput({
        ...postMetaInput,
        tags: postMetaInput?.tags?.slice(0, postMetaInput.tags.length - 1),
      });

      return;
    }
  };

  const handleTagDelete = (idx: number) => {
    setPostMetaInput({
      ...postMetaInput,
      tags: postMetaInput?.tags?.filter((tag, i) => i !== idx),
    });
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = scrollRef.current.scrollWidth;
    }
  }, [postMetaInput.tags]);

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm text-left">태그</label>
      <div
        ref={scrollRef}
        className="
        flex flex-row justify-start
        h-11 w-full border-2px border-white rounded-md bg-white dark:bg-[#121212] font-normal
        overflow-x-hidden white-space-nowrap
      "
      >
        <div className="TagArea ml-3 mr-1 flex flex-row gap-2">
          {postMetaInput?.tags?.map((tag, idx) => (
            <TagChip key={idx} id={idx} handleTagDelete={handleTagDelete}>
              {tag}
            </TagChip>
          ))}
        </div>
        <input
          className="h-full w-full min-w-[40%] border-2px border-white rounded-md dark:bg-[#121212] px-2 font-normal outline-none text-left text-xs"
          onChange={onChange}
          onKeyDown={onKeyDownTagRegisterDelete}
          value={inputValue}
          placeholder="태그를 입력하고 엔터 (ex. SF소설, python, ...)"
          name="tags"
        />
      </div>
    </div>
  );
};

const TagChip = ({
  id,
  children,
  handleTagDelete,
}: {
  id: number;
  children: any;
  handleTagDelete: (idx: number) => void;
}) => {
  return (
    <button
      className="h-full inline-flex items-center animate-popIn"
      onClick={() => handleTagDelete(id)}
    >
      <span className="inline-flex items-center !text-xs whitespace-nowrap bg-gray-100 font-normal dark:bg-[#1E1E1E] text-primary dark:text-secondary h-3/5 my-2 px-2 rounded-full">
        {children}
      </span>
    </button>
  );
};

export default FieldTagFactory;
