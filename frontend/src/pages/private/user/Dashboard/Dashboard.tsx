/* eslint-disable react-hooks/rules-of-hooks */
import React, { ReactElement, useContext, useEffect, useLayoutEffect, useState } from "react";
import CardContainer from "src/components/organisms/CardContainer/CardContainer";
import style from "src/utils/styles";
import Logo from 'src/assets/images/logo.png'
import Add from 'src/assets/images/add.png'
import Profile from 'src/assets/images/profile.png'
import Settings from 'src/assets/images/settings.png'
import getDate from 'src/utils/getDate';
import formatNumber from "src/utils/formatNumber";
import DropDown from "src/components/molecules/DropDown/DropDown";
import WalletDropDown from "src/components/templates/WalletDropDown/WalletDropDown";
import PocketDropDown from "src/components/templates/PocketDropDown/PocketDropDown";
import options from "src/config/optionsDropDownTest.json";
import pocketData from "src/config/pocketDataTest.json";
import paginateDataTest from "src/config/paginateDataTest.json";
import HistoryBox from "src/components/templates/HistoryBox/HistoryBox";
import Footer from "src/components/molecules/Footer/Footer";
import { Link } from "react-router-dom";
import BackToTop from "src/components/molecules/BackToTop/BackToTop";
import resetOnTop from "src/utils/resetOnTop";
import useScrollOnTop from "src/hooks/useScrollOnTop";
import Paginate from "src/components/molecules/Paginate/Paginate";
import AddPocket from "src/components/templates/AddPocket/AddPocket";
import AddWallet from "src/components/templates/AddWallet/AddWallet";
import EditPocket from "src/components/templates/EditPocket/EditPocket";
import EditWallet from "src/components/templates/EditWallet/EditWallet";
import { pocketAPI, userAPI, walletAPI } from "src/api/useAPI";
import Cookies from "js-cookie";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUser } from "src/redux/Slices/TokenSlice/TokenSlice";
import { MainContext, MainContextTypes } from "src/context/MainContext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";

export type WalletDataTypes = {
  amount: number,
  income_every: string,
  name: string,
  created_at?: string,
  udpated_at?: string,
  user_id?: number,
  id?: number,
  is_active?: number,
  wallet_transaction: {
    amount: number,
    name: string,
    transaction_type: string,
    id?: number,
    wallet_id?: number
    created_at?: string,
    udpated_at?: string,
  }[]
}

export type PocketDataTypes = {
  amount: number,
  amount_to_pay: number,
  schedule: string,
  schedule_date: string,
  name: string,
  created_at?: string,
  udpated_at?: string,
  user_id?: number,
  id: number,
  is_active?: number,
  pocket_transaction: {
    amount: number,
    transaction_type: string,
    id?: number,
    pocket_id?: number
    created_at?: string,
    udpated_at?: string,
    wallet: {
      id: number,
      user_id: number,
      name: string,
      income_every: string,
      amount: number,
      is_active: number,
      created_at: string,
      updated_at: string
    }
  }[]
}

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    toast: notification,
    refresher: [refresher],
    wallet: {
      api: {
        getWallet,
      },
      page: [walletPage],
      data: [walletData],
      add: [addWalletModal, setAddWalletModal],
      sort: [sortByWallet]
    },
    pocket: {
      api: {
        getPocket,
      },
      add: [addPocketModal, setAddPocketModal],
      page: [pocketPage],
      data: [pocketData],
      edit: [editPocketModal, setEditPocketModal],
      sort: [sortByPocket]
    }
  } = useContext(MainContext) as MainContextTypes;

  const income: number = 1_500_000;
  const expense: number = 500_000;
  const netWorth: string = formatNumber(income - expense);

  const logout = (): void => {
    Cookies.remove('user_token');
    Cookies.remove('user');
    navigate('/');
    window.location.reload();
  }

  const addWallet: ReactElement<HTMLSpanElement> = <img src={Add} alt="logo" className="h-px-20" onClick={() => setAddWalletModal(!addWalletModal)} />;
  const addPocket: ReactElement<HTMLSpanElement> = <img src={Add} alt="logo" className="h-px-20" onClick={() => setAddPocketModal(!addPocketModal)} />;
  const headerDate: ReactElement<HTMLSpanElement> = <span className="text-12 opacity-90">{getDate('today')}</span>;
  const headerSettings: ReactElement<HTMLImageElement> = <img src={Settings} alt="settings" className="cursor-pointer h-px-30" onClick={() => {
    userAPI.logout().then(res => { logout(); }).catch(err => { logout(); });
  }} />;
  const headerMenu: ReactElement<HTMLDivElement> = (
    <div className="flex w-fill gap-3 justify-center items-center">
      <img src={Logo} alt="logo" className="h-px-50" />
      <span className="text-12 px-px-3 pb-px-2 border-b border-primary-100 cursor-pointer">Dashboard</span>
    </div>
  );

  const pocketHistory = (): void => {
    console.log('pocket history');
  }
  const editPocket = (): void => {
    setEditPocketModal(!editPocketModal);
  }
  const onClickPay = (): void => {
    console.log('Pay');
  }

  const walletHistory = (): void => {
    console.log('wallet history');
  }

  const { backToTop } = useScrollOnTop(300);

  useEffect(() => {
    console.clear();
    resetOnTop();

    dispatch(setUser(Cookies.get('user')));
  }, [])

  useEffect(() => {
    getWallet();
  }, [walletAPI, walletPage, refresher, sortByWallet])

  useEffect(() => {
    getPocket();
  }, [pocketAPI, pocketPage, refresher, sortByPocket])

  return (
    <>
      {addWalletModal && <AddWallet onClickHeader={() => setAddWalletModal(!addWalletModal)} />}
      {addPocketModal && <AddPocket onClickHeader={() => setAddPocketModal(!addPocketModal)} />}

      <div className={`${style.body.default} flex flex-col gap-6`}>
        <CardContainer header={true} headerLeft={headerMenu} headerRight={headerSettings} headerClass="pt-0" className="mb-px-12">
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

        <CardContainer header={true} headerLeft='Wallet accounts' headerRight={addWallet} hr={true}>
          <DropDown options={options.wallet} type="wallet" />
          <div className="dropDown flex flex-col mt-px-30">
            {
              walletData.data?.length > 0
                ? walletData.data?.map((data: WalletDataTypes, index: number) => {
                  return <WalletDropDown walletData={data} onClickHistory={walletHistory} key={index} />
                })
                : <h1 className="text-error-100 text-center mb-px-15">No Archive Wallet</h1>
            }
          </div>
          <Paginate data={walletData} type="setWalletPage" />
        </CardContainer>

        <CardContainer header={true} headerLeft='Pockets' headerRight={addPocket} hr={true}>
          <DropDown options={options.pocket} type="pocket" />
          <div className="dropDown flex flex-col mt-px-30">
            {
              pocketData.data?.length > 0
                ? pocketData.data?.map((data: PocketDataTypes, index: number) => {
                  return <PocketDropDown pocketData={data} onClickHistory={pocketHistory} key={index} />
                })
                : <h1 className="text-error-100 text-center mb-px-15">No Archive Pocket</h1>
            }
          </div>
          <Paginate data={pocketData} type="setPocketPage" />
        </CardContainer >

        <CardContainer header={true} headerLeft='Transaction History' hr={true} headerClass="mb-px-15">
          <HistoryBox historyData={pocketData} />
          <HistoryBox historyData={walletData} />
          <HistoryBox historyData={pocketData} />
          <div className="flex flex-col justify-center items-center">
            <div className="border-b mt-px-18 border-inactive w-px-72 ">
              <div className="border-b mb-px-3 border-inactive ">
                <Link to={'/history'} ><p className="text-inactive text-center">view all</p></Link>
              </div>
            </div>
          </div>
        </CardContainer>

        {backToTop && <BackToTop />}
        <Footer />
      </div >
    </>
  );
}

export default Dashboard;
