interface ICow {
  _id: string
  identifier: string
  type: stirng
  purchaseWeight: number
  purchasePrice: number
}

interface IExpense {
  _id: string
}

interface IUser {
  _id: string
}

interface IChartData {
  labels: string[]
  datasets: {
    label: string
    data: number[]
  }
}

// Components
interface IChart {
  text: string
  chartData: IChartData<T>
}
