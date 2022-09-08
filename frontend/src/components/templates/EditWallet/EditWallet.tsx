import React, { useContext, useEffect, useState } from "react";
import Card from "src/components/organisms/CardPopup/CardPopup";
import DropDownIcon from 'src/assets/images/down-light.png'
import Button from "src/components/molecules/Button/Button";
import { MainContext, MainContextTypes } from "src/context/MainContext";
import { walletAPI } from "src/api/useAPI";
import { WalletDataTypes } from "../AddWallet/AddWallet";
import style from "src/utils/styles";

type EditWalletTypes = {
  onClickHeader: () => void,
  handleSubmit?: () => void
}

function EditWallet({ onClickHeader, handleSubmit }: EditWalletTypes) {
  const [dropDownState, setDropDownState] = useState<boolean>(false);
  const [activeDropDown, setActiveDropDown] = useState<number>(1);
  const [archive, setArcive] = useState<number>(0);
  const {
    toast: notification,
    refresher: [refresher, setRefresher],
    wallet: {
      add: [addWalletModal, setAddWalletModal],
      edit: [editWalletModal, setEditWalletModal],
      id: [walletId]
    }
  } = useContext(MainContext) as MainContextTypes;
  const [walletData, setWalletData] = useState<WalletDataTypes>({
    name: "",
    amount: 0,
    income_every: "15 Days",
  });
  const [errors, setErrors] = useState({
    name: "",
    amount: ""
  });
  const { name: nameError, amount: amountError } = errors;

  const options: string[] = [
    'Day',
    '15 Days',
    '30 Days'
  ];

  useEffect(() => {
    walletAPI.getSpecificWallet(walletId)
      .then(res => {
        const data = res.data;
        setWalletData({
          name: data.name,
          amount: data.amount,
          income_every: data.income_every,
        });
        setArcive(data.is_active);
      })
      .catch(err => {
        console.log(err.response.data);
      })
  }, []);

  const handleChange = (e: any): void => {
    const name = e.target.name;
    const value = e.target.value;

    setWalletData((prev) => ({ ...prev, [name]: value }));
  }

  const onSubmit = (): void => {
    walletAPI.updateSpecificWallet(walletId, walletData)
      .then(res => {
        notification('Wallet Created Successfully!');
        setRefresher(!refresher);
        setAddWalletModal(!addWalletModal);
        setErrors({
          name: "",
          amount: ""
        });
        setRefresher(!refresher);
      })
      .catch(err => {
        setErrors(err.response.data.errors);
      })
  }

  const deleteWallet = (): void => {
    notification('Wallet Deleted Successfully!');
    walletAPI.deleteWallet(walletId)
      .then(res => {
        setEditWalletModal(!editWalletModal);
        setRefresher(!refresher);
      });
  }

  const archiveWallet = (): void => {
    notification('Wallet Archived Successfully!');
    walletAPI.archiveWallet(walletId)
      .then(res => {
        setEditWalletModal(!editWalletModal);
        setRefresher(!refresher);
      });
  }

  const unarchiveWallet = (): void => {
    notification('Wallet Unarchived Successfully!');
    walletAPI.unarchiveWallet(walletId)
      .then(res => {
        setEditWalletModal(!editWalletModal);
        setRefresher(!refresher);
      });
  }

  const moreData = options.map((option, index) => {
    return (
      <div
        key={index}
        className={`selected flex flex-row justify-between items-center gap-6 pl-px-12 pr-px-9 py-px-6 text-15  cursor-pointer ${index + 1 === options.length && 'rounded-b-px-3'} ${activeDropDown === index ? 'bg-background-dropdown-active' : 'bg-background-dropdown-inactive'}`}
        onClick={() => {
          setActiveDropDown(index);
          setDropDownState(!dropDownState);
        }} >
        <span className="text-light-100">{option}</span>
      </div>
    )
  });
  return (
    <Card header={true} headerText="Edit Wallet" onClickHeader={onClickHeader} closeModal={onClickHeader}>
      <div className="flex flex-col gap-2">
        <div className="flex flex-col">
          <label htmlFor="wallet_name" className="text-13 font-medium">Wallet name</label>
          <input name="name" value={walletData.name} onChange={handleChange} type="text" className="bg-background-dropdown-selected h-px-30 rounded-px-3 text-light-100 text-13 px-px-12" />
          <span className={style.inputError}>{nameError}</span>
        </div>
        <div className="flex flex-col">
          <p className="text-13 font-medium">Income every</p>
          <div onClick={() => setDropDownState(!dropDownState)} className={`bg-background-dropdown-selected h-px-30 rounded-t-px-3 ${dropDownState || 'rounded-b-px-3'} text-light-100 text-13 flex flex-row justify-between items-center p-px-12`}>
            <p>{options[activeDropDown]}</p>
            <img src={DropDownIcon} alt="dropdown" className={`h-px-20 ${dropDownState && 'rotate-180'}`} />
          </div>
          {dropDownState && moreData}
        </div>
        <div className="flex flex-col">
          <label htmlFor="amount" className="text-13 font-medium">Amount</label>
          <input name="amount" value={walletData.amount} onChange={handleChange} type="number" className="bg-background-dropdown-selected h-px-30 rounded-px-3 text-success-100 text-13 px-px-12" />
          <span className={style.inputError}>{amountError}</span>
        </div>
      </div>
      <div className="mt-px-40 flex flex-row items-center justify-center gap-2">
        <Button type="error" className="opacity-50 w-full" text="Delete" height="medium" onClick={deleteWallet} />
        <Button type="success" className="opacity-50 w-full" text={archive ? 'Archive' : "Unarchive"} height="medium" onClick={archive ? archiveWallet : unarchiveWallet} />
      </div>
      <Button type="secondary" text="Continue" className="mt-px-15" onClick={onSubmit} />
    </Card>
  );
}

export default EditWallet;
