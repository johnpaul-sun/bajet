import React, { useState, createContext, ReactElement } from "react";
import { WalletDataTypes } from "src/pages/private/user/Dashboard/Dashboard";
import { toast, ToastContainer } from 'react-toastify';
import { pocketAPI, walletAPI } from "src/api/useAPI";

export type MainContextTypes = {
  toast: (value: string) => void,
  refresher: [boolean, (value: boolean) => void],
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
    data: [any, (value: WalletDataTypes) => void],
    add: [boolean, (value: boolean) => void],
    edit: [boolean, (value: boolean) => void],
    id: [number, (value: number) => void],
    sort: [any, (value: any) => void]
  }
}

export const MainContext = createContext<any>(null);

export const ContextProvider = ({ children }: { children: ReactElement }) => {
  // Wallet States
  const [editWalletModal, setEditWalletModal] = useState<boolean>(false);
  const [addWalletModal, setAddWalletModal] = useState<boolean>(false);
  const [walletPage, setWalletPage] = useState<number>(1);
  const [walletData, setWalletData] = useState<any>([]);
  const [walletId, setWalletId] = useState<number>(0);

  // Pocket States
  const [editPocketModal, setEditPocketModal] = useState<boolean>(false);
  const [addPocketModal, setAddPocketModal] = useState<boolean>(false);
  const [pocketPage, setPocketPage] = useState<number>(1);
  const [pocketData, setPocketData] = useState<any>([]);
  const [pocketId, setPocketId] = useState<number>(0);

  // Other States
  const [refresher, setRefresher] = useState<boolean>(false);
  const [sortByWallet, setSortByWallet] = useState<any>({
    sort_by: "asc",
    sort_type: "created_at",
    archive: 1
  });
  const [sortByPocket, setSortByPocket] = useState<any>({
    sort_by: "asc",
    sort_type: "created_at",
    archive: 1
  });

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

  const getWallet = (): void => {
    walletAPI.getAllWallet(walletPage, sortByWallet)
      .then(res => {
        setWalletData(res.data);
      })
      .catch(err => {
        console.log(err.response.data);
      });
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

  return (
    <MainContext.Provider value={{
      toast: notification,
      refresher: [refresher, setRefresher],
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
      }
    }}>
      {children}
      <ToastContainer />
    </MainContext.Provider>
  );
};
