import React, { useState } from "react";

import { closeIcons, icons } from "../custom-alert/custom-alert";

interface IAlertListProps {
  title: string;
  messages: string[];
  withCancel?: boolean;
  type: "info" | "error" | "warning" | "success";
}

export const AlertList: React.FC<IAlertListProps> = ({ title, messages, withCancel = false, type }) => {
  const [hidden, setHidden] = useState<boolean>(false);
  const hideAlert = () => {
    setHidden(true);
  };

  return (
    <div role="alert" className={`aegov-alert alert-${type} ${hidden && "hidden"}`}>
      <div className="alert-icon">
        {icons.map((icon, index) => {
          return icon.type == type && <icon.component key={index} />;
        })}
      </div>
      <div className="alert-content">
        <div className="alert-title mt-0.5">{title}</div>
        <ul className="list-disc mt-3 space-y-2 ps-4">
          {messages && messages.map((message, index) => <li key={`message-${index}`}>{message}</li>)}
        </ul>
      </div>
      {withCancel && (
        <div className="alert-dismiss top-3 end-3">
          <button onClick={hideAlert} className="p-0" data-dismiss-target="#alert-1" aria-label="Close">
            {closeIcons.map((icon, index) => {
              return icon.type == type && <icon.component key={index} />;
            })}
          </button>
        </div>
      )}
    </div>
  );
};
