import React, { useState } from "react";
import Card from "src/components/organisms/CardPopup/CardPopup";
import DropDownIcon from 'src/assets/images/down-light.png'
import Button from "src/components/molecules/Button/Button";

type AddWalletTypes = {
  onClickHeader: () => void,
  handleSubmit: () => void
}

function AddWallet({ onClickHeader, handleSubmit }: AddWalletTypes) {
  const [dropDownState, setDropDownState] = useState<boolean>(false);
  const [activeDropDown, setActiveDropDown] = useState<number>(1);

  const options = [
    'Day',
    '15 Days',
    '30 Days'
  ]

  const moreData = options.map((option, index) => {
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
  });
  return (
    <Card header={true} headerText="Add wallet" onClickHeader={onClickHeader} closeModal={onClickHeader}>
      <div className="flex flex-col gap-2">
        <div className="flex flex-col">
          <label htmlFor="wallet_name" className="text-13 font-medium">Wallet name</label>
          <input type="text" className="bg-background-dropdown-selected h-px-30 rounded-px-3 text-light-100 text-13 px-px-12" />
        </div>
        <div className="flex flex-col">
          <p className="text-13 font-medium">Income every</p>
          <div onClick={() => setDropDownState(!dropDownState)} className={`bg-background-dropdown-selected h-px-30 rounded-t-px-3 ${dropDownState || 'rounded-b-px-3'} text-light-100 text-13 flex flex-row justify-between items-center p-px-12`}>
            <p>{options[activeDropDown]}</p>
            <img src={DropDownIcon} alt="dropdown" className={`h-px-20 ${dropDownState && 'rotate-180'}`} />
          </div>
          {dropDownState && moreData}
        </div>
        <div className="flex flex-col">
          <label htmlFor="amount" className="text-13 font-medium">Amount</label>
          <input type="number" className="bg-background-dropdown-selected h-px-30 rounded-px-3 text-success-100 text-13 px-px-12" />
        </div>
      </div>
      <Button type="secondary" text="Continue" className="mt-px-50" onClick={handleSubmit} />
    </Card>
  );
}

export default AddWallet;
