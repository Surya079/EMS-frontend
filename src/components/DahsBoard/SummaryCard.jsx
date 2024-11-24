import React from "react";
export const SummaryCard = ({ icons, text, numbers, color }) => {
  return (
    <div className="rounded flex bg-white border ">
      <div
        className={`flex text-3xl justify-center items-center ${color} px-4 text-white`}>
        {icons}
      </div>
      <div className="pl-4 py-1">
        <p className="text-lg font-semibold">{text}</p>
        <p className="text-xl font-bold">{numbers}</p>
      </div>
    </div>
  );
};
