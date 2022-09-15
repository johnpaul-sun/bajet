/* eslint-disable react-hooks/rules-of-hooks */
import React, { ReactElement, useContext, useEffect } from "react";
import CardContainer from "src/components/organisms/CardContainer/CardContainer";
import style from "src/utils/styles";
import Logo from 'src/assets/images/logo.png'
import Add from 'src/assets/images/add.png'
import Settings from 'src/assets/images/settings.png'
import getDate from 'src/utils/getDate';
import formatNumber from "src/utils/formatNumber";
import DropDown from "src/components/molecules/DropDown/DropDown";
import WalletDropDown from "src/components/templates/WalletDropDown/WalletDropDown";
import PocketDropDown from "src/components/templates/PocketDropDown/PocketDropDown";
import options from "src/config/optionsDropDownTest.json";
import HistoryBox from "src/components/templates/HistoryBox/HistoryBox";
import Footer from "src/components/molecules/Footer/Footer";
import { Link } from "react-router-dom";
import BackToTop from "src/components/molecules/BackToTop/BackToTop";
import resetOnTop from "src/utils/resetOnTop";
import useScrollOnTop from "src/hooks/useScrollOnTop";
import Paginate from "src/components/molecules/Paginate/Paginate";
import AddPocket from "src/components/templates/AddPocket/AddPocket";
import AddWallet from "src/components/templates/AddWallet/AddWallet";
import { pocketAPI, userAPI, walletAPI } from "src/api/useAPI";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUser } from "src/redux/Slices/TokenSlice/TokenSlice";
import { MainContext, MainContextType } from "src/context/MainContext";
import 'react-toastify/dist/ReactToastify.css';
import Moment from "react-moment";
import AddRecord from "src/components/templates/AddRecord/AddRecord";

export type WalletDataType = {
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

export type PocketDataType = {
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
  const { backToTop } = useScrollOnTop(300);
  const { avatar, created_at, first_name, last_name } = useSelector((state: any) => state.user.user);
  const {
    refresher: [refresher],
    addRecord: [addRecordModal, setAddRecordModal],
    user: {
      api: {
        getNetWorth
      },
      income: [income],
      expense: [expense],
      netWorth: [netWorth],
    },
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
      sort: [sortByPocket]
    },
    history: {
      api: {
        getHistory,
      },
      data: [historyData]
    }
  } = useContext(MainContext) as MainContextType;

  const elementStore = (key: string) => {
    switch (key) {
      case 'addWallet': {
        return <img src={Add} alt="logo" className="h-px-20 w-px-20 hover:rotate-90 hover:h-px-24 hover:w-px-24 ease-in-out duration-300" onClick={() => setAddWalletModal(!addWalletModal)} />;
      }
      case 'addPocket': {
        return <img src={Add} alt="logo" className="h-px-20 w-px-20 hover:rotate-90 hover:h-px-24 hover:w-px-24 ease-in-out duration-300" onClick={() => setAddPocketModal(!addPocketModal)} />;
      }
      case 'headerDate': {
        return <span className="text-12 opacity-100">{getDate('today')}</span>;
      }
      case 'headerSettings': {
        const logout = (): void => {
          Cookies.remove('user_token');
          Cookies.remove('user');
          navigate('/');
          window.location.reload();
        }

        return (
          <img src={Settings} alt="settings" className="cursor-pointer h-px-30 hover:h-9 hover:rotate-45 ease-in-out duration-300" onClick={() => {
            userAPI.logout().then(res => { logout(); }).catch(err => { logout(); });
          }} />
        );
      }
      case 'headerMenu': {
        return (
          <div className="flex w-fill gap-3 justify-center items-center">
            <img src={Logo} alt="logo" className="h-px-50" />
            <span className="text-12 px-px-3 pb-px-2 border-b border-primary-100 cursor-pointer">Dashboard</span>
          </div>
        );
      }
      default:
        break;
    }
  };

  const functionStore = {
    pocketHistory() {
      console.log('pocket history');
    },
    walletHistory() {
      console.log('wallet history');
    },
    addRecord() {
      setAddRecordModal(!addRecordModal);
    }
  };
  const { pocketHistory, walletHistory, addRecord } = functionStore;

  useEffect(() => {
    console.clear();
    resetOnTop();

    dispatch(setUser(JSON.parse(Cookies.get('user') || "")));
  }, [])

  useEffect(() => {
    getWallet();
  }, [walletAPI, walletPage, refresher, sortByWallet])

  useEffect(() => {
    getPocket();
  }, [pocketAPI, pocketPage, refresher, sortByPocket])

  useEffect(() => {
    getHistory('all');
    getNetWorth();
  }, [refresher])

  return (
    <>
      {addWalletModal && <AddWallet onClickHeader={() => setAddWalletModal(!addWalletModal)} />}
      {addPocketModal && <AddPocket onClickHeader={() => setAddPocketModal(!addPocketModal)} />}
      {addRecordModal && <AddRecord closeModal={() => setAddRecordModal(!addRecordModal)} />}

      <div className={`${style.body.default} flex flex-col gap-6`}>
        <CardContainer header={true} headerLeft={elementStore('headerMenu')} headerRight={elementStore('headerSettings')} headerClass="pt-0" className="mb-px-12">
          <div className="flex flex-row gap-5">
            <img src={avatar} alt="profile" className="w-px-110 h-px-110 mr-px-30" />
            <div className="flex flex-col justify-between">
              <div>
                <h1 className={style.font.dark18}>{`${first_name} ${last_name}`}</h1>
                <span className={`${style.font.dark12} text-inactive`}>Joined <Moment fromNow>{created_at}</Moment></span>
              </div>
              <div className="flex relative">
                <button onClick={addRecord} className={`${style.button.primary} h-px-30 text-12 hover:bg-secondary-60 ease-in-out duration-300`}>Add record</button>
              </div>
            </div>
          </div>
        </CardContainer>

        <CardContainer header={true} headerLeft='Cash Flow' headerRight={elementStore('headerDate')} isDark={true} hr={true}>
          <div className="flex flex-row justify-between items-start mb-px-30">
            <div>
              <h3 className="text-12 opacity-75 mb-px-9">Net Worth</h3>
              <h1 className={`text-18 ${netWorth < 0 && "text-error-100"}`}>₱ {formatNumber(netWorth)}</h1>
            </div>
            <div className="flex flex-col justify-center items-end">
              <h3 className="text-12 opacity-75 mb-px-9">Account Status</h3>
              <h1 className={`text-15 ${netWorth < 0 ? "text-error-100" : netWorth < income / 2 ? "text-secondary-100" : "text-success-100"}`}>{netWorth < 0 ? "Broke" : netWorth < (income / 2) ? "Need Attention" : "Healthy"}</h1>
            </div>
          </div>
          <div>
            <div className="text-12 flex flex-row justify-between text-success-100">
              <span>Total Wallet Balance</span>
              <span>₱ {formatNumber(income)}</span>
            </div>
            <div className="income h-px-27 bg-success-100 my-px-9 flex justify-end items-end">
              <div className="expense h-px-27 bg-error-100" style={{ width: `${netWorth < 0 ? "100" : (expense / income) * 100}%` }}></div>
            </div>
            <div className="text-12 flex flex-row-reverse justify-between text-error-100">
              <span>Total Expenses</span>
              <span>- ₱ {formatNumber(expense)}</span>
            </div>
          </div>
        </CardContainer>

        <CardContainer header={true} headerLeft='Wallet accounts' headerRight={elementStore('addWallet')} hr={true}>
          <DropDown options={options.wallet} type="wallet" />
          <div className="dropDown flex flex-col mt-px-30">
            {
              walletData.data?.length > 0
                ? walletData.data?.map((data: WalletDataType, index: number) => {
                  return <WalletDropDown walletData={data} onClickHistory={walletHistory} key={index} />
                })
                : <h1 className="text-error-100 text-center mb-px-15">No Available Data</h1>
            }
          </div>
          <Paginate data={walletData} type="wallet" />
        </CardContainer>

        <CardContainer header={true} headerLeft='Pockets' headerRight={elementStore('addPocket')} hr={true}>
          <DropDown options={options.pocket} type="pocket" />
          <div className="dropDown flex flex-col mt-px-30">
            {
              pocketData.data?.length > 0
                ? pocketData.data?.map((data: PocketDataType, index: number) => {
                  return <PocketDropDown pocketData={data} onClickHistory={pocketHistory} key={index} />
                })
                : <h1 className="text-error-100 text-center mb-px-15">No Available Data</h1>
            }
          </div>
          <Paginate data={pocketData} type="pocket" />
        </CardContainer >

        <CardContainer header={true} headerLeft='Transaction History' hr={true} headerClass="mb-px-15">
          {historyData?.length === 0
            ? <span className="text-error-100 opacity-80 text-18 grid text-center mt-px-12">No transactions</span>
            : historyData?.slice(0).reverse().map((data: any, index: number) => {
              return index < 5 && <HistoryBox historyData={data} key={index} />;
            })}
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

