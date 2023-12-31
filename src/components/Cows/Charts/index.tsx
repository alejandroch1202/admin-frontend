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
    '#ecf0f1',
    '#3182CE',
    '#38A169',
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
  // const [chartData2, setChartData2] = useState(initialChartState)

  useEffect(() => {
    // const labels2 = [...new Set(cows.map((cow) => String(cow.currentWeight)))]
    // setChartData2({
    //   labels: labels2,
    //   datasets: [
    //     {
    //       label: 'Número de animales',
    //       data: labels2.map(
    //         (label) =>
    //           cows.filter((cow) => cow.currentWeight === Number(label)).length
    //       ),
    //       ...chartStyles
    //     }
    //   ]
    // })

    const labels = ['Peso total inicial', 'Peso total actual']
    setChartData({
      labels,
      datasets: [
        {
          label: 'Peso',
          data: [
            cows.reduce((acc, cow) => acc + cow.initialWeight, 0),
            cows.reduce((acc, cow) => acc + cow.currentWeight, 0)
          ],
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
      {/* <BarChart
        text={'Peso actual del ganado'}
        xLabel='Peso en (kg)'
        yLabel='Número de animales'
        chartData={chartData2}
      /> */}
      <BarChart
        text={'Peso de engorde'}
        xLabel=''
        yLabel='Peso total en (kg)'
        chartData={chartData}
      />
    </Flex>
  )
}

export default CowCharts
