import React, { ReactElement, useState } from "react";
import CardContainer from "src/components/molecules/CardContainer";
import style from "src/utils/styles";
import Logo from 'src/assets/images/logo.png'
import Add from 'src/assets/images/add.png'
import Profile from 'src/assets/images/profile.png'
import Settings from 'src/assets/images/settings.png'
import getDate from 'src/utils/getDate';
import formatNumber from "src/utils/formatNumber";
import DropDown from "src/components/molecules/DropDown/DropDown";
import WalletDropDown from "src/components/organisms/WalletDropDown/WalletDropDown";
import PocketDropDown from "src/components/organisms/PocketDropDown/PocketDropDown";
import options from "src/context/optionsDropDownTest.json";
import walletData from "src/context/walletDataTest.json";
import pocketData from "src/context/pocketDataTest.json";

function Dashboard() {
  const income: number = 1_500_000;
  const expense: number = 500_000;
  const netWorth: string = formatNumber(income - expense);

  const headerMenu: ReactElement<HTMLDivElement> = <div className="flex w-fill gap-3 justify-center items-center"> <img src={Logo} alt="logo" className="h-px-50" /> <span className="text-12 px-px-3 pb-px-2 border-b border-primary-100 cursor-pointer">Dashboard</span> </div>;
  const headerSettings: ReactElement<HTMLImageElement> = <img src={Settings} alt="settings" className="cursor-pointer h-px-30" onClick={() => console.log('x')} />;
  const headerDate: ReactElement<HTMLSpanElement> = <span className="text-12 opacity-90">{getDate('today')}</span>;
  const headerAdd: ReactElement<HTMLSpanElement> = <img src={Add} alt="logo" className="h-px-20" />;

  const onClickHistory = (): void => {
    console.log('History');
  }
  const onClickEdit = (): void => {
    console.log('Edit');
  }
  const onClickPay = (): void => {
    console.log('Pay');
  }

  return (
    <div className={`${style.body.default} flex flex-col gap-6 `}>
      <CardContainer header={true} headerLeft={headerMenu} headerRight={headerSettings} className="mb-px-12">
        <div className="flex flex-row gap-5">
          <img src={Profile} alt="profile" className="w-px-112 h-px-112" />
          <div className="flex flex-col justify-between">
            <div>
              <h1 className={style.font.dark18}>Cooper Dorwart</h1>
              <span className={`${style.font.dark12} text-inactive`}>Joined 6 months ago</span>
            </div>
            <div className="flex relative">
              <button className={`${style.button.primary} h-px-24 text-12`}>Add record</button>
            </div>
          </div>
        </div>
      </CardContainer>

      <CardContainer header={true} headerLeft='Cash Flow' headerRight={headerDate} isDark={true} hr={true}>
        <h3 className="text-12 opacity-75 mb-px-9">Net Worth</h3>
        <h1 className="text-18 mb-px-18">₱ {netWorth}</h1>
        <div>
          <div className="text-12 flex flex-row justify-between text-success-100">
            <span>Income</span>
            <span>₱ {formatNumber(income)}</span>
          </div>
          <div className="income h-px-27 bg-success-100 my-px-9 flex justify-end items-end">
            <div className="expense h-px-27 bg-error-100" style={{ width: `${(expense / income) * 100}%` }}></div>
          </div>
          <div className="text-12 flex flex-row-reverse justify-between text-error-100">
            <span>Expense</span>
            <span>- ₱ {formatNumber(expense)}</span>
          </div>
        </div>
      </CardContainer>

      <CardContainer header={true} headerLeft='Wallet account' headerRight={headerAdd} hr={true}>
        <DropDown options={options} />
        <div className="dropDown flex flex-col mt-px-30">
          <WalletDropDown walletData={walletData} onClickEdit={onClickEdit} onClickHistory={onClickHistory} />
          <WalletDropDown walletData={walletData} onClickEdit={onClickEdit} onClickHistory={onClickHistory} />
          <WalletDropDown walletData={walletData} onClickEdit={onClickEdit} onClickHistory={onClickHistory} />
        </div>
      </CardContainer>

      <CardContainer header={true} headerLeft='Pockets' headerRight={headerAdd} hr={true}>
        <DropDown options={options} />
        <div className="dropDown flex flex-col mt-px-30">
          <PocketDropDown pocketData={pocketData} onClickEdit={onClickEdit} onClickHistory={onClickHistory} onClickPay={onClickPay} />
          <PocketDropDown pocketData={pocketData} onClickEdit={onClickEdit} onClickHistory={onClickHistory} onClickPay={onClickPay} />
          <PocketDropDown pocketData={pocketData} onClickEdit={onClickEdit} onClickHistory={onClickHistory} onClickPay={onClickPay} />
        </div>
      </CardContainer>

      <CardContainer header={true} headerLeft='Transaction History' hr={true}>

      </CardContainer>
    </div>
  );
}

export default Dashboard;
