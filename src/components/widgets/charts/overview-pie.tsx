import { Cell, Pie, PieChart } from "recharts"
import { useBudgetStore, useTransactionStore } from "../../../app/store";
import WidgetPanel from "../../widget-panel";

const OverviewPie = () => {
  const budgetList = useBudgetStore((state) => state.budget.list);
  const {
    getTotalOfEachBudget
  } = useTransactionStore()((state) => state);
  const chartData = getTotalOfEachBudget();

  const colors = chartData.map(
    (data) => budgetList.find((b) => b.id === data.name)!.color
  );

  return (
    <WidgetPanel title="Overview">
      <div className="flex justify-center my-5">
        <PieChart className='inline-block' width={300} height={200}>
          <Pie
            data={chartData}
            cy={85}
            innerRadius={50}
            outerRadius={70}
            fill='#8884d8'
            paddingAngle={5}
            dataKey='value'
            label={(e) => {
              return budgetList.find(b => b.id === e.name)?.icon
            }}
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
      </div>
    </WidgetPanel>
  )
}

export default OverviewPie