interface ICow {
  _id: string
  identifier: string
  currentWeight: number
  purchaseDate: Date
  purchaseWeight: number
  purchasePrice: number
  sellDate: Date
  sellWeight: number
  sellPrice: number
}

interface IExpense {
  _id: string
  name: string
  category: stirng
  cost: number
  quantity: number
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
  size?: string
  xLabel?: string
  yLabel?: string
  chartData: IChartData<T>
}

interface ICreateEntityModal {
  isOpen: boolean
  refresh: boolean
  onClose: () => void
  setRefresh: (refresh: boolean) => void
}

interface IDeleteEntityModal extends ICreateEntityModal {
  entityId: string
}
