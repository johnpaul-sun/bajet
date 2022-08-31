import React, { useState } from "react";
import Card from "src/components/organisms/CardPopup/CardPopup";
import DropDownIcon from 'src/assets/images/down-light.png'
import WalletIcon from 'src/assets/images/wallet.png'
import Button from "../Button/Button";
import formatNumber from 'src/utils/formatNumber';

type UnpaidBalanceTypes = {
  onClickHeader: () => void,
  handleSubmit: () => void
}

function UnpaidBalance({ onClickHeader, handleSubmit }: UnpaidBalanceTypes) {
  const [dropDownState, setDropDownState] = useState<boolean>(false);
  const [activeDropDown, setActiveDropDown] = useState<number>(1);

  const options = [
    {
      image: WalletIcon,
      name: 'Work',
      balance: 1500000
    },
    {
      image: WalletIcon,
      name: 'Work2',
      balance: 1500000
    },
    {
      image: WalletIcon,
      name: 'Work3',
      balance: 1500000
    }
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
        <div className="flex flex-row gap-3">
          <div className="bg-primary-100 h-px-42 w-px-42 flex justify-center items-center rounded-px-3">
            <img src={WalletIcon} alt="logo" className="h-px-30 opacity-60" />
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-light-100">{option.name}</p>
            <p className="text-success-100">₱ {formatNumber(option.balance)}</p>
          </div>
        </div>
      </div>
    )
  });
  return (
    <Card header={true} headerText="Add wallet" onClickHeader={onClickHeader}>
      <div className="flex flex-col gap-2">
        <div>
          <p className="text-13 font-medium">Outstanding balance</p>
          <p className="text-error-100 text-18 font-medium">₱ 500,000.00</p>
        </div>
        <div className="flex flex-col mt-px-15">
          <p className="text-13 font-medium">Pay from</p>
          <div onClick={() => setDropDownState(!dropDownState)} className={`bg-background-dropdown-selected rounded-t-px-3 ${dropDownState || 'rounded-b-px-3'} text-light-100 text-13 flex flex-row justify-between items-center p-px-12`}>
            <div className="flex flex-row gap-3">
              <div className="bg-primary-100 h-px-42 w-px-42 flex justify-center items-center rounded-px-3">
                <img src={WalletIcon} alt="logo" className="h-px-30 opacity-60" />
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-light-100">{options[activeDropDown].name}</p>
                <p className="text-success-100">₱ {formatNumber(options[activeDropDown].balance)}</p>
              </div>
            </div>
            <img src={DropDownIcon} alt="dropdown" className={`h-px-20 ${dropDownState && 'rotate-180'}`} />
          </div>
          {dropDownState && moreData}
        </div>
      </div>
      <Button type="secondary" text="Pay now" className="mt-px-50" onClick={handleSubmit} />
    </Card>
  );
}

export default UnpaidBalance;
