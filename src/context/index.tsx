import { createContext, useEffect, useState } from 'react'
import axiosConfig from '../config/axios'

interface IAppContext {
  cows: ICow[]
  setCows: React.Dispatch<React.SetStateAction<ICow[]>>
  expenses: IExpense[]
  setExpenses: React.Dispatch<React.SetStateAction<IExpense[]>>
}

const initialState = {
  cows: [],
  setCows: () => {},
  expenses: [],
  setExpenses: () => {}
}

const AppContext = createContext<IAppContext>(initialState)

const AppProvider = ({ children }: { children: JSX.Element }) => {
  const [cows, setCows] = useState<ICow[]>([])
  const [expenses, setExpenses] = useState<IExpense[]>([])

  const getCows = async () => {
    const cows = await axiosConfig.get('/cows')
    setCows(cows.data.data)
  }

  const getExpenses = async () => {
    const expenses = await axiosConfig.get('/expenses')
    setExpenses(expenses.data.data)
  }

  useEffect(() => {
    try {
      getCows()
      getExpenses()
    } catch (error) {
      console.log(error)
    }
  }, [])

  const globalState = {
    cows,
    setCows,
    expenses,
    setExpenses
  }

  return (
    <AppContext.Provider value={globalState}>{children}</AppContext.Provider>
  )
}

export { AppProvider, AppContext }
