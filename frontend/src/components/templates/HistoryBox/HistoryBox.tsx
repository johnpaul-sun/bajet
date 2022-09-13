import React from "react";
import Wallet from 'src/assets/images/wallet.png'
import Pocket from 'src/assets/images/pocket.png'
import formatNumber from "src/utils/formatNumber";
import getTransactionTypeStyle from "src/utils/getTransactionTypeStyle";
import Moment from "react-moment";

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

function HistoryBox({ historyData }: any) {
  const { amount, transaction_type, created_at } = historyData.data;
  const accountType = historyData.account_type;
  const walletName = accountType === "wallet" && historyData.data.wallet.name;
  const pocketName = accountType === "pocket" && historyData.data.pocket.name;

  return (
    <div className="wallet-dd bg-background-dark mt-px-3 p-px-12 rounded-px-3" >
      <div className="flex flex-row justify-between items-start w-fill">
        <div className="flex flex-row gap-3">
          <div className={`${accountType === 'wallet' ? 'bg-primary-100' : 'bg-secondary-100'}  h-px-42 w-px-42 flex justify-center items-center rounded-px-3`}>
            <img src={accountType === 'wallet' ? Wallet : Pocket} alt="logo" className="h-px-30 opacity-60" />
          </div>
          <div className="flex flex-col gap-1">
            <h1 className="text-15 text-light-100">{walletName || pocketName}</h1>
            {/* <p className="text-light-60 text-12 overflow-hidden truncate w-36">{details}</p> */}
            <span className="text-inactive text-12"><Moment format="YYYY/MM/DD - hh:mm A">{created_at}</Moment></span>
          </div>
        </div>
        <div className="flex flex-col justify-start items-end">
          <span className={`text-15 ${getTransactionTypeStyle(transaction_type)}`}>{transaction_type === 'expense' && '- '}₱ {formatNumber(amount)}</span>
          <span className={`text-12 ${getTransactionTypeStyle(transaction_type, '60')}`}>{transaction_type.replace(/^(.)|\s+(.)/g, (c: string) => c.toUpperCase())}</span>
        </div>
      </div>
    </div>
  );
}

export default HistoryBox;
