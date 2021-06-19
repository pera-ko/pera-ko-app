interface WithId {
  id: string
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
  walletId: string;
  amount: number;
  remarks?: string;
  tranDate: string;
}

export type IBudgetData = IBudget & WithId;
export type IGoalData = IGoal & WithId;
export type IWalletData = IWallet & WithId;
export type IBudgetGoalData = IGoalData | IBudgetData;