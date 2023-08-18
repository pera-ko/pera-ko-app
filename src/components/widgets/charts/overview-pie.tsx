import { useParams } from "react-router";
import { Cell, Pie, PieChart } from "recharts"
import { useBudgetStore, useTransactionStore } from "../../../app/store";

const OverviewPie = () => {
  const { year, month } = useParams<{ year: string; month: string }>();
  const budgetList = useBudgetStore((state) => state.budget.list);
  const {
    getTotalOfEachBudget
  } = useTransactionStore()((state) => state);
  const chartData = getTotalOfEachBudget();

  const colors = chartData.map(
    (data) => budgetList.find((b) => b.id === data.name)!.color
  );

  return (
    <PieChart className='inline-block' width={150} height={100}>
      <Pie
        data={chartData}
        cy={85}
        startAngle={180}
        endAngle={0}
        innerRadius={50}
        outerRadius={70}
        fill='#8884d8'
        paddingAngle={5}
        dataKey='value'
      >
        {chartData.map((entry, index) => (
          <Cell
            key={`cell-${index}`}
            fill={colors[index % colors.length]}
            strokeWidth={0.5}
          />
        ))}
      </Pie>
    </PieChart>
  )
}

export default OverviewPie