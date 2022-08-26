import React, { useState } from "react";
import Wallet from 'src/assets/images/wallet.png'
import DropDownIcon from 'src/assets/images/down-light.png'
import Button from "src/components/molecules/Button/Button";
import formatNumber from "src/utils/formatNumber";

type WalletDropDownTypes = {
  walletData: {
    accountType: string,
    type: string,
    netWorth: string,
    date: Date | string | number,
    walletName: string,
    walletDetails: string
  },
  onClickHistory?: () => void,
  onClickEdit?: () => void
}

function WalletDropDown({ walletData, onClickHistory = () => { }, onClickEdit = () => { } }: WalletDropDownTypes) {
  const { type, netWorth, date, walletName, walletDetails } = walletData;
  const [dropDownState, setDropDownState] = useState<boolean>(false);

  const walletState = parseFloat(netWorth.split(",").join("")) < 0;
  const transactionType = type === 'income';

  const moreData = (
    <div className="bg-background-lightDark px-px-15 py-px-21 rounded-b-px-3">
      <span className="text-light-100 text-15 grid text-center mb-px-18">Latest Transaction</span>
      <div className="flex flex-row justify-between items-star">
        <div className="flex flex-col gap-1">
          <h1 className="text-light-100 text-15">{walletName}</h1>
          <span className="text-light-60 text-12 overflow-hidden truncate w-40">{walletDetails}</span>
          <span className="text-inactive text-12">6 minutes ago</span>
        </div>
        <div className="flex flex-col justify-start items-end">
          <span className={`text-15 ${transactionType ? 'text-success-100' : 'text-error-100'}`}>{transactionType || '-'} ₱ {formatNumber(netWorth)}</span>
          <span className={`text-12 ${transactionType ? 'text-success-60' : 'text-error-60'}`}>{!transactionType ? 'Expense' : 'Icome'}</span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 mt-px-30">
        <Button text="History" type="primaryInvert" height="medium" onClick={onClickHistory} />
        <Button text="Edit" type="primary" height="medium" onClick={onClickEdit} />
      </div>
    </div>
  )

  return (
    <>
      <div className={`wallet-dd bg-background-dark mt-px-3 p-px-12 rounded-t-px-3 ${dropDownState || 'rounded-b-px-3'}`} onClick={() => setDropDownState(!dropDownState)}>
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-row gap-3">
            <div className="bg-primary-100 h-px-42 w-px-42 flex justify-center items-center rounded-px-3">
              <img src={Wallet} alt="logo" className="h-px-30 opacity-60" />
            </div>
            <div>
              <h1 className="text-15 text-light-100">{walletName}</h1>
              <span className={`text-15 ${walletState ? 'text-error-100' : 'text-success-100'}`}>{walletState && '- '}₱ {formatNumber(netWorth)}</span>
            </div>
          </div>
          <img src={DropDownIcon} alt="logo" className={`h-px-20 ${dropDownState && 'rotate-180'}`} />
        </div>
      </div>
      {dropDownState && moreData}
    </>
  );
}

export default WalletDropDown;
