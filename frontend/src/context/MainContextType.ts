import { PocketDataType } from "src/components/templates/AddPocket/AddPocket"
import { WalletDataType } from "src/components/templates/AddWallet/AddWallet"

export type MainContextType = {
  api: {
    getActiveAccount: (value: string) => void
  },
  activeAccount: [any],
  toast: (value: string) => void,
  refresher: [boolean, (value: boolean) => void],
  addRecord: [boolean, (value: boolean) => void],
  dropDownData: [any, (value: any) => void],
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
    data: [any, (value: WalletDataType) => void],
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
    data: [any, (value: PocketDataType) => void],
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