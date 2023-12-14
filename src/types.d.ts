interface ICow {
  _id: string
  identifier: string
  race: stirng
  currentWeight: number
  age: number
  purchaseDate: Date
  purchaseWeight: number
  purchasePrice: number
  sellDate: Date | null
  sellWeight: number | null
  sellPrice: number | null
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
