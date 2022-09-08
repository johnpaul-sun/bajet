import React, { useState, createContext, ReactElement } from "react";
import { WalletDataTypes } from "src/pages/private/user/Dashboard/Dashboard";
import { toast, ToastContainer } from 'react-toastify';
import { walletAPI } from "src/api/useAPI";

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
    add: [boolean, (value: boolean) => void],
    edit: [boolean, (value: boolean) => void]
  }
}

export const MainContext = createContext<any>(null);

export const ContextProvider = ({ children }: { children: ReactElement }) => {
  const [refresher, setRefresher] = useState<boolean>(false);

  const [addPocketModal, setAddPocketModal] = useState<boolean>(false);
  const [editPocketModal, setEditPocketModal] = useState<boolean>(false);

  const [addWalletModal, setAddWalletModal] = useState<boolean>(false);
  const [editWalletModal, setEditWalletModal] = useState<boolean>(false);

  const [walletId, setWalletId] = useState<number>(0);

  const [walletPage, setWalletPage] = useState<number>(1);
  const [walletData, setWalletData] = useState<any>([]);

  const [sortBy, setSortBy] = useState<any>({
    sort_by: "asc",
    sort_type: "created_at",
    archive: 1
  });

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
    walletAPI.getAllWallet(walletPage, sortBy)
      .then(res => {
        setWalletData(res.data);
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
        sort: [sortBy, setSortBy]
      },
      pocket: {
        add: [addPocketModal, setAddPocketModal],
        edit: [editPocketModal, setEditPocketModal]
      }
    }}>
      {children}
      <ToastContainer />
    </MainContext.Provider>
  );
};
