import React, { useEffect, useState } from "react";
import Button from "src/components/molecules/Button/Button";
import CardContainer from "src/components/organisms/CardContainer/CardContainer";
import Back from 'src/assets/images/back-light.png'
import WalletIcon from 'src/assets/images/wallet.png'
import formatNumber from "src/utils/formatNumber";
import DropDownIcon from 'src/assets/images/down-light.png'
import DropDown from "src/components/molecules/DropDown/DropDown";
import sortOptions from "src/config/optionsDropDownTest.json";
import Footer from "src/components/molecules/Footer/Footer";
import Moment from "react-moment";
import Paginate from "src/components/molecules/Paginate/Paginate";
import BackToTop from "src/components/molecules/BackToTop/BackToTop";
import useScrollOnTop from "src/hooks/useScrollOnTop";
import Cookies from "js-cookie";
import resetOnTop from "src/utils/resetOnTop";
import style from "src/utils/styles";
import { useNavigate } from "react-router-dom";

function History() {
  const navigate = useNavigate();
  const [dropDownState, setDropDownState] = useState<boolean>(false);
  const [activeDropDown, setActiveDropDown] = useState<number>(0);

  const amount = 333;
  const walletState: boolean = parseFloat(amount?.toString().split(",").join("")) < 0;

  const { backToTop } = useScrollOnTop(300);

  useEffect(() => {
    resetOnTop();
  }, [])

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
  ];

  const pageCount = [
    { state: 5 },
    { state: 10 },
    { state: 15 },
    { state: 20 },
    { state: 25 },
    { state: 30 }
  ];

  const transactionType = "income";
  const transactionText = transactionType === 'income' ? 'text-success-100' : transactionType === 'expense' ? 'text-error-100' : 'text-fail-100';
  const transactionSubText = transactionType === 'income' ? 'text-success-60' : transactionType === 'expense' ? 'text-error-60' : 'text-fail-60';

  const headerLeft = (
    <div onClick={() => navigate('/')} className="flex bg-background-dark text-light-100 items-center cursor-pointer">
      <img src={Back} alt="go-back" className="h-px-25" />
    </div>
  );

  const moreData = options?.map((data: any, index: number) => {
    return (
      <div
        key={index}
        className={`hover:bg-background-dropdown-active selected flex flex-row justify-between items-center gap-6 pl-px-12 pr-px-9 py-px-6 text-15 cursor-pointer ${index + 1 === options.length && 'rounded-b-px-3'} ${activeDropDown === index ? 'bg-background-dropdown-active' : 'bg-background-dropdown-inactive'}`}
        onClick={() => console.log('selected')} >
        <div className="flex flex-row gap-3">
          <div className="bg-primary-100 h-px-42 w-px-42 flex justify-center items-center rounded-px-3">
            <img src={WalletIcon} alt="logo" className="h-px-30 opacity-60" />
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-light-100">{data.name}</p>
            <p className={"text-success-100"}>₱ {formatNumber(data.amount)}</p>
          </div>
        </div>
      </div>
    )
  });


  return (
    <div className={`${style.body.default}`} onScroll={() => console.log(window.pageYOffset)}>
      <CardContainer header={true} textCenter="Transaction History" headerLeft={headerLeft} hr={true} className="flex flex-col gap-5" headerClass="bg-background-dark/100 pb-px-6">
        <div className="flex flex-row items-center justify-end mt-px-12">
          <label htmlFor="search" className="text-13 font-medium pr-px-30 ">Search: </label>
          <input name="search" type="text" className="w-full bg-background-dropdown-selected h-px-30 rounded-px-3 text-light-100 text-13 px-px-12" />
        </div>

        <div className="flex flex-col gap-2">
          <h1 className="text-13 font-medium pr-px-30">Account Type</h1>
          <div className="flex flex-row items-center justify-center gap-2">
            <Button type="secondary" className="w-full" text="Wallet" height="medium" onClick={() => console.log('Wallet')} />
            <Button type="secondary" className="opacity-50 w-full" text="Pocket" height="medium" onClick={() => console.log('Pocket')} />
          </div>
        </div>

        <div className="flex flex-col  cursor-pointer">
          <p className="text-13 font-medium mb-px-9">Select Account</p>
          <div onClick={() => setDropDownState(!dropDownState)} className={`bg-background-dropdown-selected rounded-t-px-3 ${dropDownState || 'rounded-b-px-3'} text-light-100 text-13 flex flex-row justify-between items-center p-px-12`}>
            <div className="flex flex-row gap-3">
              <div className="bg-primary-100 h-px-42 w-px-42 flex justify-center items-center rounded-px-3">
                <img src={WalletIcon} alt="logo" className="h-px-30 opacity-60" />
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-light-100">{options[activeDropDown]?.name}</p>
                <p className={"text-success-100"}>₱ {formatNumber(options[activeDropDown]?.balance)}</p>
              </div>
            </div>
            <img src={DropDownIcon} alt="dropdown" className={`h-px-20 ${dropDownState && 'rotate-180'}`} />
          </div>
          {dropDownState && moreData}
        </div>

        <DropDown options={sortOptions.wallet} type="wallet" />
        <DropDown options={pageCount} type="page_count" sortText="Page Count:" />
        <div className="flex flex-col gap-1">
          {[1, 2, 3, 4, 5].map((index) => {
            return (
              <div key={index} className={`cursor-pointer wallet-dd bg-background-dark p-px-12 rounded-t-px-3 rounded-b-px-3`} onClick={() => setDropDownState(!dropDownState)}>
                <div className="flex flex-row justify-between items-center">
                  <div className="flex flex-row gap-3">
                    <div className="bg-secondary-100 h-px-42 w-px-42 flex justify-center items-center rounded-px-3">
                      <img src={WalletIcon} alt="logo" className="h-px-30 opacity-60" />
                    </div>
                    <div>
                      <h1 className="text-15 text-light-100">{'Wallet Name'}</h1>
                      <span className="text-inactive text-12"><Moment format="YYYY/MM/DD - hh:mm A">{'2022-09-12 16:26:59'}</Moment></span>
                    </div>
                  </div>
                  <div className="flex flex-col justify-start items-end">
                    <span className={`text-15 ${transactionText}`}>{'-'} ₱ {formatNumber(amount)}</span>
                    <span className={`text-12 ${transactionSubText}`}>{transactionType === 'income' ? 'Icome' : transactionType === 'expense' ? 'Expense' : 'Update'}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <Paginate data={{
          last_page: 3,
          current_page: 1,
          per_page: 5,
        }} type="setWalletPage" />


      </CardContainer>
      {backToTop && <BackToTop />}
      <Footer />
    </div>
  );
}

export default History;
