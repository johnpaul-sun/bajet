import React, { Fragment, useContext, useEffect, useState } from "react";
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
import AccountDropDown from "src/components/organisms/AccountDropDown/AccountDropDown";
import { AddRecordType, WalletInputDataType, PocketInputDataType, WalletTransferDataType, OptionsType, OptionType } from "./AddRecordType";
import { pocketAPI, walletAPI } from "src/api/useAPI";

function AddRecord({ closeModal }: AddRecordType) {
  const [keyComponent, setKeyComponent] = useState<string>('option');
  const [walletInputData, setWalletInputData] = useState<WalletInputDataType>({ income_amount: "", wallet_id: 0 });
  const [pocketInputData, setPocketInputData] = useState<PocketInputDataType>({ unpaid_amount: "", pocket_id: 0 });
  const [walletTransferData, setWalletTransferData] = useState<WalletTransferDataType>({ from_wallet: 0, to_wallet: 1, amount: undefined });
  const {
    toast: notification,
    refresher: [refresher, setRefresher],
    activeAccount: [activeAccount],
    dropDownData: [selectedAccountData],
    addRecord: [, setAddRecordModal],
    wallet: { add: [addWalletModal, setAddWalletModal], id: [walletId] },
    pocket: { add: [addPocketModal, setAddPocketModal], id: [pocketId] }
  } = useContext(MainContext) as MainContextType;
  const [recordError, setRecordError] = useState<string>("");

  useEffect(() => {
    walletInputData.wallet_id = walletId;
    pocketInputData.pocket_id = pocketId;
  }, [walletId, pocketId]);

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
        const goBack = (): void => {
          setRefresher(!refresher);
          setKeyComponent('wallet');
        }

        const handleChange = (e: any): void => {
          const value = e.target.value;
          setWalletInputData({ income_amount: value, wallet_id: walletId });
        };

        const handleSubmit = (): void => {
          walletAPI.generateIncome(walletInputData)
            .then(res => {
              notification(res.data.message);
              setRefresher(!refresher);
              setRecordError("");
              closeModal();
            })
            .catch(err => {
              setRecordError(err.response.data.message);
            })
        };

        return (
          <>
            <div className="flex flex-col gap-6 ">
              <h1 className="text-left text-18">Generate wallet income</h1>
              <AccountDropDown accountData={activeAccount} accountType="wallet" />
              <div className="flex flex-col">
                <label htmlFor="wallet_name" className="text-13 font-medium">Income Amount</label>
                <input value={walletInputData.income_amount || ""} placeholder="0.00" onChange={handleChange} name="income_amount" type="number" className="bg-background-dropdown-selected h-px-30 rounded-px-3 text-success-100 text-13 px-px-12" />
                <span className={style.inputError}>{recordError}</span>
              </div>
            </div>
            <div className="flex flex-row gap-3 mt-px-60">
              <Button text={"Go Back"} onClick={goBack} type="secondaryInvert" fontType="dark" className="w-full hover:opacity-75 duration-300 ease-in-out" />
              <Button text={"Submit"} onClick={handleSubmit} type="secondary" className="w-full hover:opacity-75 duration-300 ease-in-out" />
            </div>
          </>
        );
      }
      case 'transfer_balance': {
        const isSameDestination = walletTransferData.from_wallet === walletTransferData.to_wallet;

        const handleChange = (e: { target: { value: any } }): void => {
          const value = e.target.value;
          setWalletTransferData((prev: WalletTransferDataType) => ({ ...prev, amount: Number(value) }));
        };

        const onSelect = (data: { id: number }, type: string): void => {
          setWalletTransferData((prev: WalletTransferDataType) => ({ ...prev, [`${type}_wallet`]: data?.id }));
        }

        const onSubmit = (): void => {
          walletAPI.transferFunds(walletTransferData)
            .then(res => {
              notification(res.data.message);
              setRefresher(!refresher);
              setRecordError("");
              closeModal();
            })
            .catch(err => {
              setRecordError(err.response.data.message);
            })
        }

        return (
          <>
            <div className="flex flex-col gap-5 ">
              <h1 className="text-left text-18">Transfer wallet funds</h1>
              {isSameDestination && <span className={`${style.inputError} text-center`}> From, and To, wallets cannot be the same.</span>}
              <AccountDropDown accountData={activeAccount} accountType="wallet" text="From" selected={onSelect} />
              <div className="flex flex-col">
                <label htmlFor="wallet_name" className="text-13 font-medium">Transfer Amount</label>
                <input value={walletTransferData.amount || ""} placeholder="0.00" onChange={handleChange} name="amount" type="number" className="bg-background-dropdown-selected h-px-30 rounded-px-3 text-success-100 text-13 px-px-12" />
                <span className={style.inputError}>{recordError}</span>
              </div>
              <AccountDropDown accountData={activeAccount} accountType="wallet" text="To" selected={onSelect} setActive={1} />
            </div>
            <div className="flex flex-row gap-3 mt-px-60">
              <Button text={"Go Back"} onClick={() => { setKeyComponent('wallet') }} type="secondaryInvert" fontType="dark" className="w-full hover:opacity-75 duration-300 ease-in-out" />
              <Button text={"Submit"} disabled={isSameDestination} onClick={onSubmit} type="secondary" className="w-full hover:opacity-75 duration-300 ease-in-out" />
            </div>
          </>
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
        const goBack = (): void => {
          setRefresher(!refresher);
          setKeyComponent('pocket');
        }

        const handleChange = (e: any): void => {
          const value = e.target.value;
          setPocketInputData({ unpaid_amount: value, pocket_id: selectedAccountData.id });
        };

        const handleSubmit = (): void => {
          pocketAPI.generateUnpaid(pocketInputData)
            .then(res => {
              notification(res.data.message);
              setRefresher(!refresher);
              setRecordError("");
              closeModal();
            })
            .catch(err => {
              setRecordError(err.response.data.message);
            })
        };

        return (
          <><div className="flex flex-col gap-6 ">
            <h1 className="text-left text-18">Add unpaid balance</h1>
            <AccountDropDown accountData={activeAccount} accountType="pocket" />
            <div className="flex flex-col">
              <label htmlFor="wallet_name" className="text-13 font-medium">Unpaid balance amount</label>
              <input value={pocketInputData.unpaid_amount || ""} placeholder="0.00" onChange={handleChange} name="unpaid_amount" type="number" className="bg-background-dropdown-selected h-px-30 rounded-px-3 text-success-100 text-13 px-px-12" />
              <span className={style.inputError}>{recordError}</span>
            </div>
          </div>
            <div className="flex flex-row gap-3 mt-px-60">
              <Button text={"Go Back"} onClick={goBack} type="secondaryInvert" fontType="dark" className="w-full hover:opacity-75 duration-300 ease-in-out" />
              <Button text={"Submit"} onClick={handleSubmit} type="secondary" className="w-full hover:opacity-75 duration-300 ease-in-out" />
            </div>
          </>
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
