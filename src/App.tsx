import { useRoutes, BrowserRouter } from 'react-router-dom'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import Cattle from './pages/Cattle'
import Expenses from './pages/Expenses'
import Navbar from './components/Navbar'

const AppRoutes = () => {
  const routes = useRoutes([
    { path: '/', element: <Home /> },
    { path: '/ganado', element: <Cattle /> },
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
