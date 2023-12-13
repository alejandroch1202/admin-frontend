import { useEffect, useState } from 'react'
import { Flex } from '@chakra-ui/react'
import Chart from 'chart.js/auto'
import { CategoryScale } from 'chart.js'
import PieChart from './../../../components/Charts/Pie'

Chart.register(CategoryScale)

const initialChartState = {
  labels: [''],
  datasets: [{}]
}

const chartStyles = {
  backgroundColor: ['#38A169', '#ecf0f1', '#3182CE', '#f3ba2f', '#C53030'],
  borderColor: '#A0AEC0',
  borderRadius: 2,
  borderWidth: 1
}

const ExpensesCharts = ({ expenses }: { expenses: IExpense[] }) => {
  const [chartData, setChartData] = useState(initialChartState)

  useEffect(() => {
    const labels = [...new Set(expenses.map((expense) => expense.category))]
    setChartData({
      labels,
      datasets: [
        {
          label: 'Tipo de ganado',
          data: labels.map(
            (label) =>
              expenses.filter((expense) => expense.category === label).length
          ),
          ...chartStyles
        }
      ]
    })
  }, [expenses])

  return (
    <Flex
      mt={5}
      align={'center'}
      justify={'center'}
      direction={{ base: 'column', md: 'row' }}
      gap={'10'}
    >
      <PieChart
        text={'Gastos por categoría'}
        chartData={chartData}
      />
    </Flex>
  )
}

export default ExpensesCharts
