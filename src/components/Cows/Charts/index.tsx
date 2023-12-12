import { useEffect, useState } from 'react'
import { Flex } from '@chakra-ui/react'
import Chart from 'chart.js/auto'
import { CategoryScale } from 'chart.js'
import PieChart from './../../../components/Charts/Pie'
import BarChart from './../../../components/Charts/Bar'

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

const CowCharts = ({ cows }: { cows: ICow[] }) => {
  const [chartData, setChartData] = useState(initialChartState)
  const [chartData2, setChartData2] = useState(initialChartState)

  useEffect(() => {
    const labels = [...new Set(cows.map((cow) => cow.type))]
    setChartData({
      labels,
      datasets: [
        {
          label: 'Tipo de ganado',
          data: labels.map(
            (label) => cows.filter((cow) => cow.type === label).length
          ),
          ...chartStyles
        }
      ]
    })

    const labels2 = [...new Set(cows.map((cow) => String(cow.purchasePrice)))]
    setChartData2({
      labels: labels2,
      datasets: [
        {
          label: 'Precio de compra',
          data: labels2.map(
            (label) =>
              cows.filter((cow) => cow.purchasePrice === Number(label)).length
          ),
          ...chartStyles
        }
      ]
    })
  }, [cows])

  return (
    <Flex
      mt={5}
      align={'center'}
      justify={'center'}
      direction={{ base: 'column', md: 'row' }}
      gap={'10'}
    >
      <PieChart
        text={'Tipo de ganado'}
        chartData={chartData}
      />
      <BarChart
        text={'Precios de compra'}
        chartData={chartData2}
      />
    </Flex>
  )
}

export default CowCharts
