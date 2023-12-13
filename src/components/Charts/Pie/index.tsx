import { Pie } from 'react-chartjs-2'

const PieChart = ({ text, size, chartData }: IChart) => {
  return (
    <div>
      <Pie
        height={size ?? '250px'}
        data={chartData}
        options={{
          maintainAspectRatio: false,
          responsive: true,
          plugins: {
            title: {
              display: true,
              text
            }
          }
        }}
      />
    </div>
  )
}

export default PieChart
