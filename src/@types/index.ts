export interface IBudget {
  type: "budget";
  budgetName: string;
  amount: number;
  icon: string;
}

export interface IGoal {
  type: "goal";
  budgetName: string;
  amount: number;
  icon: string;
  startDate: string;
  endDate?: string | undefined;
  installmentType: "monthly" | "semi-monthly"
}