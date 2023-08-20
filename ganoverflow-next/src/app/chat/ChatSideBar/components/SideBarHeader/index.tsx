import React from "react";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import { GetHandleNewFolderBtn } from "./handlers";

interface ISideBarHeaderProps {
  onClickNewChatBtn: (e: React.MouseEvent<Element, MouseEvent>) => void;
}

const SideBarHeader: React.FC<ISideBarHeaderProps> = ({
  onClickNewChatBtn,
}) => {
  const onClickNewFolderBtn = GetHandleNewFolderBtn();

  return (
    <div className="sideHeader bg-black h-14 w-full flex justify-center gap-2 ">
      <button
        className="text-white mt-2 borderBtn w-3/5 h-4/6 border rounded text-sm"
        onClick={onClickNewChatBtn}
      >
        New Chat
      </button>
      <button
        className="text-white mt-2 borderBtn w-1/5 h-4/6 border rounded"
        onClick={onClickNewFolderBtn}
      >
        <CreateNewFolderIcon sx={{ fontSize: "14px" }} />
      </button>
    </div>
  );
};

export default SideBarHeader;
