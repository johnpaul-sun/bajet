import React, { Fragment, useContext, useState } from "react";
import Button from "src/components/molecules/Button/Button";
import Card from "src/components/organisms/CardContainer/CardContainer";
import CardPopup from "src/components/organisms/CardModal/CardModal";
import WalletIcon from 'src/assets/images/wallet.png'
import AddWallet from 'src/assets/images/add-wallet.png'
import WalletTransfer from 'src/assets/images/transfer.png'
import WalletIncome from 'src/assets/images/income.png'
import PocketIcon from 'src/assets/images/pocket.png'
import style from "src/utils/styles";
import { MainContext, MainContextTypes } from "src/context/MainContext";

type AddRecordTypes = {
  closeModal: () => void,
}

function AddRecord({ closeModal }: AddRecordTypes) {
  const [keyComponent, setKeyComponent] = useState<string>('option');
  const {
    wallet: { add: [addWalletModal, setAddWalletModal] },
    addRecord: [, setAddRecordModal]
  } = useContext(MainContext) as MainContextTypes;


  const displayComponent = (key: string) => {
    switch (key) {
      case 'option': {
        const walletSelected = (): void => {
          setKeyComponent('wallet');

        }
        const pocketSelected = (): void => {
          setKeyComponent('pocket');
        }

        return (
          <div className="flex flex-row gap-9 justify-evenly items-center">
            <div onClick={walletSelected} className="flex flex-col justify-center items-center gap-1 cursor-pointer">
              <Card isDark={true} className="flex flex-col justify-center items-center gap-3 ease-in-out duration-300 hover:bg-slate-600">
                <div className="bg-primary-100 p-px-15 rounded-px-12 mt-px-6">
                  <img src={WalletIcon} alt="wallet" className="h-9 w-9" />
                </div>
              </Card>
              <h1 className="text-18 font-semibold">Wallet</h1>
            </div>
            <div onClick={pocketSelected} className="flex flex-col justify-center items-center gap-1 cursor-pointer">
              <Card isDark={true} className="flex flex-col justify-center items-center gap-3 ease-in-out duration-300 hover:bg-slate-600">
                <div className="bg-secondary-100 p-px-15 rounded-px-12 mt-px-6">
                  <img src={PocketIcon} alt="wallet" className="h-9 w-9" />
                </div>
              </Card>
              <h1 className="text-18 font-semibold">Pocket</h1>
            </div>
          </div>
        )
      }
      case 'wallet': {
        type OptionTypes = { text: string, image: any, color: string, option: string };

        const options = [
          {
            text: 'Create new wallet account',
            image: AddWallet,
            color: 'bg-primary-100',
            option: "create"
          },
          {
            text: 'Add income in wallet',
            image: WalletIncome,
            color: 'bg-primary-100',
            option: "add"
          },
          {
            text: 'Transfer wallet balance',
            image: WalletTransfer,
            color: 'bg-primary-100',
            option: "transfer"
          },
        ];

        const selectedOption = (option: string): void => {
          switch (option) {
            case 'create': {
              setAddRecordModal(false);
              setAddWalletModal(!addWalletModal);
              break;
            }
            case 'add': {

              break;
            }
            case 'transfer': {

              break;
            }
            default:
              break;
          }
        }

        return (
          options.map((data: OptionTypes, index: number) => {
            const lastData = index + 1 === options.length;
            return (
              <Fragment key={index}>
                <div onClick={() => selectedOption(data.option)} className={`${lastData && "mb-px-60"} bg-background-dark mt-px-9 p-px-12 rounded-px-3 cursor-pointer hover:bg-background-dropdown-active duration-300 ease-in-out`}>
                  <div className="flex flex-row gap-3 justify-between items-between">
                    <div className={`${data.color} mr-px-9 h-px-42 w-px-60 px-px-6  box-content flex justify-center items-center rounded-px-3`}>
                      <img src={data.image} alt="logo" className="h-px-30 w-px-30 opacity-100" />
                    </div>
                    <div className="flex flex-col gap-1 items-center justify-center w-full">
                      <h1 className="text-15 text-light-100">{data.text}</h1>
                    </div>
                    <div className="h-px-42 w-px-60"></div>
                  </div>
                </div>
                {lastData && <Button text={"Go Back"} onClick={() => setKeyComponent('option')} type="secondary" className="hover:opacity-75 duration-300 ease-in-out"></Button>}
              </Fragment>
            )
          })
        )
      }
      default: {
        return <h1 className="text-error-100 text-center mb-px-15">No Available Data</h1>
      }
    }
  }

  return (
    <CardPopup header={true} headerText="Add Record" onClickHeader={closeModal} closeModal={closeModal} >
      {displayComponent(keyComponent)}
    </CardPopup>
  );
}

export default AddRecord;
