import React, { useState } from "react";
import Wallet from 'src/assets/images/wallet.png'
import Calendar from 'src/assets/images/calendar-light.png'
import DropDownIcon from 'src/assets/images/down-light.png'
import Button from "src/components/molecules/Button/Button";
import style from "src/utils/styles";
import formatNumber from "src/utils/formatNumber";

type PocketDropDownTypes = {
  pocketData: {
    type: string,
    netWorth: string,
    date: Date,
    schedule: Date,
    pocketName: string,
    pocketDetails: string,
    unpaidBalance: number,
  },
  onClickHistory?: () => void,
  onClickEdit?: () => void,
  onClickPay?: () => void
}

function PocketDropDown({
  pocketData,
  onClickHistory = () => { },
  onClickEdit = () => { },
  onClickPay = () => { }
}: PocketDropDownTypes) {
  const { netWorth, pocketName, unpaidBalance } = pocketData;
  const [dropDownState, setDropDownState] = useState<boolean>(false);

  const walletState = parseFloat(netWorth.split(",").join("")) < 0;

  const moreData = (
    <div className="bg-background-lightDark px-px-15 py-px-21 rounded-b-px-3">
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-1">
          <h1 className="text-light-100 text-12">Schedule</h1>
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-row gap-3">
              <img src={Calendar} alt="calendar" className="w-px-18" />
              <span className="text-light-100 text-12">* Every 13th of the month</span>
            </div>
            <span className="text-inactive text-12">* 9 days ago</span>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <h1 className="text-light-100 text-12">Unpaid balance</h1>
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-row gap-3">
              <span className={`text-error-100 text-12 ${unpaidBalance <= 0 && 'opacity-50 text-success-100'}`}>* ₱ {formatNumber(unpaidBalance)}</span>
            </div>
            <Button
              text="Pay"
              height="medium"
              className={`w-20 h-px-25 ${unpaidBalance <= 0 && 'cursor-not-allowed opacity-50'} `}
              onClick={() => {
                if (unpaidBalance > 0) {
                  return onClickPay();
                } return
              }} />
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <h1 className="text-light-100 text-12">Latest transaction</h1>
          <div className="flex flex-row justify-between items-end">
            <div className="flex flex-row gap-3">
              <div>
                <div className="p-px-2 bg-primary-100 rounded-px-3">
                  <img src={Wallet} alt="wallet" className="w-px-15" />
                </div>
              </div>
              <div className="flex flex-col items-start justify-center">
                <h1 className="text-light-100 text-14">* Wallet Name</h1>
                <span className="text-inactive text-10">Sceluded transactions.</span>
              </div>
            </div>
            <div className="flex flex-col justify-end items-end">
              <h1 className="text-success-100 text-13">* ₱ {netWorth}</h1>
              <span className="text-inactive text-10">* August 10, 2022</span>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 mt-px-30">
        <Button
          text="History"
          type="primaryInvert"
          height="medium"
          onClick={onClickHistory} />
        <Button
          text="Edit"
          type="primary"
          height="medium"
          onClick={onClickEdit} />
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
              <h1 className="text-15 text-light-100">{pocketName}</h1>
              <span className={`text-15 ${walletState ? 'text-error-100' : 'text-success-100'}`}>{walletState && '- '}₱ {netWorth}</span>
            </div>
          </div>
          <img src={DropDownIcon} alt="logo" className={`h-px-20 ${dropDownState && 'rotate-180'}`} />
        </div>
      </div>
      {dropDownState && moreData}
    </>
  );
}

export default PocketDropDown;
