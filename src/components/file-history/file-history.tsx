import React from "react";

export interface IFileHistoryProps {
  title: string;
  date?: string;
  content?: string;
}

export interface IFileHistoryComponentProps {
  fileHistory: IFileHistoryProps[];
}

const CustomArrow = () => (
  <svg width="6" height="83" viewBox="0 0 6 83" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M3 82.1003C4.47276 82.1003 5.66667 80.9064 5.66667 79.4336C5.66667 77.9608 4.47276 76.7669 3 76.7669C1.52724 76.7669 0.333333 77.9608 0.333333 79.4336C0.333333 80.9064 1.52724 82.1003 3 82.1003ZM3 79.4336H3.5L3.5 0.433594H3H2.5L2.5 79.4336H3Z"
      fill="#E1E3E5"
    />
  </svg>
);

const CalendarIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M12.6667 2.66667H3.33333C2.59695 2.66667 2 3.26362 2 4.00001V12.6667C2 13.403 2.59695 14 3.33333 14H12.6667C13.403 14 14 13.403 14 12.6667V4.00001C14 3.26362 13.403 2.66667 12.6667 2.66667Z"
      stroke="#6B7280"
      strokeWidth="1.33333"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M10.6667 1.33334V4.00001"
      stroke="#6B7280"
      strokeWidth="1.33333"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M5.33333 1.33334V4.00001"
      stroke="#6B7280"
      strokeWidth="1.33333"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M2 6.66667H14" stroke="#6B7280" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const FileHistory: React.FC<IFileHistoryComponentProps> = ({ fileHistory }) => {
  return (
    <div className="mx-auto p-6">
      <div className="relative">
        <div className="space-y-8">
          {fileHistory.map((transcript, index) => (
            <div key={`transcript_${index}`} className="relative flex items-start gap-6">
              <div className="flex flex-col items-center relative z-10 flex-shrink-0">
                <div className="w-10 h-10 bg-slate-50 border-2 border-seablue-700 rounded-full flex items-center justify-center">
                  <span className="text-seablue-700 font-bold text-sm">{index + 1}</span>
                </div>
                {index < fileHistory.length - 1 && (
                  <div className="mt-2">
                    <CustomArrow />
                  </div>
                )}
              </div>

              <div className="flex-1 bg-slate-100 rounded-lg p-4">
                <div className={`flex items-center gap-3 mb-3 max-sm:items-start max-sm:flex-col  ${transcript.content ? "" : "flex-col items-start justify-start w-fit"}`}>
                  <div className="text-aeblack-800 font-bold text-xl">{transcript.title}</div>

                  {transcript?.date && (
                    <div className="flex items-center gap-2 text-aeblack-600">
                      <CalendarIcon />
                      <span className="text-sm">{transcript.date}</span>
                    </div>
                  )}
                </div>

                {transcript?.content && <p className="text-aeblack-600 text-sm leading-relaxed">{transcript.content}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
