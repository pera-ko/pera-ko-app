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