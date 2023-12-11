import { useRoutes, BrowserRouter } from 'react-router-dom'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import Cows from './pages/Cows'
import Expenses from './pages/Expenses'
import Navbar from './components/Navbar'

const AppRoutes = () => {
  const routes = useRoutes([
    { path: '/', element: <Home /> },
    { path: '/cows', element: <Cows /> },
    { path: '/cows/edit/:id', element: <Cows /> },
    { path: '/expenses', element: <Expenses /> },
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
