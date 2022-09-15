import React from "react";

type OptionCardType = {
  selectedOption: (value: string) => void,
  data: {
    text: string,
    image: string,
    color: string,
    option: string
  },
  isLastData: boolean
}

function OptionCard({ selectedOption, data, isLastData }: OptionCardType) {
  return (
    <div onClick={() => selectedOption(data.option)} className={`${isLastData && "mb-px-60"} bg-background-dark mt-px-9 p-px-12 rounded-px-3 cursor-pointer hover:bg-background-dropdown-active duration-300 ease-in-out`}>
      <div className="flex flex-row gap-3 justify-between items-between">
        <div className={`${data.color} mr-px-9 h-px-42 w-px-60 px-px-6  box-content flex justify-center items-center rounded-px-3`}>
          <img src={data.image} alt="logo" className="h-px-30 w-px-30 opacity-100" />
        </div>
        <div className="flex flex-col gap-1 items-center justify-center w-full">
          <h1 className="text-15 text-light-100">{data.text}</h1>
        </div>
        <div className="h-px-42 w-px-60"></div>
      </div>
    </div>
  );
}

export default OptionCard;
