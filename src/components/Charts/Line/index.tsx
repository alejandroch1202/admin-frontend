import { Line } from 'react-chartjs-2'

const LineChart = ({ text, chartData }: IChart) => {
  return (
    <div>
      <Line
        data={chartData}
        options={{
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

export default LineChart
