import React, { useState } from "react";
import DropDownIcon from 'src/assets/images/down-light.png'

function DropDown({ options }: { options: string[] }) {
  const [dropDownState, setDropDownState] = useState<boolean>(false);
  const [activeDropDown, setActiveDropDown] = useState<number>(0);
  // Inject context here for active state

  const handleDropDown = (): void => {
    setDropDownState(!dropDownState);
  }

  const dropDownMenu = options.map((option, index) => {
    return (
      <div
        key={index}
        className={`selected flex flex-row justify-between items-center gap-6 pl-px-12 pr-px-9 py-px-6 text-15  cursor-pointer ${index + 1 === options.length && 'rounded-b-px-3'} ${activeDropDown === index ? 'bg-background-dropdown-active' : 'bg-background-dropdown-inactive'}`}
        onClick={() => {
          setActiveDropDown(index);
          setDropDownState(!dropDownState);
        }} >
        <span className="text-light-100">{option}</span>
      </div>
    )
  })
  return (
    <div className="flex flex-row justify-between items-start gap-6">
      <span className="text-15 font-medium w-px-100 mt-px-6">Sort by:</span>
      <div className="w-full">
        <div className={`selected flex flex-row justify-between items-center gap-6 pl-px-12 pr-px-9 py-px-6 text-15 bg-background-dropdown-selected rounded-t-px-3 ${dropDownState || 'rounded-b-px-3'} cursor-pointer	`} onClick={handleDropDown} >
          <span className="text-light-100">{options[activeDropDown]}</span>
          <img src={DropDownIcon} alt="logo" className={`h-px-20 ${dropDownState && 'rotate-180'}`} />
        </div>
        {dropDownState && dropDownMenu}
      </div>
    </div>
  );
}

export default DropDown;
