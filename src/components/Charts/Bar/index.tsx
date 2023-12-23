import { Bar } from 'react-chartjs-2'

const BarChart = ({ text, size, xLabel, yLabel, chartData }: IChart) => {
  return (
    <div>
      <Bar
        height={size ?? '300px'}
        width={size ?? '400px'}
        data={chartData}
        options={{
          responsive: true,
          scales: {
            y: {
              title: {
                display: true,
                text: yLabel,
                font: {
                  size: 15
                }
              }
            },
            x: {
              ticks: {
                font: {
                  size: 15
                }
              },
              title: {
                display: true,
                text: xLabel,
                font: {
                  size: 15
                }
              }
            }
          },
          plugins: {
            title: {
              display: true,
              text,
              font: {
                size: 16
              }
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
