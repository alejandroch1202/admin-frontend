import { Pie } from 'react-chartjs-2'

const PieChart = ({ text, chartData }: IChart) => {
  return (
    <div>
      <Pie
        height={'250px'}
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
