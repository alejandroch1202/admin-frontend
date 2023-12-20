import { Bar } from 'react-chartjs-2'

const BarChart = ({ text, size, xLabel, yLabel, chartData }: IChart) => {
  return (
    <div>
      <Bar
        height={size ?? '250px'}
        data={chartData}
        options={{
          responsive: true,
          scales: {
            y: {
              title: {
                display: true,
                text: yLabel
              }
            },
            x: {
              title: {
                display: true,
                text: xLabel
              }
            }
          },
          plugins: {
            title: {
              display: true,
              text
            },
            legend: {
              display: false
            }
          }
        }}
      />
    </div>
  )
}

export default BarChart
