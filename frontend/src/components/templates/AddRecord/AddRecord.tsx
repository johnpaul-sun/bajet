import React, { Fragment, useContext, useState } from "react";
import Button from "src/components/molecules/Button/Button";
import Card from "src/components/organisms/CardContainer/CardContainer";
import CardPopup from "src/components/organisms/CardModal/CardModal";
import WalletIcon from 'src/assets/images/wallet.png'
import AddWallet from 'src/assets/images/add-wallet.png'
import WalletTransfer from 'src/assets/images/transfer.png'
import WalletIncome from 'src/assets/images/income.png'
import PocketIcon from 'src/assets/images/pocket.png'
import UnpaidAmount from 'src/assets/images/unpaid-amount.png'
import AddPocket from 'src/assets/images/add-pocket.png'
import { MainContext, MainContextType } from "src/context/MainContext";
import OptionCard from "src/components/organisms/OptionCard/OptionCard";
import style from "src/utils/styles";

type AddRecordType = {
  closeModal: () => void,
}

type OptionsType = {
  text: string,
  image: string,
  color: string,
  option: string
}[]

type OptionType = {
  text: string,
  image: string,
  color: string,
  option: string
};

function AddRecord({ closeModal }: AddRecordType) {
  const [keyComponent, setKeyComponent] = useState<string>('option');
  const {
    addRecord: [, setAddRecordModal],
    wallet: { add: [addWalletModal, setAddWalletModal] },
    pocket: { add: [addPocketModal, setAddPocketModal] }
  } = useContext(MainContext) as MainContextType;

  const displayComponent = (key: string) => {
    switch (key) {
      case 'option': {
        return (
          <div className="flex flex-row gap-6 justify-evenly items-center">
            <div onClick={() => setKeyComponent('wallet')} className="flex flex-col justify-center items-center gap-1 cursor-pointer">
              <Card isDark={true} className="flex flex-col justify-center items-center gap-3 ease-in-out duration-300 hover:bg-slate-600">
                <div className="bg-primary-100 p-px-15 rounded-px-12 mt-px-6">
                  <img src={WalletIcon} alt="wallet" className="h-9 w-9" />
                </div>
              </Card>
              <h1 className="text-18 font-semibold">Wallet</h1>
            </div>
            <div onClick={() => setKeyComponent('pocket')} className="flex flex-col justify-center items-center gap-1 cursor-pointer">
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

      // Wallet cases
      case 'wallet': {
        const options: OptionsType = [
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
              setKeyComponent('add_income');
              break;
            }
            case 'transfer': {
              setKeyComponent('transfer_balance');
              break;
            }
            default:
              break;
          }
        };

        return (
          options.map((data: OptionType, index: number) => {
            const lastData = index + 1 === options.length;
            return (
              <Fragment key={index}>
                <OptionCard selectedOption={selectedOption} data={data} isLastData={lastData} />
                {lastData && <Button text={"Go Back"} onClick={() => setKeyComponent('option')} type="secondary" className="hover:opacity-75 duration-300 ease-in-out" />}
              </Fragment>
            )
          })
        );
      }
      case 'add_income': {

        return (
          <Button text={"Go Back"} onClick={() => setKeyComponent('wallet')} type="secondary" className="hover:opacity-75 duration-300 ease-in-out" />
        );
      }
      case 'transfer_balance': {

        return (
          <Button text={"Go Back"} onClick={() => setKeyComponent('wallet')} type="secondary" className="hover:opacity-75 duration-300 ease-in-out" />
        );
      }

      // Pocket cases
      case 'pocket': {
        const options: OptionsType = [
          {
            text: 'Create new pocket account',
            image: AddPocket,
            color: 'bg-secondary-100',
            option: "create"
          },
          {
            text: 'Add unpaid balance',
            image: UnpaidAmount,
            color: 'bg-secondary-100',
            option: "add"
          },
        ];

        const selectedOption = (option: string): void => {
          switch (option) {
            case 'create': {
              setAddRecordModal(false);
              setAddPocketModal(!addPocketModal);
              break;
            }
            case 'add': {
              setKeyComponent('add_unpaid_balance');
              break;
            }
            default:
              break;
          }
        };

        return (
          options.map((data: OptionType, index: number) => {
            const lastData = index + 1 === options.length;
            return (
              <Fragment key={index}>
                <OptionCard selectedOption={selectedOption} data={data} isLastData={lastData} />
                {lastData && <Button text={"Go Back"} onClick={() => setKeyComponent('option')} type="secondary" className="hover:opacity-75 duration-300 ease-in-out" />}
              </Fragment>
            )
          })
        );
      }
      case 'add_unpaid_balance': {

        return (
          <Button text={"Go Back"} onClick={() => setKeyComponent('pocket')} type="secondary" className="hover:opacity-75 duration-300 ease-in-out" />
        );
      }

      default: {
        return <h1 className="text-error-100 text-center mb-px-15">No Available Data</h1>;
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
