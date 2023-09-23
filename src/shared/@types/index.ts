interface WithId {
  id: string
}

interface IDeletable {
  isDeleted?: boolean
  deleteDate?: string
}

export type IBudget = {
  type: "budget";
  budgetName: string;
  amount: number;
  icon: string;
  color: string;
  isHidden?: boolean;
}

export type IGoal = {
  type: "goal";
  budgetName: string;
  amount: number;
  icon: string;
  color: string;
  startDate: string;
  endDate?: string | undefined;
  installmentType: "monthly" | "semi-monthly";
  isHidden?: boolean;
}

export type IWallet = {
  walletName: string
  type: "credit-card" | "e-wallet" | "cash"
}

export type IIncome = {
  type: undefined | 'transfer'
  walletId: string;
  amount: number;
  remarks?: string;
  tranDate: string;
}

export type ITransaction = {
  type: undefined;
  budgetId: string;
  walletId: string;
  amount: number;
  tranDate: string;
  labels?: string[];
  remarks?: string;
}
export type ITransferTransaction = {
  type: 'transfer';
  walletFromId: string;
  walletToId: string;
  amount: number;
  tranDate: string;
  remarks?: string
}

export type IBudgetData = IBudget & WithId;
export type IGoalData = IGoal & WithId;
export type IWalletData = IWallet & WithId & IDeletable;
export type IBudgetGoalData = IGoalData | IBudgetData;
export type ITransactionData = ITransaction & WithId