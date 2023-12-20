import { useEffect, useState } from 'react'
import { Flex } from '@chakra-ui/react'
import Chart from 'chart.js/auto'
import { CategoryScale } from 'chart.js'
import BarChart from './../../../components/Charts/Bar'

Chart.register(CategoryScale)

const initialChartState = {
  labels: [''],
  datasets: [{}]
}

const chartStyles = {
  backgroundColor: [
    '#38A169',
    '#ecf0f1',
    '#3182CE',
    '#f3ba2f',
    '#C53030',
    '#8B6050',
    '#36E0BE'
  ],
  borderColor: '#A0AEC0',
  borderRadius: 2,
  borderWidth: 1
}

const CowCharts = ({ cows }: { cows: ICow[] }) => {
  const [chartData, setChartData] = useState(initialChartState)
  const [chartData2, setChartData2] = useState(initialChartState)

  useEffect(() => {
    const labels = [...new Set(cows.map((cow) => String(cow.purchasePrice)))]
    setChartData({
      labels,
      datasets: [
        {
          label: 'Precios de compra en dólares',
          data: labels.map(
            (label) =>
              cows.filter((cow) => String(cow.purchasePrice) === label).length
          ),
          ...chartStyles
        }
      ]
    })

    const labels2 = [...new Set(cows.map((cow) => String(cow.currentWeight)))]
    setChartData2({
      labels: labels2,
      datasets: [
        {
          label: 'Peso actual del ganado',
          data: labels2.map(
            (label) =>
              cows.filter((cow) => cow.currentWeight === Number(label)).length
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
      <BarChart
        text={'Precios de compra en dólares'}
        chartData={chartData}
      />
      <BarChart
        text={'Peso actual del ganado'}
        chartData={chartData2}
      />
    </Flex>
  )
}

export default CowCharts
