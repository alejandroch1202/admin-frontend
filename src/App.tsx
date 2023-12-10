import { useRoutes, BrowserRouter } from 'react-router-dom'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import Cows from './pages/Cows'
import Expenses from './pages/Expenses'
import Navbar from './components/Navbar'

const AppRoutes = () => {
  const routes = useRoutes([
    { path: '/', element: <Home /> },
    { path: '/ganado', element: <Cows /> },
    { path: '/gastos', element: <Expenses /> },
    { path: '/*', element: <NotFound /> }
  ])
  return routes
}

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <AppRoutes />
    </BrowserRouter>
  )
}

export default App
