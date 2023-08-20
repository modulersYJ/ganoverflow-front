import { IFolderWithPostsDTO } from "@/interfaces/chat";
import { Dispatch, SetStateAction } from "react";
import { SetterOrUpdater } from "recoil";

import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ArrowSpreadIcon from "@mui/icons-material/ArrowDropDown";
import ArrowFoldIcon from "@mui/icons-material/ArrowLeft";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

export const FolderUtilityButtons: React.FC<TFolderBtnProps> = (props) => {
  const {
    onClickToggleDeleteBtnShow,
    onClickToggleFolderSpread,
    isFolderSpread,
    SxConfirmIcons,
  } = props;

  const SxFuncIcons = {
    ...SxConfirmIcons,
    fontSize: "14px",
    opacity: "0",
    transition: `opacity 0.2s ease, color 0.2s ease`,
  };

  return (
    <>
      <ButtonIcon
        className="w-2/12"
        onClick={onClickToggleDeleteBtnShow}
        Icon={DeleteOutlineIcon}
        sx={SxFuncIcons}
      />
      <ButtonIcon
        className="w-2/12"
        onClick={onClickToggleFolderSpread}
        Icon={isFolderSpread ? ArrowSpreadIcon : ArrowFoldIcon}
        sx={SxConfirmIcons}
      />
    </>
  );
};

export const DeleteFolderButtons: React.FC<TFolderBtnProps> = (props) => {
  const { onClickToggleDeleteBtnShow, onClickDeleteFolder, SxConfirmIcons } =
    props;

  return (
    <>
      <ButtonIcon
        className="w-2/12"
        onClick={onClickDeleteFolder}
        Icon={CheckIcon}
        sx={SxConfirmIcons}
      />
      <ButtonIcon
        className="w-2/12"
        onClick={onClickToggleDeleteBtnShow}
        Icon={CloseIcon}
        sx={SxConfirmIcons}
      />
    </>
  );
};

export const ButtonIcon: React.FC<{
  className: string;
  onClick: () => void;
  Icon: any;
  sx: any;
}> = ({ className, onClick, Icon, sx }) => (
  <button className={className} onClick={onClick}>
    <Icon className="func-icons" sx={sx} />
  </button>
);

export type TFolderBtnProps = {
  onClickToggleDeleteBtnShow: () => void;
  setIsDeleteFolderClicked: Dispatch<SetStateAction<boolean>>;
  isDeleteFolderClicked: boolean;
  setFoldersWithPosts: SetterOrUpdater<IFolderWithPostsDTO[]>;
  foldersWithPosts: IFolderWithPostsDTO[];
  onClickDeleteFolder: () => void;
  curFolder: IFolderWithPostsDTO;
  SxConfirmIcons: any;
  onClickToggleFolderSpread: () => void;
  isFolderSpread: boolean;
};
