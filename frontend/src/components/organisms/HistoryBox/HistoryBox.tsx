import React from "react";
import Wallet from 'src/assets/images/wallet.png'
import Pocket from 'src/assets/images/pocket.png'
import formatNumber from "src/utils/formatNumber";

type HistoryBoxTypes = {
  historyData: {
    accountType: string,
    type: string,
    netWorth: string,
    date: Date | string | number,
    schedule?: Date | string | number,
    name: string,
    details: string,
    unpaidBalance?: number,
  }
}

function HistoryBox({ historyData }: HistoryBoxTypes) {
  const { netWorth, accountType, name, type, details } = historyData;

  const handleClick = (): void => {
    console.log('x')
  }
  return (
    <div className="wallet-dd bg-background-dark mt-px-3 p-px-12 rounded-t-px-3 cursor-pointer" onClick={handleClick}>
      <div className="flex flex-row justify-between items-start w-fill">
        <div className="flex flex-row gap-3">
          <div className="bg-primary-100 h-px-42 w-px-42 flex justify-center items-center rounded-px-3">
            <img src={accountType === 'wallet' ? Wallet : Pocket} alt="logo" className="h-px-30 opacity-60" />
          </div>
          <div className="flex flex-col gap-1">
            <h1 className="text-15 text-light-100">{name}</h1>
            <p className="text-light-60 text-12 overflow-hidden truncate w-36">{details}</p>
            <span className="text-inactive text-12">6 minutes ago</span>
          </div>
        </div>
        <div className="flex flex-col justify-start items-end">
          <span className={`text-15 ${type === 'income' ? 'text-success-100' : 'text-error-100'}`}>{type === 'expense' && '- '}₱ {formatNumber(netWorth)}</span>
          <span className={`text-12 ${type === 'income' ? 'text-success-60' : 'text-error-60'}`}>{type === 'income' ? 'Income' : 'Expense'}</span>
        </div>
      </div>
    </div>
  );
}

export default HistoryBox;