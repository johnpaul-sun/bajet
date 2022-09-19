export type AddRecordType = {
  closeModal: () => void;
}

export type OptionsType = {
  text: string;
  image: string;
  color: string;
  option: string;
}[]

export type OptionType = {
  text: string;
  image: string;
  color: string;
  option: string;
};

export type WalletInputDataType = {
  income_amount: string;
  wallet_id: number;
}

export type PocketInputDataType = {
  unpaid_amount: string;
  pocket_id: number;
}

export type WalletTransferDataType = {
  from: number;
  to: number;
  transfer_amount: number | undefined;
}