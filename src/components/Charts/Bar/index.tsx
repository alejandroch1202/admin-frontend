import { Bar } from 'react-chartjs-2'

const BarChart = ({ text, chartData }: IChart) => {
  return (
    <div>
      <Bar
        height={'250px'}
        data={chartData}
        options={{
          responsive: true,
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
