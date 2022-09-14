import React, { useState, createContext, ReactElement, useEffect } from "react";
import { PocketDataTypes, WalletDataTypes } from "src/pages/private/user/Dashboard/Dashboard";
import { toast, ToastContainer } from 'react-toastify';
import { historyAPI, pocketAPI, userAPI, walletAPI } from "src/api/useAPI";

export type MainContextTypes = {
  toast: (value: string) => void,
  refresher: [boolean, (value: boolean) => void],
  user: {
    api: {
      getNetWorth: () => void
    },
    data: [any, (value: any) => void],
    income: [number, (value: number) => void],
    expense: [number, (value: number) => void],
    netWorth: [number, (value: number) => void],
  },
  wallet: {
    api: {
      getWallet: () => void,
    },
    page: [number, (value: number) => void],
    data: [any, (value: WalletDataTypes) => void],
    add: [boolean, (value: boolean) => void],
    edit: [boolean, (value: boolean) => void],
    id: [number, (value: number) => void],
    sort: [any, (value: any) => void]
  },
  pocket: {
    api: {
      getPocket: () => void,
    },
    page: [number, (value: number) => void],
    data: [any, (value: PocketDataTypes) => void],
    add: [boolean, (value: boolean) => void],
    edit: [boolean, (value: boolean) => void],
    id: [number, (value: number) => void],
    sort: [any, (value: any) => void]
  },
  history: {
    api: {
      getHistory: (value: string) => void,
      getAllActiveAccounts: (value: string) => void,
    },
    data: [any, (value: any) => void],
    logs: [any, (value: any) => void],
    pageCount: [number, (value: number) => void]
  }
}

export const MainContext = createContext<MainContextTypes | null>(null);

export const ContextProvider = ({ children }: { children: ReactElement }) => {
  // Wallet States
  const [editWalletModal, setEditWalletModal] = useState<boolean>(false);
  const [addWalletModal, setAddWalletModal] = useState<boolean>(false);
  const [walletPage, setWalletPage] = useState<number>(1);
  const [walletData, setWalletData] = useState<any>([]);
  const [walletId, setWalletId] = useState<number>(0);
  const [sortByWallet, setSortByWallet] = useState<any>({
    sort_by: "asc",
    sort_type: "created_at",
    archive: 1
  });

  // Pocket States
  const [editPocketModal, setEditPocketModal] = useState<boolean>(false);
  const [addPocketModal, setAddPocketModal] = useState<boolean>(false);
  const [pocketPage, setPocketPage] = useState<number>(1);
  const [pocketData, setPocketData] = useState<any>([]);
  const [pocketId, setPocketId] = useState<number>(0);
  const [sortByPocket, setSortByPocket] = useState<any>({
    sort_by: "asc",
    sort_type: "schedule_date",
    archive: 1
  });

  // History States
  const [historyData, setHistoryData] = useState<any>([]);
  const [historyLogs, setHistoryLogs] = useState<any>([]);
  const [sortByPageCount, setSortByPageCount] = useState<number>(0);

  // User States 
  const [income, setIncome] = useState<number>(0);
  const [expense, setExpense] = useState<number>(0);
  const [netWorth, setNetWorth] = useState<number>(0);
  const [userData, setUserData] = useState<any>([]);


  // Other States
  const [refresher, setRefresher] = useState<boolean>(false);

  // Method List
  const notification = (message: string) => {
    toast.success(message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }

  const getNetWorth = (): void => {
    userAPI.netWorth()
      .then(res => {
        const income = res.data.income;
        const expense = res.data.expense;

        setIncome(income);
        setExpense(expense);
        setNetWorth(income - expense);
      })
  }

  const getWallet = (): void => {
    walletAPI.getAllWallet(walletPage, sortByWallet)
      .then(res => {
        setWalletData(res.data);
      })
      .catch(err => {
        console.log(err.response.data);
      });
  }

  const getAllActiveAccounts = (account: string): void => {
    switch (account) {
      case 'wallet': {
        walletAPI.getAllActiveWallet()
          .then(res => {
            setHistoryLogs(res.data);
          })
          .catch(err => {
            console.log(err.response.data);
          });
        break;
      }
      case 'pocket': {
        pocketAPI.getAllActivePocket()
          .then(res => {
            setHistoryLogs(res.data);
          })
          .catch(err => {
            console.log(err.response.data);
          });
        break;
      }
      default:
        break;
    }
  }

  const getPocket = (): void => {
    pocketAPI.getAllPocket(pocketPage, sortByPocket)
      .then(res => {
        setPocketData(res.data);
      })
      .catch(err => {
        console.log(err.response.data);
      });
  }

  const getHistory = (type: string): void => {
    switch (type) {
      case 'all': {
        historyAPI.getAllHistory()
          .then(res => {
            setHistoryData(res.data)
          })
          .catch(err => {
            console.log(err.response.data);
          });
        break;
      }
      case 'wallet': {
        historyAPI.getAllWalletHistory()
          .then(res => {
            setHistoryData(res.data)
          })
          .catch(err => {
            console.log(err.response.data);
          });
        break;
      }
      case 'pocket': {
        historyAPI.getAllPocketHistory()
          .then(res => {
            setHistoryData(res.data)
          })
          .catch(err => {
            console.log(err.response.data);
          });
        break;
      }
      default:
        break;
    }
  }

  return (
    <MainContext.Provider value={{
      toast: notification,
      refresher: [refresher, setRefresher],
      user: {
        api: {
          getNetWorth
        },
        data: [userData, setUserData],
        income: [income, setIncome],
        expense: [expense, setExpense],
        netWorth: [netWorth, setNetWorth],
      },
      wallet: {
        api: {
          getWallet,
        },
        page: [walletPage, setWalletPage],
        data: [walletData, setWalletData],
        add: [addWalletModal, setAddWalletModal],
        edit: [editWalletModal, setEditWalletModal],
        id: [walletId, setWalletId],
        sort: [sortByWallet, setSortByWallet]
      },
      pocket: {
        api: {
          getPocket,
        },
        page: [pocketPage, setPocketPage],
        add: [addPocketModal, setAddPocketModal],
        data: [pocketData, setPocketData],
        edit: [editPocketModal, setEditPocketModal],
        id: [pocketId, setPocketId],
        sort: [sortByPocket, setSortByPocket]
      },
      history: {
        api: {
          getHistory,
          getAllActiveAccounts,
        },
        data: [historyData, setHistoryData],
        logs: [historyLogs, setHistoryLogs],
        pageCount: [sortByPageCount, setSortByPageCount]
      }
    }}>
      {children}
      <ToastContainer toastStyle={{ backgroundColor: "#40444B", color: "#E0E7F0" }} />
    </MainContext.Provider>
  );
};
