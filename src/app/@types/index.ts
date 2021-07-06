interface WithId {
  id: string
}

interface IDeletable {
  isDeleted?: boolean
  deleteDate?: string
}

export interface IBudget {
  type: "budget";
  budgetName: string;
  amount: number;
  icon: string;
  color: string;
}

export interface IGoal {
  type: "goal";
  budgetName: string;
  amount: number;
  icon: string;
  color: string;
  startDate: string;
  endDate?: string | undefined;
  installmentType: "monthly" | "semi-monthly"
}

export interface IWallet {
  walletName: string
}

export interface IIncome {
  type: undefined | 'transfer'
  walletId: string;
  amount: number;
  remarks?: string;
  tranDate: string;
}

export type IBudgetData = IBudget & WithId;
export type IGoalData = IGoal & WithId;
export type IWalletData = IWallet & WithId & IDeletable;
export type IBudgetGoalData = IGoalData | IBudgetData;