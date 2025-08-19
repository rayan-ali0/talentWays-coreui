import React from "react";
import PdfIcon from "../../assets/images/pdf.svg";
import { DownloadSvgIcon } from "../icons/icons";
import { IAttachment } from "@moj/common";

interface ReadOnlyFileProps {
  attachment: IAttachment;
  icon?: string;
  onDownload?: () => void;
}

export const ReadOnlyFileInput: React.FC<ReadOnlyFileProps> = ({
  attachment,
  icon = PdfIcon,
  onDownload,
}) => {
  return (
    <div className="border rounded-md border-aeblack-300 px-4 py-2 flex items-center justify-between flex-1">
      <div className="flex items-center gap-2">
        <img src={icon} alt="file icon" />
        <span className="text-aeblack-800">{attachment?.fileName}</span>
      </div>
      <div className="cursor-pointer" onClick={onDownload}>
        <DownloadSvgIcon className="hover:cursor-pointer" />
      </div>
    </div>
  );
};
